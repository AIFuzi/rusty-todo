pub mod project_store {
    #![allow(unused)]
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};

    #[derive(Serialize, Deserialize)]
    pub struct ProjectStruct {
        user_id: i32,
        project_name: String,
    }

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

    pub async fn get_projects_by_user_id(
        pool: &sqlx::PgPool,
        user_id: i32,
    ) -> Result<Option<ProjectStruct>, sqlx::Error> {
        let query = sqlx::query("SELECT * FROM projects WHERE user_id = $1")
            .bind(user_id)
            .fetch_optional(pool)
            .await?;

        let project_res = query.map(|row| ProjectStruct {
            user_id: row.get("user_id"),
            project_name: row.get("project_name"),
        });

        Ok(project_res)
    }
}
