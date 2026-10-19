import { Link, Outlet, useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut, Truck, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import type { DeliveryPartner } from "../../types";

export default function DeliveryLayout() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState<DeliveryPartner | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("delivery_partner");
    const token = localStorage.getItem("delivery_token");

    if (!saved || !token) {
      navigate("/delivery/login");
      return;
    }
    setPartner(JSON.parse(saved));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("delivery_partner");
    localStorage.removeItem("delivery_token");
    setPartner(null);
    navigate("/delivery/login");
  };

  if (!partner) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031c14]">
      {/* Glass Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Ambient emerald glows */}
        <div className="absolute -left-48 -top-48 size-150 rounded-full bg-emerald-500/15 blur-[140px]" />

        <div className="absolute -right-55 top-[15%] size-137.5 rounded-full bg-green-400/10 blur-[140px]" />

        <div className="absolute -bottom-62.5 left-[35%] size-125 rounded-full bg-teal-400/10 blur-[130px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#031c14]/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/delivery"
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
                  relative flex size-10
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
              <Truck
                className="
                    size-6
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

            <div>
              <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
                Grovia
                <span className="text-emerald-400"> Delivery</span>
              </h1>

              <div className="hidden items-center gap-1.5 sm:flex">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium text-white/35">
                  Delivery Partner Portal
                </span>
              </div>
            </div>
          </Link>

          {/* Partner */}
          <div className="flex items-center gap-3">
            {/* Online status */}
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/6 px-3 py-1.5 sm:flex">
              <Wifi className="size-3.5 text-emerald-400" />

              <span className="text-[10px] font-semibold text-emerald-300">
                Online
              </span>
            </div>

            <div className="h-7 w-px bg-white/10" />

            {/* Profile */}
            <div className="flex items-center gap-2.5">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold text-white/80">
                  {partner.name}
                </p>

                <p className="text-[10px] text-white/30">Delivery Partner</p>
              </div>

              <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/6">
                <CircleUserRound className="size-4.5 text-white/55" />
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="group flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-white/40 transition-all duration-300 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
            >
              <LogOut className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="animate-[fadeUp_.45s_ease-out]">
          <Outlet />
        </div>
      </main>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
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
