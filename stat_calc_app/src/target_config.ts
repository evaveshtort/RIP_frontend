const target_abs = false
const tauri_app = false
const local_ip = "localhost"

export const api_proxy_addr = "http://" + local_ip + ":8000"
export const minio_proxy_addr = "http://" + local_ip + ":9000"
export const dest_api = (target_abs) ? api_proxy_addr : "/api"
export const dest_minio =  (target_abs) ?  minio_proxy_addr : "/minio"
export const dest_root = (tauri_app) ? "" : "/statistician-frontend"