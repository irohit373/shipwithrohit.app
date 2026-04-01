export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-white p-4 text-black dark:bg-black dark:text-white">
      <div className="border-2 border-black p-6 text-center dark:border-white">
        <p className="font-mono text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Loading 3D Story</p>
        <p className="mt-2 text-lg font-black uppercase tracking-tight animate-pulse">Preparing Scene</p>
      </div>
    </main>
  );
}
