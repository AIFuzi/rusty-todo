pub mod user_service {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use chrono::Utc;
    use dotenv::dotenv;
    use jsonwebtoken::{decode, encode, EncodingKey, Header};
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
    }

    fn generate_jwt(login: String, name: String) -> String {
        dotenv().ok();

        let user_claims: UserClaims = UserClaims {
            user_login: login,
            user_name: name,
            token_date: Utc::now().to_string(),
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
            if (user_store::get_users_count(&pool, user_login.clone()).await? == 0) {
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

        // println!("{}", token);
        Ok(format!("{}", res_message))
    }

    pub fn login(login: String, pass: String) {
        //code
    }

    pub fn logout(login: String) {
        //code
    }
}
