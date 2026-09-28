# Roadmap dan Task — IoTKit-Studio Desktop

Gunakan tiap EPIC sebagai milestone/parent issue di GitHub Projects. Pecah task besar menjadi issue yang dapat diselesaikan dan ditinjau dalam 1–3 hari kerja. Status di bawah menunjukkan kondisi nyata; keputusan tertulis tidak dihitung sebagai implementasi atau pengujian.

## EPIC 0 — Audit dan keputusan MVP

### T0.1 Audit repo dan batas integrasi — Dokumentasi selesai
- Petakan fitur web yang reuse/extend/new; baca BRD/SRS, frontend Next.js, backend Go/Node, schema, AI agent.
- Hasil: [audit integrasi](INTEGRATION_AUDIT.md).
- **Selesai jika:** matriks reuse/extend/new ditinjau dan fitur web lama tidak berubah tanpa scope issue.

### T0.2 Spike Tauri + browser LAN — Belum diuji
- Keputusan awal: satu HTTP API Rust (Axum/Tokio) dipakai UI Tauri dan browser; loopback default, LAN opt-in.
- Uji React UI lewat Tauri dan browser dengan backend Rust; uji localhost dan perangkat kedua.
- **Selesai jika:** spike dibangun dan diuji pada host/perangkat; keputusan bind, session/pairing, firewall dan batas browser tercatat.
- Catatan: keputusan desain tercatat di [MVP decisions](MVP_DECISIONS.md), tetapi lingkungan audit belum memiliki Rust/Cargo sehingga build belum diklaim.

### T0.3 Pilih OS, board dan toolchain awal — Keputusan provisional
- Arah kerja: Windows 10/11 64-bit, ESP32, Arduino CLI.
- **Selesai jika:** satu jalur MVP ditetapkan dengan panduan setup yang diuji pada mesin Windows dan board sasaran.

## EPIC 1 — Desktop shell dan local API

### T1.1 Bootstrap Tauri 2 + React + TypeScript + Vite
- **Selesai jika:** dev app dan production build dasar berjalan pada OS sasaran.

### T1.2 Lifecycle backend Rust
- Start/stop, health check, restart, error, penutupan bersih.
- **Selesai jika:** tidak ada orphan process dan UI menunjukkan status aktual.

### T1.3 Kontrak API/events bertipe
- Rancang request/response, event stream, error format.
- **Selesai jika:** schema/API docs tersedia dan frontend memakai client bertipe.

### T1.4 Local HTTP API dan sesi
- Loopback default, origin policy, bootstrap session, event endpoint.
- **Selesai jika:** mutasi tanpa sesi sah ditolak.

## EPIC 2 — Workspace proyek

### T2.1 Project registry
- Create/open/rename/recent projects dan migrasi SQLite metadata.
- **Selesai jika:** proyek dibuka kembali setelah restart dan hanya metadata non-secret disimpan.

### T2.2 File explorer/editor
- Tree, tabs, save, dirty state, pencarian.
- **Selesai jika:** operasi file terbatas pada workspace dan path traversal ditolak.

## EPIC 3 — AI provider dan key

### T3.1 Provider adapter contract
- Adapter OpenAI, Anthropic, DeepSeek, Kimi dan custom compatible.
- **Selesai jika:** provider baru dapat ditambah tanpa mengubah workspace utama.

### T3.2 UI provider/model
- Add/edit/remove, default/per-project model, test connection.
- **Selesai jika:** provider/model tampil tanpa memaparkan key.

### T3.3 Secure key storage
- OS credential store; definisikan fallback platform.
- **Selesai jika:** key tidak masuk SQLite, repo, project, URL, log atau crash output.

### T3.4 AI plan, diff, apply dan snapshot
- JSON schema, patch/path validation, review, approval, backup.
- **Selesai jika:** tanpa approval tidak ada file berubah; perubahan dapat dipulihkan.

## EPIC 4 — Browser LAN

### T4.1 Opt-in LAN mode
- Bind interface, token pairing, session revoke, indikator URL.
- **Selesai jika:** default loopback dan mutasi tanpa sesi ditolak.

### T4.2 Remote capability policy
- Putuskan monitoring/edit/provider settings/runtime actions.
- **Selesai jika:** izin berlaku di UI dan API; aksi sensitif memerlukan approval.

### T4.3 Test jaringan
- Uji trusted LAN dan client-isolated Wi-Fi.
- **Selesai jika:** panduan menjelaskan hasil dan troubleshooting tanpa menonaktifkan firewall.

## EPIC 5 — Demo end-to-end

### T5.1 Tetapkan template demo
- Pilih hardware/simulator, topic, payload, versi service, database schema.
- **Selesai jika:** demo scope dan hasil yang diharapkan eksplisit.

### T5.2 Integrasi firmware tool
- Detect port, build, upload, serial monitor dan exit codes.
- **Selesai jika:** error asli tersanitasi tampil jelas; board/toolchain yang diuji dicatat.

### T5.3 Docker Compose manager
- Generate/validate/start/stop/status/logs; pin versions dan persistent volumes.
- **Selesai jika:** runtime berfungsi tanpa mengekspos Docker daemon ke LAN.

### T5.4 MQTT + Node-RED
- Monitor pesan dan review/import flow.
- **Selesai jika:** topic/payload yang terlihat berasal dari broker/flow aktual.

### T5.5 Database dan dashboard
- Query sensor data; nilai terakhir dan grafik.
- **Selesai jika:** empty state/error benar dan grafik memakai data tersimpan.

### T5.6 Demo acceptance run
- Jalankan panduan pada mesin bersih.
- **Selesai jika:** hasil, versi tool, OS, error dan batasan tercatat.

## EPIC 6 — Rilis MVP

### T6.1 Installer dan diagnostik
- Build paket, prerequisite check, diagnostic report tanpa secret.
- **Selesai jika:** install/uninstall/upgrade diuji pada OS sasaran.

### T6.2 Security review
- Review bind, auth/session, path, command allowlist, secret redaction.
- **Selesai jika:** blocker ditutup atau rilis dihentikan sampai ditangani.

### T6.3 Quick start dan troubleshooting
- **Selesai jika:** pengguna baru dapat menjalankan demo dari panduan tanpa bantuan langsung.

## Board GitHub Projects

`Backlog → Ready → In Progress → Review / Test → Done`

## Template issue

```md
## Tujuan
Hasil yang ingin dicapai.

## Konteks
Komponen dan dokumen terkait.

## Ruang lingkup
- [ ] ...

## Acceptance criteria
- [ ] ...

## Dependensi / risiko
Issue terkait atau keputusan yang belum dibuat.

## Cara verifikasi
Langkah uji yang bisa diulang. Catat jika belum diuji.
```
