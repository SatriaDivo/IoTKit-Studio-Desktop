# Daftar Fitur — IoTKit-Studio Desktop

## P0 — Fondasi MVP

- Shell Tauri, lifecycle local backend, indikator status.
- Workspace proyek: create/open/rename, file tree, lokasi, recent projects.
- Editor dasar: tab, syntax highlighting, save, dirty state, pencarian.
- Local API untuk health, project, events dan sesi.
- Browser UI melalui localhost; LAN opt-in.
- Pengaturan provider/model: OpenAI, Anthropic, DeepSeek, Kimi, endpoint custom OpenAI-compatible.
- Test connection, key masking, secure secret store, hapus key, redact logs.
- AI plan + structured changes + diff + approval + apply + snapshot/undo dasar.
- Log aktivitas dengan hasil faktual.
- Satu tutorial demo yang direproduksi.

## P1 — Pipeline IoT

- ESP32 workflow: deteksi port, build, flash, serial monitor (satu toolchain/board awal).
- Docker Compose validate/start/stop/status/logs.
- MQTT monitor: filter topic, payload, timestamp, JSON view.
- Node-RED editor integration dan flow review/import.
- Database time-series dan tampilan data sensor.
- Dashboard nilai terakhir dan grafik.
- Peta aliran device → MQTT → processing → database → dashboard.
- AI consistency check untuk topic, payload, dan field.

## P2 — Ekspansi

- Provider/model tambahan dan pemilihan model per tugas.
- Template sensor/proyek, snapshots dan riwayat perubahan.
- Import/export atau sinkronisasi terpilih dengan IoTKit-Studio web.
- Pairing QR dan role untuk browser LAN.
- Dukungan toolchain, board, dan OS lain.
- Dataset replay/chaos testing di desktop.
- Deployment remote setelah desain keamanan tersedia.

## Prinsip UX

- Status menyebut sumber pemeriksaan dan keadaan sebenarnya.
- Jelaskan aksi AI sebelum diterapkan.
- Bedakan rencana, berjalan, sukses, gagal, dan belum diperiksa.
- Simpan proyek sebagai file terbuka yang dapat dipakai di editor lain.
