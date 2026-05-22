import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { to: "/", icon: BarChart3, label: "Dashboard" },
  { to: "/category", icon: Layers, label: "Category" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/customer", icon: Users, label: "Customers" },
];

const navLinkClass = ({ isActive }) =>
  [
    "group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-300 ease-out overflow-hidden border border-neutral-300",
    isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/30"
      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
  ].join(" ");

const NavItem = ({ to, icon: Icon, label, badge, end }) => (
  <NavLink to={to} end={end} className={navLinkClass}>
    {({ isActive }) => (
      <>
        {/* Active indicator line */}
        {isActive && (
          <span
            className="absolute -left-4 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-r-full bg-sidebar-primary shadow-md shadow-sidebar-primary/40"
            aria-hidden
          />
        )}

        {/* Background hover effect */}
        <span
          className={`absolute inset-0 -z-10 transition-opacity duration-300 ${
            isActive
              ? "opacity-100 bg-gradient-to-r from-sidebar-primary/10 to-transparent"
              : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sidebar-accent/30 to-transparent"
          }`}
          aria-hidden
        />

        {/* Icon container */}
        <span
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-sidebar-primary-foreground/20 ring-2 ring-sidebar-primary-foreground/30 scale-105"
              : "bg-sidebar-accent/60 text-sidebar-accent-foreground group-hover:bg-sidebar-accent group-hover:scale-105"
          }`}
        >
          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
          {/* Icon glow effect for active state */}
          {isActive && (
            <span
              className="absolute inset-0 rounded-lg bg-sidebar-primary-foreground/10 blur-sm"
              aria-hidden
            />
          )}
        </span>

        {/* Label */}
        <span className="flex-1 truncate font-medium">{label}</span>

        {/* Badge */}
        {badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-all ${
              isActive
                ? "bg-sidebar-primary-foreground/25 text-sidebar-primary-foreground"
                : "bg-rose-500/15 text-rose-600 group-hover:bg-rose-500/20"
            }`}
          >
            {badge}
          </span>
        )}

        {/* Chevron indicator */}
        <ChevronRight
          size={16}
          className={`shrink-0 transition-all duration-300 ${
            isActive
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
          }`}
        />
      </>
    )}
  </NavLink>
);

const Sidebar = ({ user }) => {
  const initials =
    user?.firstName || user?.lastName
      ? `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`
      : "BG";

  return (
    <aside className="relative flex h-full w-[18rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl">
      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sidebar-primary/[0.08] via-sidebar-primary/[0.03] to-transparent"
        aria-hidden
      />

      {/* Brand Section */}
      <div className="relative px-5 pt-3 pb-5">
        <div className="flex items-center gap-3.5">
          {/* Logo */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary via-sidebar-primary to-sidebar-primary/90 shadow-xl shadow-sidebar-primary/30 ring-1 ring-sidebar-primary-foreground/20">
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden
            >
              <circle
                cx="9"
                cy="9"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.6"
                className="text-sidebar-primary-foreground/80"
              />
              <circle
                cx="9"
                cy="9"
                r="2"
                fill="currentColor"
                className="text-sidebar-primary-foreground"
              />
            </svg>
            {/* Online status indicator */}
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-sidebar shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="sr-only">Online</span>
            </span>
            {/* Pulse animation */}
            <span
              className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-emerald-500/50"
              aria-hidden
            />
          </div>

          {/* Brand text */}
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-[1.4rem] font-bold leading-tight tracking-tight text-sidebar-foreground">
              BuyGoo
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <Sparkles
                className="h-3.5 w-3.5 text-amber-500"
                strokeWidth={2.5}
              />
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/80">
                Store Admin
              </p>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="mt-5 h-px bg-gradient-to-r from-transparent via-sidebar-border to-transparent" />
      </div>

      {/* Navigation Section */}
      <div className="relative flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sidebar-border/50 hover:scrollbar-thumb-sidebar-border/80">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/90">
            Navigation
          </p>
          <div className="h-px flex-1 ml-3 bg-gradient-to-r from-sidebar-border/50 to-transparent" />
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} end={item.to === "/"} />
          ))}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="relative space-y-3 border-t border-sidebar-border bg-sidebar-accent/20 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/90">
            System
          </p>
          <div className="h-px flex-1 ml-3 bg-gradient-to-r from-sidebar-border/50 to-transparent" />
        </div>

        <NavItem to="/settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
};

export default Sidebar;
