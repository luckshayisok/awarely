"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back 👋</h1>
        <p className="text-gray-400">Here’s your focus summary for today.</p>
      </div>

      <button className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">
        Sync Data
      </button>
    </header>
  );
}
