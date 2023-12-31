#[tauri::command]
fn my_custom_command() {
    println!("I was invoked from JS!");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
