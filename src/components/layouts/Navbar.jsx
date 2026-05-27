import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  LogOut,
  LifeBuoy,
  KeyRound,
  ChevronDown,
  User,
  ChevronUp,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);

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

  // Fetch Admin Name Email With Avatar for Display In Navbar
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/admin/currentuser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user) {
          setCurrentUser(res.data.user);
        }
      });
  }, []);

  // Logout Functionality
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/admin/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setCurrentUser(null);
      toast.success("Logged out successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      setCurrentUser(null);
      toast.error("Session expired or error occurred. Redirecting...");
      navigate("/login", { replace: true });
    }
  };

  const initials = currentUser
    ? `${currentUser.firstName?.charAt(0) || ""}${currentUser.lastName?.charAt(0) || ""}`
    : "AU";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      {/* Gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />

      <div className="px-5 lg:px-10 h-[4.5rem] flex items-center justify-end">
        {/* Brand Section */}
        

        {/* Right Side Actions */}
        <div className="flex items-center gap-3" ref={dropdownRef}>
          {/* Notification Button */}
          <button
            className="relative p-2.5 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
            aria-label="Notifications"
          >
            <Bell
              size={20}
              strokeWidth={2}
              className="transition-transform group-hover:scale-110"
            />
            {notificationCount > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white shadow-md">
                  {notificationCount}
                </span>
                <span className="absolute top-1.5 right-1.5 h-4 w-4 animate-ping rounded-full bg-rose-400/50" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-slate-200" />

          {/* Profile Trigger */}
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
              isProfileOpen
                ? "bg-slate-100 shadow-md ring-2 ring-slate-200/50 "
                : "hover:bg-neutral-100 border border-neutral-300 hover:via-border-neutral-500 hover:shadow-sm"
            }`}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            {/* User Info - Desktop */}
            <div className="hidden lg:block text-left min-w-0 cursor-pointer">
              <p className="text-base font-semibold text-black leading-tight truncate">
                {currentUser
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : "Admin User"}
              </p>
              <p className="text-xs text-neutral-700 leading-tight mt-0.5 truncate">
                {currentUser?.email || "admin@system.com"}
              </p>
            </div>

            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-slate-200 shadow-sm ring-2 ring-white transition-all group-hover:border-slate-300 group-hover:shadow-md">
                <AvatarFallback className="bg-gradient-to-br from-slate-900 to-slate-700 text-white text-sm font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm">
                <span className="sr-only">Online</span>
              </span>
            </div>

            {/* Chevron */}
            <ChevronUp
              size={16}
              className={`hidden sm:block text-slate-400 transition-transform duration-300 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-5 lg:right-10 top-[5rem] w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50 ">
              {/* User Info Header - Mobile */}
              <div className="lg:hidden px-3 py-3 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-slate-200 shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-slate-900 to-slate-700 text-white text-sm font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {currentUser
                        ? `${currentUser.firstName} ${currentUser.lastName}`
                        : "Admin User"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {currentUser?.email || "admin@system.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-150 group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
                    <User size={16} strokeWidth={2} />
                  </div>
                  <span className="flex-1 text-left cursor-pointer">View Profile</span>
                  <ChevronDown
                    size={14}
                    className="-rotate-90 text-slate-400"
                  />
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-150 group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
                    <KeyRound size={16} strokeWidth={2} />
                  </div>
                  <span className="flex-1 text-left cursor-pointer">Change Password</span>
                  <ChevronDown
                    size={14}
                    className="-rotate-90 text-slate-400"
                  />
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-150 group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
                    <LifeBuoy size={16} strokeWidth={2} />
                  </div>
                  <span className="flex-1 text-left cursor-pointer">Help & Support</span>
                  <ChevronDown
                    size={14}
                    className="-rotate-90 text-slate-400"
                  />
                </button>
              </div>

              {/* Logout Section */}
              <div className="border-t border-slate-100 bg-slate-50/50 p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-150 group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600 group-hover:bg-rose-200 transition-colors">
                    <LogOut size={16} strokeWidth={2} />
                  </div>
                  <span className="flex-1 text-left cursor-pointer">Sign Out</span>
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
