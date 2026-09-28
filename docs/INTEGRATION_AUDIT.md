# Audit Integrasi — IoTKit-Studio Web dan Desktop

**Status:** Audit dokumenter awal  
**Tanggal:** 2026-09-28

## Ringkasan

Desktop menjadi lapisan kerja lokal untuk menghubungkan UI IoTKit-Studio dengan file proyek, toolchain, perangkat, dan layanan lokal. Aplikasi web yang ada tetap menjadi produk simulasi/pengujian berbasis web. Keduanya berbagi konsep, format data, dan pola pengalaman; keduanya tidak berbagi database lokal secara langsung.

## Matriks reuse / extend / new

| Area | Keputusan | Catatan |
|---|---|---|
| Konsep proyek, perangkat, protokol, payload, simulasi | Reuse | Pertahankan kosakata dan model mental yang sudah dipakai di IoTKit-Studio. |
| Payload builder dan visualisasi data | Extend | Desktop menambahkan sumber data nyata; bedakan data simulasi dan data perangkat. |
| AI agent | Extend | Gunakan pola agent yang ada sebagai acuan, tetapi desktop menghasilkan rencana/diff yang divalidasi Rust sebelum file atau layanan berubah. |
| UI/dashboard | Reuse pola, implementasi dapat berbagi komponen | Jangan membuat desktop bergantung pada server web untuk operasi lokal. |
| Backend Go dan Node.js | Tetap untuk web | Jangan porting atau mengganti keduanya dalam MVP desktop. |
| PostgreSQL web | Tetap untuk web | Bukan penyimpanan metadata desktop. |
| Local API dan lifecycle | New | Rust menjadi boundary lokal bagi browser, Tauri UI, filesystem, dan tool. |
| Project workspace dan file | New | Simpan sebagai folder proyek biasa agar dapat dibuka IDE lain. |
| Credential storage provider AI | New | Simpan key melalui credential store OS; jangan menaruhnya di config proyek. |
| Docker Compose lokal, serial, firmware toolchain | New bertahap | Jalankan hanya perintah terdaftar dengan argumen tervalidasi. |
| LAN browser access | New | Opsional dan dimatikan secara default; butuh pairing/session dan kebijakan capability. |

## Batas integrasi

- Desktop tidak membaca/menulis tabel PostgreSQL web secara langsung.
- Sinkronisasi proyek, akun, chat, dan telemetry ditunda sampai ada kontrak API dan keputusan privasi/konflik.
- Ekspor/impor folder proyek menjadi jalur interoperabilitas awal.
- Payload MQTT dan model field perlu memakai format terdokumentasi bersama bila kedua produk mengirim/menerima data yang sama.
- API web yang sudah ada dapat dipanggil melalui adapter terpisah kelak; jangan mengasumsikan API simulasi dapat mengendalikan hardware lokal.
- Browser LAN hanya berkomunikasi dengan local API Rust. Docker Engine socket/API tidak boleh diekspos.

## Pertanyaan verifikasi saat implementasi

- Catat lokasi SRS/kontrak payload web yang dipilih sebagai sumber kompatibilitas.
- Tetapkan format manifest proyek desktop dan versi schema.
- Tambahkan uji round-trip untuk ekspor/impor sebelum menambahkan sinkronisasi akun.
- Nyatakan pada UI apakah data berasal dari simulator, broker lokal, atau board nyata.
