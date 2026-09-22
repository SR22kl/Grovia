import {
  LayoutDashboardIcon,
  LogOutIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-6">
      <nav
        className="
          group relative isolate
          mx-auto max-w-7xl
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-[#061f17]/85
          shadow-2xl shadow-black/20
          backdrop-blur-2xl
        "
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-48 rounded-full bg-emerald-400/[0.07] blur-3xl" />

        {/* Glass Shine */}
        <div
          className="
            pointer-events-none absolute inset-y-0 left-[-120%]
            z-20 w-[45%] skew-x-[-18deg]
            bg-linear-to-r
            from-transparent
            via-white/[0.06]
            to-transparent
            opacity-0
            transition-[left,opacity]
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:left-[150%]
            group-hover:opacity-100
          "
        />

        <div className="relative z-10 flex h-16 items-center justify-between px-4 sm:px-5">
          {/* Brand */}
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="group/brand flex items-center gap-3"
          >
            {/* Logo */}
            <div
              className="
                flex size-10 items-center justify-center
                rounded-xl
                border border-emerald-400/20
                bg-emerald-400/10
                text-emerald-300
                shadow-[0_0_25px_rgba(52,211,153,0.08)]
                transition-all duration-300
                group-hover/brand:border-emerald-300/30
                group-hover/brand:bg-emerald-400/[0.14]
                group-hover/brand:shadow-[0_0_30px_rgba(52,211,153,0.12)]
              "
            >
              <ShieldCheckIcon className="size-5" />
            </div>

            {/* Brand Text */}
            <div className="hidden sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/60">
                Grovia
              </p>

              <p className="text-sm font-semibold text-white">Admin Panel</p>
            </div>
          </button>

          {/* Center Status */}
          <div
            className="
              hidden items-center gap-2
              rounded-full
              border border-emerald-400/15
              bg-emerald-400/[0.06]
              px-3 py-1.5
              md:flex
            "
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-xs font-medium text-emerald-200/80">
              Admin Mode
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dashboard */}
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="
                hidden items-center gap-2
                rounded-xl
                border border-white/10
                bg-white/[0.035]
                px-3 py-2
                text-xs font-medium
                text-white/55
                transition-all duration-300
                hover:border-emerald-400/20
                hover:bg-emerald-400/[0.08]
                hover:text-emerald-200
                sm:flex
              "
            >
              <LayoutDashboardIcon className="size-4" />
              Dashboard
            </button>

            {/* User */}
            <button
              type="button"
              className="
                flex items-center gap-2
                rounded-xl
                border border-white/10
                bg-white/[0.035]
                px-2.5 py-2
                text-white/70
                transition-all duration-300
                hover:border-white/15
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <UserCircleIcon className="size-5 text-emerald-300/80" />

              <span className="hidden text-xs font-medium sm:block">Admin</span>
            </button>

            {/* Exit */}
            <button
              type="button"
              onClick={() => navigate("/")}
              title="Exit Admin"
              className="
                flex size-9 items-center justify-center
                rounded-xl
                border border-orange-400/10
                bg-orange-400/[0.05]
                text-orange-200/70
                transition-all duration-300
                hover:border-orange-400/20
                hover:bg-orange-400/[0.10]
                hover:text-orange-200
              "
            >
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavBar;
