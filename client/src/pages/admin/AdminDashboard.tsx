import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PackageIcon,
  UsersIcon,
  ShoppingBagIcon,
  AlertTriangleIcon,
  ArrowUpRightIcon,
  ActivityIcon,
} from "lucide-react";
import Loading from "../../components/Loading";
import { dummyAdminDashboardData, statusColors } from "../../assets/assets";

interface Stats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  outOfStock: number;
  recentOrders: any[];
}

export default function AdminDashboard() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats(dummyAdminDashboardData);
      setLoading(false);
    }, 1000);
  }, []);

  const cards = stats
    ? [
        {
          label: "Total Orders",
          value: stats.totalOrders,
          icon: ShoppingBagIcon,
          accent: "emerald",
        },
        {
          label: "Total Users",
          value: stats.totalUsers,
          icon: UsersIcon,
          accent: "teal",
        },
        {
          label: "Total Products",
          value: stats.totalProducts,
          icon: PackageIcon,
          accent: "orange",
        },
        {
          label: "Out of Stock",
          value: stats.outOfStock,
          icon: AlertTriangleIcon,
          accent: "red",
        },
      ]
    : [];

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/50">
            Overview
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-white/40">
            Here's what's happening across your store.
          </p>
        </div>

        <div
          className="
            flex w-fit items-center gap-2
            rounded-full
            border border-emerald-400/15
            bg-emerald-400/[0.06]
            px-3 py-1.5
            text-xs font-medium
            text-emerald-200/70
          "
        >
          <ActivityIcon className="size-3.5" />
          Store Overview
        </div>
      </div>

      {/* =========================================================
          STAT CARDS
      ========================================================= */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          const iconStyles = {
            emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
            teal: "border-teal-400/20 bg-teal-400/10 text-teal-300",
            orange: "border-orange-400/20 bg-orange-400/10 text-orange-300",
            red: "border-red-400/20 bg-red-400/10 text-red-300",
          };

          return (
            <div
              key={card.label}
              className="
                group relative isolate overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.035]
                p-4 sm:p-5
                shadow-[0_20px_60px_rgba(0,0,0,0.16)]
                backdrop-blur-2xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-white/15
                hover:bg-white/[0.05]
              "
              style={{
                animation: `adminCardEnter .5s cubic-bezier(.16,1,.3,1) ${
                  index * 70
                }ms both`,
              }}
            >
              {/* Ambient Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-emerald-400/[0.06] blur-3xl" />

              {/* Shine */}
              <div
                className="
                  pointer-events-none absolute inset-y-0 left-[-120%]
                  z-20 w-[65%] skew-x-[-18deg]
                  bg-linear-to-r
                  from-transparent
                  via-white/[0.06]
                  to-transparent
                  opacity-0
                  transition-[left,opacity]
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:left-[150%]
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {card.value}
                  </p>

                  <p className="mt-1 truncate text-xs text-white/40 sm:text-sm">
                    {card.label}
                  </p>
                </div>

                <div
                  className={`
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl border
                    transition-transform duration-300
                    group-hover:scale-110
                    ${iconStyles[card.accent as keyof typeof iconStyles]}
                  `}
                >
                  <Icon className="size-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          RECENT ORDERS
      ========================================================= */}
      <section
        className="
          group relative isolate overflow-hidden
          rounded-3xl
          border border-white/10
          bg-white/[0.035]
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          backdrop-blur-2xl
        "
      >
        {/* Header Glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-64 rounded-full bg-emerald-400/[0.05] blur-[100px]" />

        {/* Shine */}
        <div
          className="
            pointer-events-none absolute inset-y-0 left-[-120%]
            z-20 w-[45%] skew-x-[-18deg]
            bg-linear-to-r
            from-transparent
            via-white/[0.04]
            to-transparent
            opacity-0
            transition-[left,opacity]
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:left-[150%]
            group-hover:opacity-100
          "
        />

        <div className="relative z-10 flex flex-col gap-3 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/50">
              Activity
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
              Recent Orders
            </h2>
          </div>

          <Link
            to="/admin/orders"
            className="
              flex w-fit items-center gap-1.5
              rounded-xl
              border border-emerald-400/15
              bg-emerald-400/[0.06]
              px-3 py-2
              text-xs font-medium
              text-emerald-200/80
              transition-all duration-300
              hover:border-emerald-400/25
              hover:bg-emerald-400/[0.10]
              hover:text-emerald-200
            "
          >
            View All
            <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>

        <div className="relative z-10 overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.015] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Items</th>
                <th className="px-6 py-3.5">Total</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {stats?.recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-white/35"
                  >
                    No orders yet.
                  </td>
                </tr>
              ) : (
                stats?.recentOrders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="
                      group/row
                      transition-colors duration-200
                      hover:bg-white/[0.025]
                    "
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-emerald-200/60">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-white/85">
                        {order.user?.name || "—"}
                      </p>

                      <p className="mt-0.5 text-xs text-white/35">
                        {order.user?.email || ""}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-white/45">
                      {order.items?.length || 0} items
                    </td>

                    <td className="px-6 py-4 font-medium text-white/80">
                      {currency}
                      {order.total?.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          border
                          px-2.5 py-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wide
                          ${
                            statusColors[order.status] ||
                            "border-white/10 bg-white/[0.05] text-white/50"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-white/35">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <style>{`
        @keyframes adminCardEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
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
