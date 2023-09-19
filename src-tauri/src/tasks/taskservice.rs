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
        priority: i32,
    ) -> CommandResult<()> {
        let pool = state.inner();

        task_store::create_task(pool, project_id, task_name, priority).await?;

        Ok(())
    }
}
