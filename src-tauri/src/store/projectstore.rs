pub mod project_store {
    #![allow(unused)]
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};

    pub async fn create_project(
        pool: &sqlx::PgPool,
        user_id: i32,
        project_name: String,
    ) -> Result<(), sqlx::Error> {
        let query = "INSERT INTO projects (user_id, project_name) VALUES ($1, $2)";

        sqlx::query(query)
            .bind(user_id)
            .bind(project_name)
            .execute(pool)
            .await?;

        Ok(())
    }
}
