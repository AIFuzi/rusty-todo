pub mod user_service {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use dotenv::dotenv;
    use jsonwebtoken::{decode, encode, EncodingKey, Header};
    use pwhash::bcrypt;
    use serde::{Deserialize, Serialize};
    use uuid::Uuid;

    #[derive(Serialize, Deserialize)]
    struct UserClaims {
        id: i32,
        login: String,
        user_name: String,
    }

    #[tauri::command]
    pub fn greet(name: String) -> String {
        // generate_jwt(0, String::from("userLogin"), name.clone());
        registration(
            name.clone(),
            String::from("awdwad"),
            String::from("dwadadwa"),
        );
        format!("Hello, {}! You've been greeted from Rust!", name)
    }

    fn generate_jwt(userid: i32, login: String, user_name: String) {
        dotenv().ok();

        let user_claims: UserClaims = UserClaims {
            id: userid,
            login: String::from(login),
            user_name: String::from(user_name),
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

        println!("Token: {}", token);
    }

    pub fn registration(login: String, user_name: String, pass: String) {
        if (login.trim() != "" && user_name.trim() != "" && pass.trim() != "") {
            let hash_password = bcrypt::hash(pass).unwrap();

            let id = Uuid::new_v4();
        } else {
            println!("ERROR: fields empty!");
        }
    }

    pub fn login(login: String, pass: String) {
        //code
    }

    pub fn logout(login: String) {
        //code
    }
}
