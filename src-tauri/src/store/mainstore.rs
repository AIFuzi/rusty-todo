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

        sqlx::query(r#"CREATE TABLE IF NOT EXISTS test (id serial, name text)"#)
            .execute(&pool)
            .await?;

        Ok(pool)
    }
}
