pub mod task_store {
    #![allow(unused)]
    use serde::{Deserialize, Serialize};
    use sqlx::postgres::{PgPoolOptions, PgRow};
    use sqlx::{FromRow, Row};

    #[derive(Serialize, Deserialize)]
    pub struct TaskStruct {
        id: i32,
        project_id: i32,
        task_name: String,
        priority: i32,
        status: bool,
    }

    pub async fn create_task(
        pool: &sqlx::PgPool,
        project_id: i32,
        task_name: String,
        priority: i32,
    ) -> Result<(), sqlx::Error> {
        sqlx::query(
            "INSERT INTO tasks (project_id, task_name, priority, status) VALUES ($1, $2, $3, false); ",
        )
        .bind(project_id)
        .bind(task_name)
        .bind(priority)
        .execute(pool)
        .await?;

        Ok(())
    }
}
