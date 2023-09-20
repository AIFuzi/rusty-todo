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
        priority: String,
        status: bool,
    }

    pub async fn create_task(
        pool: &sqlx::PgPool,
        project_id: i32,
        task_name: String,
        priority: String,
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

    pub async fn get_tasks_by_project_id(
        pool: &sqlx::PgPool,
        project_id: i32,
    ) -> Result<Vec<TaskStruct>, sqlx::Error> {
        let query = sqlx::query("SELECT * FROM tasks WHERE project_id = $1")
            .bind(project_id)
            .fetch_all(pool)
            .await?;

        let tasks_res = query
            .iter()
            .map(|row| TaskStruct {
                id: row.get("id"),
                project_id: row.get("project_id"),
                task_name: row.get("task_name"),
                priority: row.get("priority"),
                status: row.get("status"),
            })
            .collect();

        Ok(tasks_res)
    }

    pub async fn update_task_status(
        pool: &sqlx::PgPool,
        task_id: i32,
        new_status: bool,
    ) -> Result<(), sqlx::Error> {
        sqlx::query("UPDATE tasks SET status = $1 WHERE id = $2")
            .bind(new_status)
            .bind(task_id)
            .execute(pool)
            .await?;

        Ok(())
    }

    pub async fn delete_task_by_id(pool: &sqlx::PgPool, task_id: i32) -> Result<(), sqlx::Error> {
        sqlx::query("DELETE FROM tasks WHERE id = $1")
            .bind(task_id)
            .execute(pool)
            .await?;

        Ok(())
    }
}
