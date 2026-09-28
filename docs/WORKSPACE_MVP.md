# Rencana Implementasi — Workspace Proyek Lokal

**Status:** Backlog siap dipindahkan ke Linear / Notion / Trello  
**Prioritas:** P0 — fitur pertama setelah bootstrap desktop  
**Terkait:** PRD, Architecture, MVP Decisions

## Tujuan

Pengguna dapat membuat proyek IoT lokal, melihat proyek yang pernah dibuka, dan membuka folder proyek kembali setelah aplikasi dimulai ulang. File proyek tetap berupa file biasa yang bisa dibuka di editor lain.

## Batas MVP

Termasuk:
- Home screen berisi proyek terbaru dan aksi **Buat Proyek** / **Buka Folder**.
- Pembuatan proyek kosong dengan nama dan lokasi.
- Registry metadata SQLite untuk ID, nama, path, waktu dibuat, waktu diubah, dan terakhir dibuka.
- Folder proyek biasa dengan manifest versi schema aplikasi.
- Buka dan rename proyek; validasi bahwa lokasi masih ada.
- Status kosong, error filesystem, dan project path yang tidak tersedia.

Belum termasuk:
- Template ESP32, AI generate/apply, sinkronisasi akun/web, kolaborasi.
- File editor penuh dan project browser LAN.
- Menjalankan Docker, MQTT, Node-RED, atau toolchain hardware.

## Keputusan rancangan kerja

- Project ID dibuat sebagai UUID; ID, bukan nama dari pengguna, dipakai sebagai nama direktori internal agar nama tidak menjadi path.
- Nama ditrim, panjang 1–64 karakter, dan menolak karakter kontrol.
- Lokasi dibuat melalui Rust/Tauri dialog; frontend tidak mengirim path arbitrer untuk operasi filesystem.
- SQLite menyimpan metadata saja. Source, manifest, dan konfigurasi yang bukan secret berada di folder proyek.
- Operasi file canonicalize root dan target; traversal, symlink/junction keluar dari project root, dan path tidak valid harus ditolak.
- Perubahan database + folder punya perilaku rollback/recovery jika salah satunya gagal.
- API mutasi belum boleh dibuka sebagai HTTP tanpa session/CSRF policy. Untuk tahap pertama gunakan Tauri command untuk create/open/rename; selesaikan desain bootstrap session sebelum browser UI memakai operasi mutasi.
- Tidak ada API key/provider secret dalam metadata atau manifest.

## Daftar backlog

### WP-01 — Project domain dan SQLite registry
**Prioritas:** P0 · **Perkiraan:** 1–2 hari

- Buat model `Project` dan migrasi SQLite.
- Field: `id`, `name`, `root_path`, `created_at`, `updated_at`, `last_opened_at`, `schema_version`.
- Tambah operasi list/get/create/rename/update-last-opened.
- Pastikan operasi database punya error yang aman dan migration repeatable.

**Acceptance criteria**
- Registry dibuat pertama kali tanpa menghapus data yang sudah ada.
- Proyek tetap terdaftar setelah aplikasi ditutup dan dibuka kembali.
- Nama duplikat diperbolehkan bila folder berbeda; ID selalu unik.
- Secret tidak tersimpan dalam tabel.

### WP-02 — Safe project filesystem service
**Prioritas:** P0 · **Perkiraan:** 1–2 hari

- Dialog pemilih folder via Tauri.
- Buat folder proyek dan manifest schema awal.
- Validasi nama, izin, disk error, root, canonical path, symlink/junction.
- Rollback folder jika penulisan registry gagal dan sediakan pemulihan jika proses terhenti di tengah.

**Acceptance criteria**
- Project ID internal mencegah path injection lewat nama.
- Path tidak pernah keluar dari project root.
- Gagal create tidak meninggalkan record/folder setengah jadi tanpa pesan dan opsi pemulihan.
- Uji karakter Unicode, nama panjang/batas, folder tidak writable, dan path yang tidak lagi tersedia.

### WP-03 — Project home dan create flow
**Prioritas:** P0 · **Perkiraan:** 1–2 hari

- Empty state, daftar recent projects, tombol buat dan buka folder.
- Form nama proyek + lokasi; validasi dan feedback loading/error.
- UI menampilkan hasil dari backend, bukan daftar lokal sementara.

**Acceptance criteria**
- Proyek yang dibuat muncul di recent list tanpa restart.
- Empty state berubah ke project list setelah create.
- Tombol cancel tidak membuat folder atau record.

### WP-04 — Open, rename, recent projects
**Prioritas:** P1 · **Perkiraan:** 1 hari

- Buka proyek dari daftar dan validasi foldernya.
- Rename hanya mengubah metadata/properti yang dimaksud; jangan rename path tanpa pilihan eksplisit.
- Perbarui waktu terakhir dibuka.

**Acceptance criteria**
- Proyek folder hilang ditandai unavailable dan tidak crash.
- Rename tercermin setelah restart.
- Menghapus entri recent tidak menghapus source project.

### WP-05 — Security, recovery, dan Windows verification
**Prioritas:** P0 · **Perkiraan:** 1–2 hari

- Batasi operasi filesystem pada command/service yang eksplisit.
- Uji traversal, symlink/junction, dua create bersamaan, permission error, dan recovery.
- Verifikasi dev run serta Tauri window pada Windows 10/11.

**Acceptance criteria**
- Semua operasi path traversal ditolak.
- Dua request create tidak menghasilkan project ID bentrok atau folder korup.
- Log tidak memuat token/provider key.
- Hasil tes Windows dicatat dengan versi aplikasi dan langkah reproduksi.

## Dependensi dan urutan

`WP-01 → WP-02 → WP-03 → WP-04`; WP-05 menguji semua jalur. Sebelum mengekspos operasi proyek lewat local HTTP API, selesaikan autentikasi/session design. UI desktop dapat menggunakan Tauri commands sampai shared local-session contract tersedia.

## Status validasi

Belum diimplementasikan atau diuji. Asumsi target Windows dan penyimpanan SQLite mengikuti keputusan kerja pada `docs/MVP_DECISIONS.md`; keduanya tetap dapat direvisi sebelum coding.
