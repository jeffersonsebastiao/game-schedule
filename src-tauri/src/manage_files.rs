use std::fs;

#[tauri::command]
pub fn list_all_saves() -> Vec<String> {
    let paths = fs::read_dir("./../saves").unwrap();
    let mut archives: Vec<String> = Vec::new();
    for path in paths {
        archives.push(path.unwrap().file_name().to_str().unwrap().to_owned());
    }
    archives
}

#[tauri::command]
pub fn delete_save(file: String) -> () {
    let path = "./../saves/".to_string() + &file;
    match fs::remove_file(path) {
        _ => (),
    }
}
