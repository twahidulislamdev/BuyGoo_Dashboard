import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, LifeBuoy, KeyRound } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const dropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/v1/auth/currentuser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user) {
          setCurrentUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch current user:", err);
      });
  }, []);

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
      <div className="px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            ADMIN
          </h1>
          <span className="hidden md:block text-xs font-semibold text-slate-500 tracking-wide uppercase bg-slate-100 px-2 py-0.5 rounded">
            Dashboard
          </span>
        </div>

        {/* Right Side */}
        <div
          className="flex items-center gap-2 sm:gap-4 relative border border-neutral-300 rounded-full p-1"
          ref={dropdownRef}
        >
          {/* Notification */}
          <button className="p-5 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
            <Bell size={20} />
          </button>

          {/* Profile Trigger - Name and Email remain here */}
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className={`flex items-center gap-3 pl-3 py-1.5 px-2   rounded-full transition-all cursor-pointer  ${
              isProfileOpen
                ? "bg-slate-50 border border-neutral-400 shadow-sm"
                : " hover:bg-slate-50 border border-neutral-300"
            }`}
          >
            <div className="hidden lg:block text-right pl-3">
              <p className="text-base font-semibold text-slate-900 leading-none">
                {currentUser
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : "Admin User"}
              </p>
              <p className="text-sm text-slate-500 mt-1.5 leading-none">
                {currentUser?.email || "admin@system.com"}
              </p>
            </div>
            <Avatar className="flex justify-end h-12 w-12 border border-slate-200 shadow-sm">
              <AvatarFallback className="bg-slate-900 text-white text-xs font-bold">
                {currentUser?.firstName?.charAt(0)}
                {currentUser?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-3 w-[310px] mr-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="py-1.5">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <KeyRound size={16} className="text-slate-400" />
                  Change Password
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <LifeBuoy size={16} className="text-slate-400" />
                  Help & Support
                </button>
              </div>

              <div className="border-t border-slate-100 ">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={16} />
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
