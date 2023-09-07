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

        sqlx::query(
            r#"CREATE TABLE IF NOT EXISTS projects (id serial,
            user_id serial,
            project_name text);"#,
        )
        .execute(&pool)
        .await?;

        sqlx::query(
            r#"CREATE TABLE IF NOT EXISTS tasks (id serial,
            user_id serial,
            project_id serial,
            project_name text,
            priority serial,
            completed boolean);"#,
        )
        .execute(&pool)
        .await?;

        Ok(())
    }

    pub async fn drop_all_tables(pool: sqlx::PgPool) -> Result<(), sqlx::Error> {
        sqlx::query(r#"DROP TABLE users, projects, tasks;"#)
            .execute(&pool)
            .await?;

        Ok(())
    }
}
