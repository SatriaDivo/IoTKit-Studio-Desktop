# Quick Start — IoTKit-Studio Desktop

Status: bootstrap desktop awal. Fitur saat ini hanya menampilkan status koneksi ke local API.

## Prasyarat Windows

- Windows 10/11 64-bit.
- Node.js 22 atau versi LTS kompatibel dan npm.
- Rust stable toolchain.
- Microsoft C++ Build Tools dengan workload desktop C++.
- Microsoft Edge WebView2 Runtime.

## Jalankan mode development

Dari root repository:

```powershell
npm install
npm run tauri -- dev
```

Jendela IoTKit Studio akan terbuka dan mencoba memeriksa local API pada:

```
http://127.0.0.1:47831/api/v1/health
```

Untuk melihat respons API tanpa jendela desktop, jalankan aplikasi Tauri lalu buka URL tersebut di browser pada komputer yang sama. Endpoint ini read-only.

## Build UI dan executable

```powershell
npm run build
cargo build --manifest-path src-tauri/Cargo.toml
```

Perintah Tauri untuk membangun paket distribusi:

```powershell
npm run tauri -- build
```

Installer belum menjadi bagian yang tervalidasi dalam workflow CI awal.

## Batas saat ini

- API hanya bind ke `127.0.0.1`; browser pada perangkat lain belum bisa mengaksesnya.
- Belum ada pairing/authentication untuk LAN.
- Belum ada operasi proyek, AI provider, penyimpanan API key, Docker, MQTT, Node-RED, atau komunikasi board.
- Jika port `47831` sudah dipakai, local API gagal start dan UI menampilkan status belum terhubung.

