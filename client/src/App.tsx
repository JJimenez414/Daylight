import { useState } from "react";
import { healthApi, type Health } from "./lib/api";

export function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function checkHealth() {
    setLoading(true);
    setError(false);
    try {
      setHealth(await healthApi.get());
    } catch {
      setHealth(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 text-slate-900">
      <h1 className="text-3xl font-bold">☀️ Daylight</h1>

      <button
        onClick={checkHealth}
        disabled={loading}
        className="rounded bg-amber-500 px-5 py-2 font-medium text-white hover:bg-amber-600 disabled:opacity-50"
      >
        {loading ? "Checking…" : "Check backend health"}
      </button>

      {health && (
        <div className="text-center">
          <p className="text-green-700">
            ✅ API {health.status} — up for {Math.round(health.uptime)}s
          </p>
          {health.database === "ok" ? (
            <p className="text-green-700">✅ Database connected</p>
          ) : (
            <p className="text-red-600">❌ Database not reachable — check DATABASE_URL</p>
          )}
        </div>
      )}
      {error && <p className="text-red-600">Cannot reach the API. Is the server running?</p>}
    </main>
  );
}
