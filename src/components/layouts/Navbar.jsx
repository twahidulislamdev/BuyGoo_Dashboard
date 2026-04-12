import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, User, Key, LifeBuoy } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/70 shadow-sm">
      <div className="px-10 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            ADMIN
          </h1>
          <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Dashboard
          </span>
        </div>

        {/* Right Side */}
        <div
          className="flex items-center gap-4 sm:gap-6 relative"
          ref={dropdownRef}
        >
          {/* Notification */}
          <button className="relative p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Profile Trigger */}
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="group flex items-center gap-3 rounded-full pl-2 pr-2.5 py-1.5 hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="hidden sm:block text-right leading-tight">
              <p className="text-md font-semibold text-slate-900">
                Twahidul Islam
              </p>
              <p className="text-sm text-slate-500 font-medium">Super Admin</p>
            </div>

            <Avatar className="h-10 w-10 border border-slate-200 shadow-sm">
              <AvatarFallback className="bg-slate-900 text-white text-sm font-bold">
                TI
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full  w-72 sm:w-80 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 mt-5">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
                <p className="font-semibold text-slate-900">Twahidul Islam</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  admin@dashboard.com
                </p>
              </div>

              {/* Menu */}
              <div className="py-2">
                {[
                  { icon: User, label: "Profile Settings" },
                  { icon: Key, label: "Change Password" },
                  { icon: LifeBuoy, label: "Help & Support" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 px-6 py-2.5 text-sm text-slate-700 hover:bg-neutral-200 transition cursor-pointer"
                  >
                    <Icon size={18} className="text-slate-500" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-neutral-300">
                <button className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-red-800 hover:bg-red-50 transition">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
