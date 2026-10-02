"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart3, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Focus Stats", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? "5rem" : "16rem" }}
      className="h-screen bg-[#0f1117] border-r border-gray-800 flex flex-col py-6 relative overflow-hidden"
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 bg-[#0f1117] border border-gray-800 p-1.5 rounded-full hover:bg-gray-900"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        {!collapsed && (
          <h1 className="text-2xl font-bold text-white tracking-wide">Awarely ⚡</h1>
        )}
        {collapsed && <div className="text-white font-bold text-xl">⚡</div>}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className="relative flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeHighlight"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 rounded-xl blur-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="relative z-10 font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Bottom Settings */}
      <div className="mt-auto flex justify-center">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
