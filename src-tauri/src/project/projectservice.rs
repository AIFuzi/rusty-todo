pub mod project_service {

    #![allow(unused)]
    use tauri::State;

    use crate::error::CommandResult;
    use crate::store::project_store;

    #[tauri::command]
    pub async fn create_project(
        state: State<'_, sqlx::PgPool>,
        user_id: i32,
        project_name: String,
    ) -> CommandResult<()> {
        let pool = state.inner();
        project_store::create_project(&pool, user_id, project_name).await?;

        Ok(())
    }
}
