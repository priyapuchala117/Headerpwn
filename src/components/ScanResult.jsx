export default function ScanResult({ data }) {
  return (
    <div className="bg-surface p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-auto max-h-96 shadow-inner">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
