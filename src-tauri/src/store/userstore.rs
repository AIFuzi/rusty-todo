pub mod user_store {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};
    use std::collections::BTreeMap;

    pub async fn new() -> Result<(), sqlx::Error> {
        let pool = PgPoolOptions::new()
            .max_connections(5)
            .connect("postgres://postgres:root@localhost/rusty-todo")
            .await?;

        sqlx::query(r#"CREATE TABLE IF NOT EXISTS test (id bigserial, name text);"#)
            .execute(&pool)
            .await?;

        // let row: (i64,) = sqlx::query_as("INSERT INTO test (name) VALUES ($1) returning id")
        //     .bind("a new test field")
        //     .fetch_one(&pool)
        //     .await?;
        let rows = sqlx::query("SELECT * FROM test").fetch_all(&pool).await?;
        let str_result = rows
            .iter()
            .map(|r| format!("{} - {}", r.get::<i64, _>("id"), r.get::<String, _>("name")))
            .collect::<Vec<String>>()
            .join(", ");
        println!("rows: {}", str_result);

        Ok(())
    }
}
