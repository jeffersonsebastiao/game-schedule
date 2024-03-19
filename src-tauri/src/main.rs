mod manage_files;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![manage_files::list_all_saves])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
