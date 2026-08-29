import { LoadingLogo } from "../components/loading-logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-paper transition-colors duration-300">
      <LoadingLogo className="w-[60vw] h-[60vw] max-w-[400px] max-h-[400px]" />
    </div>
  );
}
