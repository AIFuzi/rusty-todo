pub mod user_service {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use chrono::Utc;
    use dotenv::dotenv;
    use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
    use pwhash::bcrypt;
    use serde::{Deserialize, Serialize};
    use sqlx::{postgres::PgPoolOptions, Pool};
    use tauri::State;
    use uuid::Uuid;

    use crate::error::CommandResult;
    use crate::store::user_store;

    #[derive(Serialize, Deserialize)]
    struct UserClaims {
        user_login: String,
        user_name: String,
        token_date: String,
        exp: usize,
    }

    fn generate_jwt(login: String, name: String) -> String {
        dotenv().ok();

        let user_claims: UserClaims = UserClaims {
            user_login: login,
            user_name: name,
            token_date: Utc::now().to_string(),
            exp: 1000 * 60 * 30 * 24 * 1000 * 79,
        };

        let token = encode(
            &Header::default(),
            &user_claims,
            &EncodingKey::from_secret(
                std::env::var("TOKEN_SECRET_KEY")
                    .expect("TOKEN_SECRET_KEY must be set.")
                    .as_ref(),
            ),
        )
        .unwrap();

        token
    }

    #[tauri::command]
    pub async fn register_user(
        user_login: String,
        user_name: String,
        pass: String,
        state: State<'_, sqlx::PgPool>,
    ) -> CommandResult<String> {
        let pool = state.inner();

        let mut res_message: String = String::from("");
        let mut token: String = String::from("");

        if (user_login.clone().trim() != "" && user_name.trim() != "" && pass.trim() != "") {
            if (!user_store::get_one_user(&pool, user_login.clone())
                .await?
                .is_some())
            {
                let hash_password = bcrypt::hash(pass).unwrap();
                token = generate_jwt(user_login.clone(), user_name.clone());

                user_store::create_user(
                    &pool,
                    user_login.clone(),
                    user_name.clone(),
                    hash_password,
                    token.clone(),
                )
                .await?;

                res_message = format!("SUCCESS:{}", token);
            } else {
                res_message = format!("ERROR:Users exists");
            }
        } else {
            res_message = String::from("ERROR:Fields empty");
        }

        Ok(format!("{}", res_message))
    }

    #[tauri::command]
    pub async fn login_user(
        login: String,
        pass: String,
        state: State<'_, sqlx::PgPool>,
    ) -> CommandResult<String> {
        let pool = state.inner();
        let mut res_message = String::from("");

        if (login.trim() != "" && pass.trim() != "") {
            if (user_store::get_one_user(pool, login.clone())
                .await?
                .is_some())
            {
                if (bcrypt::verify(
                    pass,
                    &user_store::get_one_user(pool, login.clone())
                        .await?
                        .expect("None value")
                        .password,
                )) {
                    let token: String = generate_jwt(
                        login.clone(),
                        user_store::get_one_user(pool, login.clone())
                            .await?
                            .expect("None value")
                            .user_name,
                    );
                    user_store::update_user_token(&pool, login.clone(), token.clone()).await?;

                    res_message = format!("SUCCESS:{}", token.clone());
                } else {
                    res_message = String::from("ERROR:Invalid password");
                }
            } else {
                res_message = String::from("ERROR:User does not exists");
            }
        } else {
            res_message = String::from("ERROR:Fields empty");
        }

        Ok(res_message)
    }

    #[tauri::command]
    pub async fn logout_user(token: String, state: State<'_, sqlx::PgPool>) -> CommandResult<()> {
        let pool = state.inner();
        dotenv().ok();

        let current_user_token = decode::<UserClaims>(
            &token,
            &DecodingKey::from_secret(
                std::env::var("TOKEN_SECRET_KEY")
                    .expect("Secret token not valid")
                    .as_ref(),
            ),
            &Validation::new(jsonwebtoken::Algorithm::HS256),
        );

        user_store::update_user_token(
            pool,
            current_user_token.expect("").claims.user_login,
            String::from(""),
        )
        .await?;

        Ok(())
    }
}
