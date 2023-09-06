// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;

mod error;
mod store;
mod user;

#[tokio::main]
async fn main() -> Result<()> {
    let db_store = store::main_store::new().await?;

    // ONLY FOR ONE-TIME TABLE CREATE
    store::main_store::create_tables(db_store.clone()).await?;

    //UNCOMMENT THIS LINE AND COMMENT OUT THE CREATE LINE IF YOU NEED TO DELETE TABLES
    //store::main_store::drop_all_tables(db_store.clone()).await?;

    tauri::Builder::default()
        .manage(db_store)
        .invoke_handler(tauri::generate_handler![
            user::user_service::test,
            user::user_service::regtt
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
