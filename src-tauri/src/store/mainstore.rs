pub mod main_store {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use dotenv::dotenv;
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};
    use std::collections::BTreeMap;

    pub async fn new() -> Result<(sqlx::PgPool), sqlx::Error> {
        dotenv().ok();

        let pool = sqlx::postgres::PgPool::connect(&String::from(
            std::env::var("DB_URL").expect("DB URL must be set"),
        ))
        .await?;

        Ok(pool)
    }

    pub async fn create_tables(pool: sqlx::PgPool) -> Result<(), sqlx::Error> {
        sqlx::query(
            r#"CREATE TABLE IF NOT EXISTS users (id serial, 
            user_login text, 
            user_name text, 
            password text, 
            access_token text);
            "#,
        )
        .execute(&pool)
        .await?;

        Ok(())
    }

    pub async fn drop_all_tables(pool: sqlx::PgPool) -> Result<(), sqlx::Error> {
        sqlx::query(r#"DROP TABLE users;"#).execute(&pool).await?;

        Ok(())
    }
}
