pub mod project_store {
    #![allow(unused)]
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};

    #[derive(Serialize, Deserialize)]
    pub struct ProjectStruct {
        id: i32,
        user_login: String,
        project_name: String,
    }

    pub async fn create_project(
        pool: &sqlx::PgPool,
        user_login: String,
        project_name: String,
    ) -> Result<i32, sqlx::Error> {
        // let query = "INSERT INTO projects (user_login, project_name) VALUES ($1, $2)";
        //
        // sqlx::query(query)
        //     .bind(user_login)
        //     .bind(project_name)
        //     .execute(pool)
        //     .await?;

        let query = "INSERT INTO projects (user_login, project_name) VALUES ($1, $2) RETURNING id";
        let id: i32 = sqlx::query(query)
            .bind(user_login)
            .bind(project_name)
            .fetch_one(pool)
            .await?
            .get("id");

        Ok(id)
    }

    pub async fn get_projects_by_user_login(
        pool: &sqlx::PgPool,
        user_login: String,
    ) -> Result<Vec<ProjectStruct>, sqlx::Error> {
        let query = sqlx::query("SELECT * FROM projects WHERE user_login = $1")
            .bind(user_login)
            .fetch_all(pool)
            .await?;

        let projects_res = query
            .iter()
            .map(|row| ProjectStruct {
                id: row.get("id"),
                user_login: row.get("user_login"),
                project_name: row.get("project_name"),
            })
            .collect();

        Ok(projects_res)
    }

    pub async fn delete_project(pool: &sqlx::PgPool, project_id: i32) -> Result<(), sqlx::Error> {
        let query = sqlx::query("DELETE FROM projects WHERE id = $1")
            .bind(project_id)
            .execute(pool)
            .await?;

        Ok(())
    }
}
