import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Layers,
} from "lucide-react";

const navItems = [
  { to: "/", icon: BarChart3, label: "Dashboard" },
  { to: "/category", icon: Layers, label: "Category" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/customer", icon: Users, label: "Customers" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen flex flex-col bg-white border-r-2 border-neutral-300 ">
      {/* Brand */}
      <div className="px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle
                cx="9"
                cy="9"
                r="5.5"
                stroke="#e8e0d0"
                strokeWidth="1.6"
              />
              <circle cx="9" cy="9" r="2" fill="#e8e0d0" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-2xl font-semibold text-gray-900 tracking-tighter">
              BuyGoo
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gray-100 mb-6" />

      {/* Navigation */}
      <div className="flex-1 px-3">
        <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">
          MAIN MENU
        </p>

        <nav className="space-y-2.5 px-1">
          {navItems.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200  ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm "
                    : "hover:text-gray-900 hover:bg-gray-100 bg-neutral-100 border border-neutral-400 text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                      isActive
                        ? "bg-white/10"
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                  </div>
                  <span className="flex-1">{label}</span>

                  {badge && (
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Settings only */}
      <div className="mt-auto px-3 pb-8">
        <div className="mx-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200  ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm "
                  : "hover:text-gray-900 hover:bg-gray-100 bg-neutral-100 border border-neutral-400 text-black"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? "bg-white/10"
                      : "bg-gray-100 group-hover:bg-gray-200"
                  }`}
                >
                  <Settings size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className="flex-1">Settings</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
