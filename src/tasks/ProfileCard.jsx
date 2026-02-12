export default function ProfileCard({ user }) {
  return (
    <div className="bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-lg shadow-black/60 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {user?.fullName?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-neutral-900 shadow-[0_0_6px_#22c55e]"></span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-white truncate">
            {user?.fullName || "User"}
          </h2>
        </div>
        <span className="hidden sm:inline-flex items-center px-3 py-1 text-xs font-medium bg-green-600/20 text-green-400 rounded-full border border-green-500/30">
          Active
        </span>

      </div>
    </div>
  );
}
