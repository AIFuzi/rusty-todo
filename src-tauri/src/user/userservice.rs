pub mod user_service {

    #![allow(unused)]
    use jsonwebtoken::{decode, encode, EncodingKey, Header};
    use pwhash::bcrypt;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    struct UserClaims {
        id: i32,
        login: String,
        user_name: String,
    }

    #[tauri::command]
    pub fn greet(name: String) -> String {
        generate_jwt(0, String::from("userLogin"), String::from("userName"));
        format!("Hello, {}! You've been greeted from Rust!", name)
    }

    fn generate_jwt(userid: i32, login: String, user_name: String) {
        let user_claims: UserClaims = UserClaims {
            id: userid,
            login: String::from(login),
            user_name: String::from(user_name),
        };

        let token = encode(
            &Header::default(),
            &user_claims,
            &EncodingKey::from_secret("-66612-3232-12+RwG".as_ref()),
        )
        .unwrap();

        println!("Token: {}", token);
    }

    pub fn registration(login: String, user_name: String, pass: String) {}

    pub fn login(login: String, pass: String) {
        //code
    }

    pub fn logout(login: String) {
        //code
    }
}
