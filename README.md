# IoTKit-Studio Desktop — Dokumen Produk

Draft pengembangan IoTKit-Studio menjadi workspace desktop dengan backend lokal.

## Isi
- [PRD](PRD.md) — tujuan, pengguna, ruang lingkup MVP, dan kriteria penerimaan.
- [Arsitektur](ARCHITECTURE.md) — komponen aplikasi dan alur komunikasi.
- [Fitur](FEATURES.md) — daftar fitur berdasarkan prioritas.
- [Roadmap dan task](TASKS.md) — tahapan implementasi serta issue GitHub.

## Keputusan saat ini
- IoTKit-Studio web saat ini berfokus pada simulasi/pengujian IoT.
- Arah baru: aplikasi desktop Tauri dengan backend Rust lokal.
- UI dapat dibuka dari desktop atau browser melalui host lokal/jaringan yang diizinkan.
- API key AI diatur dari aplikasi dan disimpan dalam credential store lokal.
- Integrasi perangkat dan layanan IoT ditambahkan bertahap.

Dokumen masih draft. Keputusan yang belum dikonfirmasi ditandai sebagai pertanyaan terbuka dalam PRD.
