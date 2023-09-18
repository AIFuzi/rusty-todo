pub mod project_service {

    #![allow(unused)]
    use tauri::State;

    use crate::error::CommandResult;
    use crate::store::project_store;

    #[tauri::command]
    pub async fn create_project(
        state: State<'_, sqlx::PgPool>,
        user_login: String,
        project_name: String,
    ) -> CommandResult<()> {
        let pool = state.inner();
        project_store::create_project(&pool, user_login, project_name).await?;

        Ok(())
    }

    #[tauri::command]
    pub async fn get_projects_by_user_login(
        state: State<'_, sqlx::PgPool>,
        user_login: String,
    ) -> CommandResult<Vec<project_store::ProjectStruct>> {
        let pool = state.inner();
        let projects = project_store::get_projects_by_user_login(pool, user_login).await?;

        Ok(projects)
    }

    #[tauri::command]
    pub async fn delete_project(
        state: State<'_, sqlx::PgPool>,
        project_id: i32,
    ) -> CommandResult<()> {
        let pool = state.inner();
        project_store::delete_project(pool, project_id).await?;

        Ok(())
    }
}
