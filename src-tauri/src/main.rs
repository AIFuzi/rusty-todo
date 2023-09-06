// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;

mod error;
mod store;
mod user;

#[tokio::main]
async fn main() -> Result<()> {
    let db_store = store::main_store::new().await?;

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
