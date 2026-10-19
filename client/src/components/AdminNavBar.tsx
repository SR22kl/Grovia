import {
  BikeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
            <Link
              to="/"
              className="
                group/logo
                flex shrink-0
                items-center gap-2.5
                rounded-xl
                px-1.5 py-1
                transition-all duration-300
              "
            >
              <div
                className="
                  relative flex size-9
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  border border-emerald-400/20
                  bg-emerald-400/8
                  shadow-lg shadow-emerald-950/10
                  transition-all duration-300
                  group-hover/logo:scale-105
                  group-hover/logo:border-emerald-400/35
                  group-hover/logo:bg-emerald-400/13
                "
              >
                <BikeIcon
                  className="
                    size-5
                    text-emerald-300
                    transition-transform
                    duration-500
                    group-hover/logo:translate-x-0.5
                    group-hover/logo:rotate-[-4deg]
                  "
                />

                <span
                  className="
                    pointer-events-none absolute
                    inset-y-0 -left-full
                    w-1/2
                    skew-x-[-18deg]
                    bg-linear-to-r
                    from-transparent
                    via-white/15
                    to-transparent
                    transition-all duration-700
                    group-hover/logo:left-[150%]
                  "
                />
              </div>

              <span className="text-[20px] font-bold tracking-tight text-white">
                Grovia
              </span>
            </Link>
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
