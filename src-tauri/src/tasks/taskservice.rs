pub mod task_service {
    #![allow(unused)]
    use tauri::State;

    use crate::error::CommandResult;
    use crate::store::task_store;

    #[tauri::command]
    pub async fn create_task(
        state: State<'_, sqlx::PgPool>,
        project_id: i32,
        task_name: String,
        priority: String,
    ) -> CommandResult<i32> {
        let pool = state.inner();
        let new_id: i32 = task_store::create_task(pool, project_id, task_name, priority).await?;

        Ok(new_id)
    }

    #[tauri::command]
    pub async fn get_tasks_by_proj_id(
        state: State<'_, sqlx::PgPool>,
        project_id: i32,
    ) -> CommandResult<Vec<task_store::TaskStruct>> {
        let pool = state.inner();
        let tasks = task_store::get_tasks_by_project_id(pool, project_id).await?;

        Ok(tasks)
    }

    #[tauri::command]
    pub async fn update_task_status(
        state: State<'_, sqlx::PgPool>,
        task_id: i32,
        new_status: bool,
    ) -> CommandResult<()> {
        let pool = state.inner();
        task_store::update_task_status(pool, task_id, new_status).await?;

        Ok(())
    }

    #[tauri::command]
    pub async fn delete_task_by_id(
        state: State<'_, sqlx::PgPool>,
        task_id: i32,
    ) -> CommandResult<()> {
        let pool = state.inner();
        task_store::delete_task_by_id(pool, task_id).await?;

        Ok(())
    }
}
