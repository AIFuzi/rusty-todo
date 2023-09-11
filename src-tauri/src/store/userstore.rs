pub mod user_store {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};
    use std::collections::BTreeMap;

    use crate::error::CommandResult;

    #[derive(Serialize, Deserialize)]
    pub struct UserData {
        pub id: i32,
        pub user_login: String,
        pub user_name: String,
        pub password: String,
        pub access_token: String,
    }

    pub async fn create_user(
        pool: &sqlx::PgPool,
        user_login: String,
        user_name: String,
        pass: String,
        token: String,
    ) -> Result<(), sqlx::Error> {
        let query = "INSERT INTO users (user_login, user_name, password, access_token) VALUES ($1, $2, $3, $4)";
        sqlx::query(query)
            .bind(user_login)
            .bind(user_name)
            .bind(pass)
            .bind(token)
            .execute(pool)
            .await?;

        Ok(())
    }

    pub async fn update_user_info(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
        let query = "UPDATE users SET user_name = $1 WHERE id = $2";

        sqlx::query(query)
            .bind(String::from("UPDATE"))
            .bind(5)
            .execute(pool)
            .await?;

        Ok(())
    }

    pub async fn get_all_users(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
        let q = "SELECT * FROM users;";
        let query = sqlx::query(q);

        let rows = query.fetch_all(pool).await?;

        let bb = rows
            .iter()
            .map(|r| {
                format!(
                    "{} - {} - {} - {} - {}",
                    r.get::<i32, _>("id"),
                    r.get::<String, _>("user_login"),
                    r.get::<String, _>("user_name"),
                    r.get::<String, _>("password"),
                    r.get::<String, _>("access_token")
                )
            })
            .collect::<Vec<String>>()
            .join(", ");
        println!("Rows {}", bb);

        Ok(())
    }

    pub async fn get_one_user(
        pool: &sqlx::PgPool,
        login: String,
    ) -> Result<Option<UserData>, sqlx::Error> {
        let query = sqlx::query("SELECT * FROM users WHERE user_login = $1")
            .bind(login)
            .fetch_optional(pool)
            .await?;

        let user_res = query.map(|row| UserData {
            id: row.get("id"),
            user_login: row.get("user_login"),
            user_name: row.get("user_name"),
            password: row.get("password"),
            access_token: row.get("access_token"),
        });

        Ok(user_res)
    }

    pub async fn get_users_count(pool: &sqlx::PgPool, login: String) -> Result<i64, sqlx::Error> {
        let query = sqlx::query("SELECT COUNT(*) FROM users WHERE user_login = $1")
            .bind(login)
            .fetch_one(pool)
            .await?;

        let count: i64 = query.get("count");
        Ok(count)
    }
}
