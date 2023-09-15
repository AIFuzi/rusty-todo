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

    #[tauri::command]
    pub async fn get_project_by_user_id(
        state: State<'_, sqlx::PgPool>,
        user_id: i32,
    ) -> CommandResult<Vec<project_store::ProjectStruct>> {
        let pool = state.inner();
        let projects = project_store::get_projects_by_user_id(pool, user_id).await?;

        Ok(projects)
    }
}
