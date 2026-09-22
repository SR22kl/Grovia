import { NavLink, Outlet } from "react-router-dom";
import {
  PlusIcon,
  PackageSearchIcon,
  ShoppingBagIcon,
  LogOutIcon,
  BarChart3Icon,
  ShieldIcon,
  Sparkles,
  Truck,
} from "lucide-react";
import AdminNavBar from "../../components/AdminNavBar";

export default function AdminLayout() {
  const AdminLinkData = [
    {
      to: "/admin",
      label: "Dashboard",
      icon: BarChart3Icon,
    },
    {
      to: "/admin/products/new",
      label: "Add Product",
      icon: PlusIcon,
    },
    {
      to: "/admin/products",
      label: "Products",
      icon: PackageSearchIcon,
    },
    {
      to: "/admin/orders",
      label: "Orders",
      icon: ShoppingBagIcon,
    },
    {
      to: "/admin/delivery-partners",
      label: "Delivery Partners",
      icon: Truck,
    },
    {
      to: "/",
      label: "Exit",
      icon: LogOutIcon,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Emerald Glow */}
        {/* Ambient emerald glow - top left */}
        <div
          className="
          pointer-events-none absolute
          -left-20 top-20
          size-105
          rounded-full
          bg-emerald-400/80
          blur-[200px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />

        {/* Ambient teal glow - top right */}
        <div
          className="
          pointer-events-none absolute
          -right-15 top-[12%]
          size-100
          rounded-full
          bg-teal-400/60
          blur-[180px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
        />

        {/* Ambient emerald glow - center */}
        <div
          className="
          pointer-events-none absolute
          left-[35%] top-[12%]
          size-125
          rounded-full
          bg-emerald-500/80
          blur-[180px]
          animate-[liquidPulse_10s_ease-in-out_infinite]
        "
        />

        {/* Ambient glow - bottom */}
        <div
          className="
          pointer-events-none absolute
          -bottom-48 right-[10%]
          size-105
          rounded-full
          bg-emerald-300/50
          blur-[130px]
          animate-[liquidFloat_14s_ease-in-out_infinite]
        "
        />
        {/* Grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.055]
            [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,#031c14_92%)]
            opacity-70
          "
        />

        {/* Top Gloss */}
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-white/[0.035] via-transparent to-transparent" />
      </div>

      {/* =========================================================
          ADMIN NAVBAR
      ========================================================= */}
      <section className="relative z-30 px-3 pt-3 sm:px-5 lg:px-6">
        <AdminNavBar />
      </section>

      {/* =========================================================
          ADMIN WORKSPACE
      ========================================================= */}
      <div
        className="
          relative z-10
          mx-auto
          flex
          min-h-[calc(100vh-100px)]
          max-w-7xl
          flex-col
          gap-6
          px-4
          py-6
          sm:px-6
          lg:flex-row
          lg:gap-8
          lg:px-8
        "
      >
        {/* =======================================================
            ADMIN SIDEBAR
        ======================================================= */}
        <aside
          className="
            group/sidebar
            relative
            w-full
            shrink-0
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-white/[0.035]
            p-3
            shadow-[0_25px_80px_rgba(0,0,0,0.22)]
            backdrop-blur-2xl

            lg:h-fit
            lg:w-64
            lg:p-4
          "
        >
          {/* Sidebar Ambient Glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              size-40
              rounded-full
              bg-emerald-400/8
              blur-3xl
            "
          />

          {/* =====================================================
              SIDEBAR HEADER
          ===================================================== */}
          <div
            className="
              relative
              mb-3
              hidden
              border-b
              border-white/10
              pb-4
              lg:block
            "
          >
            <div className="flex items-center gap-3 px-2">
              <div
                className="
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-400/20
                  bg-emerald-400/10
                  text-emerald-300
                  shadow-[0_0_25px_rgba(52,211,153,0.08)]
                "
              >
                <ShieldIcon className="size-5" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/60">
                  Grovia
                </p>

                <h2 className="text-sm font-semibold text-white">
                  Admin Panel
                </h2>
              </div>
            </div>
          </div>

          {/* =====================================================
              SIDEBAR NAVIGATION
          ===================================================== */}
          <nav
            className="
              relative
              flex
              gap-1.5
              overflow-x-auto
              no-scrollbar

              lg:flex-col
              lg:overflow-visible
            "
          >
            {AdminLinkData.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={true}
                className={({ isActive }) =>
                  `
                    group/link
                    relative
                    flex
                    shrink-0
                    items-center
                    gap-2.5
                    overflow-hidden
                    rounded-xl
                    border
                    px-3
                    py-2.5
                    text-sm
                    transition-all
                    duration-300
                    ease-out

                    ${
                      isActive
                        ? `
                          border-emerald-400/20
                          bg-emerald-400/10
                          text-emerald-200
                          shadow-[0_8px_30px_rgba(16,185,129,0.08)]
                        `
                        : `
                          border-transparent
                          text-white/45
                          hover:border-white/10
                          hover:bg-white/4.5
                          hover:text-white/85
                        `
                    }
                  `
                }
              >
                {/* Active Indicator */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-y-2
                    left-0
                    w-0.5
                    rounded-full
                    bg-emerald-400
                    opacity-0
                  "
                />

                {/* Icon */}
                <link.icon
                  className="
                    relative
                    z-10
                    size-5
                    shrink-0
                    transition-transform
                    duration-300
                    group-hover/link:scale-110
                  "
                />

                {/* Label */}
                <span className="relative z-10 whitespace-nowrap">
                  {link.label}
                </span>

                {/* Hover Shine */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-[-120%]
                    w-[70%]
                    skew-x-[-18deg]
                    bg-linear-to-r
                    from-transparent
                    via-white/[0.07]
                    to-transparent
                    opacity-0
                    transition-[left,opacity]
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover/link:left-[150%]
                    group-hover/link:opacity-100
                  "
                />
              </NavLink>
            ))}
          </nav>

          {/* =====================================================
              SIDEBAR FOOTER
          ===================================================== */}
          <div
            className="
              relative
              mt-5
              hidden
              border-t
              border-white/10
              pt-4
              lg:block
            "
          >
            <div className="flex items-center gap-2 px-2 text-[11px] text-white/30">
              <Sparkles className="size-3.5 text-emerald-400/60" />

              <span>Grovia Administration</span>
            </div>
          </div>
        </aside>

        {/* =======================================================
            MAIN ADMIN CONTENT
        ======================================================= */}
        <main
          className="
            min-w-0
            flex-1
            overflow-y-auto
            pb-20
            pr-1
            no-scrollbar
            animate-[adminContentEnter_.55s_cubic-bezier(.16,1,.3,1)]
          "
        >
          <Outlet />
        </main>
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}
      <style>{`
        @keyframes adminContentEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
