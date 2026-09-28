# IoTKit-Studio Desktop — Dokumen Produk

Draft pengembangan IoTKit-Studio menjadi workspace desktop dengan backend lokal.

## Isi
- [PRD](docs/PRD.md) — tujuan, pengguna, ruang lingkup MVP, dan kriteria penerimaan.
- [Arsitektur](docs/ARCHITECTURE.md) — komponen aplikasi dan alur komunikasi.
- [Audit integrasi](docs/INTEGRATION_AUDIT.md) — batas reuse dan integrasi dengan produk web.
- [Keputusan MVP](docs/MVP_DECISIONS.md) — keputusan kerja dan kriteria spike.
- [Fitur](docs/FEATURES.md) — daftar fitur berdasarkan prioritas.
- [Roadmap dan task](docs/TASKS.md) — tahapan implementasi serta issue GitHub.

## Keputusan saat ini
- IoTKit-Studio web saat ini berfokus pada simulasi/pengujian IoT.
- Arah baru: aplikasi desktop Tauri dengan backend Rust lokal (Axum/Tokio).
- UI Tauri dan browser menggunakan satu API lokal; LAN mati secara default.
- API key AI diatur dari aplikasi dan disimpan dalam credential store lokal.
- Arah uji MVP: Windows + ESP32 + Arduino CLI, belum dianggap tervalidasi.
- Integrasi perangkat dan layanan IoT ditambahkan bertahap.

Dokumen masih draft. Keputusan yang belum diuji diberi status provisional dalam roadmap.
