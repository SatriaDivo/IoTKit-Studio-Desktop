# IoTKit-Studio Desktop

IoTKit-Studio Desktop mengembangkan workspace desktop IoT dengan backend lokal Rust. Repo ini saat ini memiliki dokumentasi produk dan bootstrap awal Tauri + React/Vite + Axum.

## Mulai

Lihat [Quick Start](docs/QUICKSTART.md) untuk menjalankan shell desktop di Windows.

## Dokumentasi

- [PRD](docs/PRD.md) — tujuan, pengguna, ruang lingkup MVP, dan kriteria penerimaan.
- [Arsitektur](docs/ARCHITECTURE.md) — komponen aplikasi dan alur komunikasi.
- [Audit integrasi](docs/INTEGRATION_AUDIT.md) — batas reuse dan integrasi dengan produk web.
- [Keputusan MVP](docs/MVP_DECISIONS.md) — keputusan kerja dan kriteria spike.
- [Fitur](docs/FEATURES.md) — daftar fitur berdasarkan prioritas.
- [Roadmap dan task](docs/TASKS.md) — tahapan implementasi serta issue GitHub.
- [Workspace proyek](docs/WORKSPACE_MVP.md) — spesifikasi dan backlog P0/P1 untuk fitur proyek lokal.

## Status implementasi

- Shell Tauri 2 + React/TypeScript/Vite dan local API Rust/Axum tersedia.
- Windows CI berhasil membangun UI dan executable Rust/Tauri.
- API saat ini hanya menyediakan endpoint health read-only di loopback.
- Akses LAN, proyek, AI provider/key, Docker, MQTT, Node-RED, dan board integration belum tersedia.
- Arah awal tetap Windows + ESP32 + Arduino CLI; board/toolchain belum diuji pada hardware.
