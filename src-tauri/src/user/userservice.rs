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

    // #[tauri::command]
    pub async fn registration(
        state: State<'_, sqlx::PgPool>,
        user_login: String,
        user_name: String,
        pass: String,
    ) -> CommandResult<()> {
        let pool = state.inner();

        if (user_login.trim() != "" && user_name.trim() != "" && pass.trim() != "") {
            let hash_password = bcrypt::hash(pass).unwrap();
            let token = generate_jwt(user_login.clone(), user_name.clone());

            user_store::create_user(
                &pool,
                user_login.clone(),
                user_name.clone(),
                hash_password,
                token,
            )
            .await?;
            println!("SUCCESS: User created");
        } else {
            println!("ERROR: fields empty!");
        }

        Ok(())
    }

    pub fn login(login: String, pass: String) {
        //code
    }

    pub fn logout(login: String) {
        //code
    }

    #[tauri::command]
    pub async fn test(name: String, state: State<'_, sqlx::PgPool>) -> CommandResult<String> {
        let pool = state.inner();

        user_store::get_all_users(&pool).await?;
        // let stt: String = user_store::get_one_user_id_by_login(&pool, nameeclone()).await?;
        //
        // println!("One user: {}", stt);

        // user_store::update_user_info(&pool).await?;

        Ok(format!("Hello, {}! You've been greeted from Rust!", name))
    }

    #[tauri::command]
    pub async fn regtt(name: String, state: State<'_, sqlx::PgPool>) -> CommandResult<String> {
        let pool = state.inner();

        registration(
            state,
            String::from("LOGIN"),
            name.clone(),
            String::from("FAW2dff"),
        )
        .await?;

        Ok(format!(
            "Hello, {}! You've been greeted from Rust!",
            name.clone()
        ))
    }
}
