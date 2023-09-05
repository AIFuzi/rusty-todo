// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;

mod store;
mod user;

#[tokio::main]
async fn main() -> Result<()> {
    let ms = store::main_store::new().await?;
    // store::user_store::create(&ms).await?;
    // store::user_store::update(&ms).await?;
    // store::user_store::select_all(&ms).await?;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![user::user_service::greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
