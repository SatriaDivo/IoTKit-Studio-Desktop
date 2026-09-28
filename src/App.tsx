import { useEffect, useState } from "react";

type Health = {
  status: string;
  service: string;
  version: string;
};

const API_BASE = "http://127.0.0.1:47831/api/v1";

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        const response = await fetch(`${API_BASE}/health`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = (await response.json()) as Health;
        if (active) {
          setHealth(result);
          setError(null);
        }
      } catch {
        if (active) {
          setHealth(null);
          setError("Backend lokal belum merespons. Coba tutup lalu buka kembali aplikasi.");
        }
      }
    };

    void check();
    const timer = window.setInterval(() => void check(), 5000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand-mark">IoT</div>
        <div>
          <p className="eyebrow">WORKSPACE IOT</p>
          <h1>IoTKit Studio</h1>
        </div>
        <span className="phase">Desktop preview</span>
      </header>

      <section className="welcome">
        <p className="eyebrow">LOCAL CORE</p>
        <h2>Workspace proyek IoT Anda</h2>
        <p className="intro">
          Shell desktop terhubung ke backend Rust lokal. Fondasi ini akan
          dikembangkan untuk proyek, perangkat, MQTT, dan layanan lokal.
        </p>
      </section>

      <section className="status-card" aria-live="polite">
        <div className={health ? "status-dot online" : "status-dot"} />
        <div className="status-copy">
          <h3>{health ? "Backend aktif" : "Menghubungkan backend"}</h3>
          <p>
            {health
              ? `${health.service} · versi ${health.version} · loopback`
              : error ?? "Memeriksa status local API…"}
          </p>
        </div>
        <span className={health ? "status-label online-label" : "status-label"}>
          {health?.status ?? "CONNECTING"}
        </span>
      </section>

      <section className="next-card">
        <h3>Langkah fondasi</h3>
        <ul>
          <li>Local API Rust dengan pemeriksaan health</li>
          <li>UI yang sama untuk Tauri dan browser</li>
          <li>Proyek dan integrasi IoT ditambahkan bertahap</li>
        </ul>
      </section>
      <footer>API dibatasi ke komputer ini. Akses jaringan belum diaktifkan.</footer>
    </main>
  );
}
