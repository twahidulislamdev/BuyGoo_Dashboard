import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Layers,
  Sparkles,
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
    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/20"
      : "text-sidebar-foreground/75 hover:bg-sidebar-accent/90 hover:text-sidebar-foreground",
  ].join(" ");

const NavItem = ({ to, icon: Icon, label, badge, end }) => (
  <NavLink to={to} end={end} className={navLinkClass}>
    {({ isActive }) => (
      <>
        {isActive && (
          <span
            className="absolute -left-3 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary"
            aria-hidden
          />
        )}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all ${
            isActive
              ? "bg-sidebar-primary-foreground/15 ring-1 ring-sidebar-primary-foreground/20"
              : "bg-sidebar-accent/80 text-sidebar-accent-foreground group-hover:bg-sidebar-accent"
          }`}
        >
          <Icon size={18} strokeWidth={isActive ? 2.25 : 1.75} />
        </span>
        <span className="flex-1 truncate">{label}</span>
        {badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              isActive
                ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                : "bg-rose-500/10 text-rose-600"
            }`}
          >
            {badge}
          </span>
        )}
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
    <aside className="relative flex h-full w-[18rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sidebar-primary/[0.06] to-transparent"
        aria-hidden
      />

      {/* Brand */}
      <div className="relative px-5 pt-7 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 shadow-lg shadow-sidebar-primary/25 ring-1 ring-sidebar-border/50">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
              <circle
                cx="9"
                cy="9"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.6"
                className="text-sidebar-primary-foreground/75"
              />
              <circle
                cx="9"
                cy="9"
                r="2"
                fill="currentColor"
                className="text-sidebar-primary-foreground"
              />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-sidebar">
              <span className="sr-only">Online</span>
            </span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-serif text-[1.35rem] font-semibold leading-tight tracking-tight text-sidebar-foreground">
              BuyGoo
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-amber-500/90" strokeWidth={2.5} />
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Store Admin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin">
        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/90">
          Navigation
        </p>
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} end={item.to === "/"} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="relative space-y-2.5 border-t border-sidebar-border bg-sidebar-accent/30 px-4 py-4">
        <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/90">
          System
        </p>
        <NavItem to="/settings" icon={Settings} label="Settings" />

        {user ? (
          <div className="flex items-center gap-3 rounded-xl border border-sidebar-border/80 bg-sidebar p-3 shadow-sm">
            <Avatar className="h-10 w-10 shrink-0 ring-2 ring-sidebar-border">
              <AvatarFallback className="bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-xs font-bold text-sidebar-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-sidebar-border/60 bg-sidebar p-3 animate-pulse">
            <div className="h-10 w-10 shrink-0 rounded-full bg-sidebar-accent" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-28 rounded-md bg-sidebar-accent" />
              <div className="h-2.5 w-36 rounded-md bg-sidebar-accent/70" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
