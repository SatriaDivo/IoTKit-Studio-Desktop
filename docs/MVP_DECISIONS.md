# Keputusan MVP — IoTKit-Studio Desktop

**Status:** Keputusan kerja untuk spike; dapat direvisi lewat issue/ADR  
**Tanggal:** 2026-09-28

## Keputusan

1. **Platform pertama: Windows 10/11 64-bit.** Prioritas awal adalah menurunkan variasi packaging dan setup. Target OS lain menyusul setelah alur build dan instalasi terbukti.
2. **Board demo: ESP32.** Jalur awal yang diuji adalah Arduino CLI dengan satu board ESP32 yang didukung secara eksplisit. Board/versi core final harus dicatat di quick start setelah mesin uji tersedia.
3. **Batas UI/backend: HTTP API lokal Rust.** UI Tauri dan browser memakai kontrak yang sama. Gunakan Axum + Tokio untuk HTTP dan event stream; Tauri commands dipakai untuk kebutuhan native khusus, bukan sebagai satu-satunya API.
4. **Bind jaringan:** loopback secara default. LAN mode harus diaktifkan eksplisit, menunjukkan alamat, memakai pairing/token sesi yang dapat dicabut, dan tidak mengizinkan operasi sensitif tanpa otorisasi.
5. **MVP LAN capabilities:** monitoring dan interaksi workspace biasa. Upload/flash board, perubahan konfigurasi jaringan, penghapusan massal, dan operasi persisten memerlukan approval dari host.
6. **Urutan demo:** mulai dari template proyek ESP32 + broker/MQTT + penyimpanan data/dashboard lokal; firmware/toolchain dapat menjadi tahap terpisah jika setup hardware menghambat uji pertama. Tidak perlu mendukung semua layanan sekaligus.
7. **Project portability:** file sumber dan manifest ada di folder proyek; SQLite hanya menyimpan indeks/recent-project dan preferensi non-secret.
8. **AI provider:** adapter dengan konfigurasi provider/model; key disimpan di credential store OS dan request/diff diperiksa server lokal sebelum diterapkan.

## Belum dianggap terbukti

- Belum ada build Tauri/Rust atau uji LAN di mesin ini: Rust/Cargo dan checkout source tidak tersedia di workspace.
- Pemilihan Axum dan pola satu API bersama adalah keputusan desain, belum hasil benchmark.
- Jangkauan ESP32, Arduino CLI, Docker Desktop, firewall, dan Wi-Fi client isolation harus diuji pada Windows.
- Jangan tandai spike Tauri/LAN selesai sebelum aplikasi dibangun dan diuji pada host serta perangkat kedua.

## Kriteria selesai untuk T0.2/T0.3

- Build development dan production pada Windows 10/11.
- Tauri UI dapat memanggil API Rust melalui client yang sama dengan browser.
- Health endpoint sukses di localhost; proses berhenti bersih saat aplikasi ditutup.
- Tes perangkat kedua pada LAN normal dan Wi-Fi client-isolated; dokumentasikan firewall dan pairing.
- Board ESP32 target terdeteksi, firmware build, upload, dan serial monitor diuji dengan versi tool yang dicatat.
- LAN mode mati setelah instal ulang/default reset dan sesi remote dapat dicabut.
