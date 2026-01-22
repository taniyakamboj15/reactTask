export const CommandHints = () => {
  return (
    <div className="text-center mt-3 flex justify-center gap-6 text-[10px] text-text-muted">
      <span className="flex items-center gap-1.5 bg-surface/30 px-3 py-1.5 rounded-lg border border-white/5">
        <code className="text-green-400 font-mono font-semibold">/upload</code> 
        <span className="opacity-60">start task</span>
      </span>
      <span className="flex items-center gap-1.5 bg-surface/30 px-3 py-1.5 rounded-lg border border-white/5">
        <code className="text-green-400 font-mono font-semibold">/process</code> 
        <span className="opacity-60">simulate work</span>
      </span>
    </div>
  );
};

