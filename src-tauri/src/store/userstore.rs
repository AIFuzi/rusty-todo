pub mod user_store {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};
    use std::collections::BTreeMap;

    pub async fn create(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
        let query = "INSERT INTO test (name) VALUES ($1)";
        sqlx::query(query)
            .bind(String::from("User name from userstore"))
            .execute(pool)
            .await?;

        Ok(())
    }

    pub async fn update(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
        let query = "UPDATE test SET name = $1 WHERE id = $2";

        sqlx::query(query)
            .bind("Update from user store")
            .bind(1)
            .execute(pool)
            .await?;

        Ok(())
    }

    pub async fn select_all(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
        let q = "SELECT * FROM test";
        let query = sqlx::query(q);

        let rows = query.fetch_all(pool).await?;

        let bb = rows
            .iter()
            .map(|r| format!("{} - {}", r.get::<i32, _>("id"), r.get::<String, _>("name")))
            .collect::<Vec<String>>()
            .join(", ");
        println!("Rows {}", bb);

        Ok(())
    }
}
