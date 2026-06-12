import { useState } from "react";

export default function HeaderForm({ onResult }) {
  const [url, setUrl] = useState("https://example.com");
  const [loading, setLoading] = useState(false);

  const runScan = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    onResult(data);
    setLoading(false);
  };

  return (
    <div className="search-box flex gap-4 w-full justify-center">
      <input
        className="input-primary"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter target URL (e.g., example.com)"
      />
      <button
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={runScan}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Scanning...
          </span>
        ) : "Run Scan"}
      </button>
    </div>
  );
}
