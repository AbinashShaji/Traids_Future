export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-[2px]" aria-live="polite" aria-busy="true">
      <div className="w-7 h-7 rounded-full border-2 border-[#e4e4e7] border-t-[#e11d48] animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
