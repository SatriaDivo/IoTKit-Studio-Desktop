# PRD — IoTKit-Studio Desktop

**Status:** Draft untuk ditinjau  
**Produk induk:** IoTKit-Studio  
**Platform awal:** Windows desktop + browser pada jaringan lokal (perlu konfirmasi)

## Ringkasan

IoTKit-Studio Desktop memperluas IoTKit-Studio, aplikasi web yang saat ini berfokus pada simulasi dan pengujian sistem IoT. Versi desktop menambahkan backend lokal agar pengguna dapat mengelola proyek pada komputernya, menjalankan toolchain perangkat, mengontrol layanan IoT lokal, dan membuka UI lewat Tauri atau browser.

Backend lokal menjadi penghubung UI dengan file proyek, port serial, toolchain ESP32, Docker Compose, MQTT, Node-RED, database, dan provider AI. Browser pada perangkat lain dapat mengakses host bila akses LAN diaktifkan; akses publik dari internet bukan cakupan MVP.

AI menerjemahkan instruksi biasa menjadi rencana dan perubahan proyek yang bisa ditinjau. Tindakan terhadap file, perangkat, atau layanan harus divalidasi dan disetujui pengguna.

## Konteks produk saat ini

Repository IoTKit-Studio mendeskripsikan platform simulasi berbasis web dengan manajemen proyek simulasi, visual payload builder, protokol HTTP/MQTT/WebSocket, simulasi real-time, webhook ingestion, chaos/anomaly injection, monitoring, analitik, dan AI agent. Dokumentasi menyebut frontend Next.js/TypeScript, backend Go atau Node.js, dan PostgreSQL.

Dokumentasi saat ini menempatkan akses langsung ke hardware, hosting broker internal, dan ekspor firmware di luar cakupan. PRD ini menambah jalur desktop/lokal; jangan menganggap fitur web lama sudah diganti.

## Masalah pengguna

Mahasiswa atau pengembang IoT berpindah antara IDE firmware, terminal, Docker, MQTT client, Node-RED, database, dan dashboard. Mereka mencocokkan topic, payload, field database, serta konfigurasi layanan secara manual. Saat gagal, log tersebar di beberapa aplikasi.

## Target pengguna

- Mahasiswa Teknologi Rekayasa Internet yang membuat prototipe IoT.
- Pemula yang belajar ESP32, MQTT, dan pipeline data.
- Pengembang yang menguji atau mendemonstrasikan pipeline IoT lokal.
- Dosen/pembimbing yang menyiapkan contoh praktikum.

## Tujuan dan indikator keberhasilan

1. Menyediakan workspace lokal untuk file proyek dan status komponen.
2. Membantu menyiapkan proyek dari instruksi bahasa biasa.
3. Menjalankan satu pipeline demo dari perangkat/simulator sampai dashboard.
4. Menyatukan status dan log yang dikelola aplikasi.
5. Mempertahankan kemampuan simulasi web yang ada.

Indikator MVP: proyek dapat dibuat dan dibuka; AI menampilkan diff sebelum perubahan; demo yang dipilih berjalan sesuai panduan; status/log aktual terlihat; browser host dapat mengakses UI lokal; API key tidak masuk proyek atau log.

## Ruang lingkup MVP

### Termasuk
- Aplikasi desktop Tauri 2 dengan UI React + TypeScript.
- Backend Rust lokal untuk file proyek, operasi yang diizinkan, status, dan log.
- UI dapat dibuka lewat localhost; akses LAN opt-in dengan sesi/token.
- Workspace proyek, file explorer/editor dasar, dan peta data sederhana.
- Pengaturan provider/model AI, test connection, penyimpanan key aman.
- AI menghasilkan rencana dan perubahan terstruktur; pengguna meninjau diff sebelum apply.
- Satu demo IoT end-to-end dengan komponen yang dipilih setelah spike teknis.
- Dokumentasi install, setup, run, dan troubleshooting.

### Tidak termasuk MVP
- Akses publik internet, multi-tenant cloud, kolaborasi realtime, akun organisasi.
- Dukungan semua board, OS, dan toolchain.
- Mengganti backend web Go/Node.js sebelum keputusan migrasi.
- Mengekspos Docker Engine API langsung ke LAN.
- Menjalankan shell bebas dari output AI.

## User journey utama

1. Buka aplikasi; buat proyek dari template atau prompt.
2. Atur provider/model AI dan uji koneksi.
3. Tinjau ringkasan kebutuhan, komponen, rencana, dan diff AI.
4. Terapkan atau batalkan perubahan.
5. Jalankan layanan lokal, build/upload demo, dan pantau status/log/data.
6. Opsional: aktifkan akses LAN dan buka dari browser perangkat lain.

## Persyaratan fungsional

- **Proyek:** create/open/rename/close; file disimpan dalam folder yang dapat dipakai di luar aplikasi.
- **Workspace:** file tree, tab editor, status layanan, peta data, log dan error.
- **AI:** provider adapter; prompt, rencana, patch terstruktur, diff, approval, apply, undo/snapshot.
- **Provider AI:** OpenAI, Anthropic, DeepSeek, Kimi, dan provider kustom OpenAI-compatible; pilih default/per-proyek; test connection.
- **Secret:** key tersamarkan, disimpan di credential store OS/penyimpanan rahasia, bisa dihapus; jangan simpan di SQLite biasa, project file, atau log.
- **Runtime:** status harus berasal dari pemeriksaan tool; jalankan hanya aksi yang divalidasi dan diizinkan.
- **LAN:** mati secara default; tampilkan alamat saat aktif; autentikasi sesi dan revoke.

## Persyaratan nonfungsional

- Operasi panjang tidak membekukan UI.
- Default API hanya loopback; bind LAN perlu opt-in.
- Validasi origin, sesi, path, serta argumen perintah.
- Jangan masukkan secret ke telemetry, URL, crash report, atau log.
- Proyek dapat diekspor sebagai file biasa.
- Error menjelaskan tindakan gagal dan langkah pemulihan.

## Kriteria penerimaan MVP

1. Aplikasi terbuka dan menampilkan workspace.
2. Proyek tetap tersedia setelah aplikasi direstart.
3. Perubahan AI tidak menulis file sebelum pengguna menekan Terapkan.
4. API key tersamarkan, tidak muncul di log, dan bisa dihapus.
5. Koneksi provider yang gagal menampilkan pesan aman.
6. Browser pada host membuka UI lokal.
7. Perangkat kedua hanya mengakses setelah LAN diaktifkan dan host mengizinkan koneksi.
8. Status service menunjukkan hasil aktual, bukan asumsi AI.
9. Demo end-to-end memiliki hasil pengujian dan batasan yang tercatat.

## Pertanyaan terbuka

- Target OS MVP: Windows saja atau beberapa OS?
- Demo awal memakai ESP32 fisik, simulator web, atau keduanya?
- Toolchain awal: Arduino CLI, PlatformIO, atau ESP-IDF?
- Akses LAN memakai login, token pairing, atau keduanya?
- Browser perangkat lain hanya monitoring atau boleh edit/menjalankan aksi?
- Bagaimana proyek/akun disinkronkan dengan aplikasi web setelah MVP?
- Provider dan model mana yang diuji lebih dahulu?
