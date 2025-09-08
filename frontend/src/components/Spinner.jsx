export default function Spinner() {
  return (
    <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
