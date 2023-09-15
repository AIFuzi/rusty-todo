pub mod project_store {
    #![allow(unused)]
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};

    #[derive(Serialize, Deserialize)]
    pub struct ProjectStruct {
        id: i32,
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
    ) -> Result<Vec<ProjectStruct>, sqlx::Error> {
        let query = sqlx::query("SELECT * FROM projects WHERE user_id = $1")
            .bind(user_id)
            .fetch_all(pool)
            .await?;

        let projects_res = query
            .iter()
            .map(|row| ProjectStruct {
                id: row.get("id"),
                user_id: row.get("user_id"),
                project_name: row.get("project_name"),
            })
            .collect();

        Ok(projects_res)
    }
}
