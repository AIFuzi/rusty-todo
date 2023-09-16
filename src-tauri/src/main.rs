// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;

mod error;
mod project;
mod store;
mod user;

#[tokio::main]
async fn main() -> Result<()> {
    let db_store = store::main_store::new().await?;

    // ONLY FOR ONE-TIME TABLE CREATE
    store::main_store::create_tables(db_store.clone()).await?;

    //UNCOMMENT THIS LINE IF YOU NEED TO DELETE TABLES
    // store::main_store::drop_all_tables(db_store.clone()).await?;

    //UNCOMMENT THIS LINE IF YOU NEED TO CLEAR TABLE INFO
    // store::main_store::clear_all_info(db_store.clone()).await?;

    tauri::Builder::default()
        .manage(db_store)
        .invoke_handler(tauri::generate_handler![
            // User
            user::user_service::register_user,
            user::user_service::login_user,
            user::user_service::logout_user,
            // Project
            project::project_service::create_project,
            project::project_service::get_project_by_user_id,
            project::project_service::delete_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
