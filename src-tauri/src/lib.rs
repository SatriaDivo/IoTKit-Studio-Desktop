use axum::{routing::get, Json, Router};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
    service: &'static str,
    version: &'static str,
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok",
        service: "iotkit-studio-local-api",
        version: env!("CARGO_PKG_VERSION"),
    })
}

async fn serve_api() {
    let address = SocketAddr::from(([127, 0, 0, 1], 47831));
    let listener = match tokio::net::TcpListener::bind(address).await {
        Ok(listener) => listener,
        Err(error) => {
            eprintln!("Local API could not bind to {address}: {error}");
            return;
        }
    };

    let app = Router::new()
        .route("/api/v1/health", get(health))
        // This API currently exposes only a read-only health endpoint.
        // Restrict bind to loopback; replace permissive CORS before adding mutations.
        .layer(CorsLayer::new().allow_origin(Any).allow_methods(Any));

    if let Err(error) = axum::serve(listener, app).await {
        eprintln!("Local API stopped: {error}");
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|_| {
            std::thread::spawn(|| {
                let runtime = match tokio::runtime::Builder::new_multi_thread()
                    .enable_all()
                    .build()
                {
                    Ok(runtime) => runtime,
                    Err(error) => {
                        eprintln!("Could not start local API runtime: {error}");
                        return;
                    }
                };
                runtime.block_on(serve_api());
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running IoTKit Studio");
}
