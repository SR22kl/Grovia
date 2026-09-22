import { useEffect, useState } from "react";
import type { Order } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyDashboardOrdersData, statusColors } from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import {
  ArrowRightIcon,
  Calendar1Icon,
  ChevronRightIcon,
  Package,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = ["All", "Placed", "Out for Delivery", "Delivered", "Cancelled"];

  const { clearCart } = useCart();

  const fetchOrders = async () => {
    setOrders(dummyDashboardOrdersData as any);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart();
      setSearchParams({});

      setTimeout(() => {
        fetchOrders();
      }, 2000);
    } else {
      fetchOrders();
    }

    setLoading(false);
  }, [activeTab]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* GLASS BACKGROUND */}

      <div className="pointer-events-none fixed inset-0  overflow-hidden">
        {/* Top-left emerald glow */}
        <div
          className="
          pointer-events-none absolute
          -left-40 -top-40
          size-105
          rounded-full
          bg-emerald-400/15
          blur-[120px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />
        <div
          className="
          pointer-events-none absolute
          left-30 top-180
          size-105
          rounded-full
          bg-emerald-400/40
          blur-[120px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />

        {/* Top-right teal glow */}
        <div
          className="
          pointer-events-none absolute
          -right-32 top-[18%]
          size-90
          rounded-full
          bg-teal-300
          blur-[210px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
        />

        {/* Center emerald glow */}
        <div
          className="
          pointer-events-none absolute
          left-[45%] top-[70%]
          size-100
          rounded-full
          bg-emerald-500
          blur-[210px]
          animate-[liquidPulse_10s_ease-in-out_infinite]
        "
        />

        {/* Bottom orange glow */}
        <div
          className="
          pointer-events-none absolute
          -bottom-48 right-[10%]
          size-105
          rounded-full
          bg-orange-400/5
          blur-[130px]
          animate-[liquidFloat_14s_ease-in-out_infinite]
        "
        />

        {/* Subtle glass grid */}
        <div
          className="
          pointer-events-none absolute inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
        />

        {/* Top gloss */}
        <div
          className="
          pointer-events-none absolute inset-x-0 top-0
          h-105
          bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.07),transparent_65%)]
        "
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      {/* Navbar */}
      <section className="animate-[pageReveal_.5s_cubic-bezier(.16,1,.3,1)] mt-8">
        <Navbar />
      </section>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =======================================================
            PAGE HEADER
        ======================================================= */}

        <section
          className="
            mt-6
            animate-[pageReveal_.6s_cubic-bezier(.16,1,.3,1)]
            sm:mt-8
          "
        >
          <div
            className="
              group relative isolate
              overflow-hidden
              rounded-4xl
              border border-white/10
              bg-white/[0.035]
              px-5 py-6
              shadow-2xl shadow-black/15
              backdrop-blur-2xl
              sm:px-7 sm:py-7
            "
          >
            {/* Ambient glows */}
            <div
              className="
                pointer-events-none absolute
                -left-24 -top-28
                size-64
                rounded-full
                bg-emerald-400/8
                blur-[100px]
              "
            />

            <div
              className="
                pointer-events-none absolute
                -bottom-28 -right-20
                size-64
                rounded-full
                bg-orange-400/5
                blur-[100px]
              "
            />

            {/* Glass shine */}
            <div
              className="
                pointer-events-none absolute inset-y-0 left-[-120%]
                z-20
                w-[70%]
                skew-x-[-18deg]
                bg-linear-to-r
                from-transparent
                via-white/8
                to-transparent
                opacity-0
                transition-[left,opacity]
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:left-[150%]
                group-hover:opacity-100
              "
            />

            <div
              className="
                relative z-10
                flex flex-col gap-5
                sm:flex-row sm:items-end sm:justify-between
              "
            >
              <div>
                {/* Eyebrow */}
                <div
                  className="
                    mb-2 flex items-center gap-2
                    text-[10px] font-bold
                    uppercase tracking-[0.2em]
                    text-emerald-300/70
                    sm:text-xs
                  "
                >
                  <span
                    className="
                      size-1.5 rounded-full
                      bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,0.7)]
                    "
                  />
                  Your purchases
                </div>

                {/* Title */}
                <h1
                  className="
                    font-serif
                    text-3xl font-bold
                    tracking-tight
                    text-white
                    sm:text-4xl
                  "
                >
                  My Orders
                </h1>

                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/40">
                  Track your orders and keep an eye on everything you've
                  purchased.
                </p>
              </div>

              {/* Order count */}
              {!loading && orders.length > 0 && (
                <div
                  className="
                    flex w-fit items-center gap-3
                    rounded-2xl
                    border border-white/10
                    bg-white/4.5
                    px-4 py-3
                    shadow-lg shadow-black/10
                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      flex size-9 items-center justify-center
                      rounded-xl
                      bg-emerald-400/10
                      text-emerald-300
                    "
                  >
                    <ShoppingBag className="size-4" />
                  </div>

                  <div>
                    <p className="text-lg font-bold leading-none text-white">
                      {orders.length}
                    </p>

                    <p
                      className="
                        mt-1 text-[9px]
                        font-medium uppercase
                        tracking-[0.15em]
                        text-white/30
                      "
                    >
                      Total Orders
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FILTER TABS */}
        <section
          className="
            mt-5
            animate-[pageReveal_.6s_cubic-bezier(.16,1,.3,1)]
            sm:mt-6
          "
        >
          <div
            className="
              relative overflow-x-auto
              rounded-2xl
              border border-white/10
              bg-white/[0.035]
              p-1.5
              shadow-xl shadow-black/10
              backdrop-blur-2xl
              scrollbar-none
            "
          >
            <div className="flex min-w-max md:gap-1 gap-0.5">
              {tabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`
                      group relative
                      overflow-hidden
                      rounded-xl
                      px-4  py-2.5
                      text-xs font-semibold
                      transition-all duration-300
                      sm:text-sm
                      ${
                        isActive
                          ? "bg-emerald-400/12 text-emerald-300 shadow-lg shadow-emerald-950/10"
                          : "text-white/40 hover:bg-white/4.5 hover:text-white/75"
                      }
                    `}
                  >
                    {isActive && (
                      <>
                        {/* Active glow */}
                        <span
                          className="
                            pointer-events-none absolute
                            inset-x-4 bottom-0
                            h-px
                            bg-linear-to-r
                            from-transparent
                            via-emerald-300/80
                            to-transparent
                          "
                        />

                        {/* Active shine */}
                        <span
                          className="
                            pointer-events-none absolute inset-y-0 left-[-120%]
                            w-[70%]
                            skew-x-[-18deg]
                            bg-linear-to-r
                            from-transparent
                            via-white/8
                            to-transparent
                            opacity-0
                            transition-[left,opacity]
                            duration-700
                            group-hover:left-[150%]
                            group-hover:opacity-100
                          "
                        />
                      </>
                    )}

                    <span className="relative z-10">
                      {tab === "All" ? "All Orders" : tab}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =======================================================
            CONTENT
        ======================================================= */}

        <section className="mt-6">
          {loading ? (
            <div
              className="
                flex min-h-72
                items-center justify-center
                rounded-3xl
                border border-white/10
                bg-white/2.5
                backdrop-blur-xl
              "
            >
              <Loading />
            </div>
          ) : orders.length === 0 ? (
            /* ===================================================
               EMPTY STATE
            =================================================== */

            <div
              className="
                group relative isolate
                overflow-hidden
                rounded-4xl
                border border-white/10
                bg-white/[0.035]
                px-6 py-20
                text-center
                shadow-2xl shadow-black/10
                backdrop-blur-2xl
              "
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none absolute
                  left-1/2 top-1/2
                  size-72
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-emerald-400/6
                  blur-[100px]
                "
              />

              {/* Glass shine */}
              <div
                className="
                  pointer-events-none absolute inset-y-0 left-[-120%]
                  z-20
                  w-[70%]
                  skew-x-[-18deg]
                  bg-linear-to-r
                  from-transparent
                  via-white/8
                  to-transparent
                  opacity-0
                  transition-[left,opacity]
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:left-[150%]
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10">
                <div
                  className="
                    mx-auto mb-5
                    flex size-20
                    items-center justify-center
                    rounded-3xl
                    border border-emerald-300/10
                    bg-emerald-400/10
                    shadow-[0_0_45px_rgba(52,211,153,0.08)]
                  "
                >
                  <Package className="size-9 text-emerald-300/80" />
                </div>

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  No orders yet
                </h2>

                <p
                  className="
                    mx-auto mb-6 mt-2
                    max-w-sm
                    text-sm leading-6
                    text-white/40
                  "
                >
                  Looks like you haven't placed an order yet. Start shopping and
                  your orders will appear here.
                </p>

                <Link
                  to="/products"
                  className="
                    group relative mx-auto
                    flex w-fit
                    items-center gap-2
                    overflow-hidden
                    rounded-xl
                    border border-emerald-400/20
                    bg-emerald-400/10
                    px-5 py-2.5
                    text-sm font-semibold
                    text-emerald-200
                    shadow-lg shadow-emerald-950/10
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:border-emerald-300/30
                    hover:bg-emerald-400/15
                    hover:shadow-xl
                    active:translate-y-0
                    active:scale-[0.98]
                  "
                >
                  {/* Shine */}
                  <span
                    className="
                      pointer-events-none absolute inset-y-0 left-[-120%]
                      w-[70%]
                      skew-x-[-18deg]
                      bg-linear-to-r
                      from-transparent
                      via-white/10
                      to-transparent
                      opacity-0
                      transition-[left,opacity]
                      duration-700
                      group-hover:left-[150%]
                      group-hover:opacity-100
                    "
                  />

                  <span className="relative z-10">Start Shopping</span>

                  <ArrowRightIcon
                    className="
                      relative z-10 size-4
                      transition-transform duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>
          ) : (
            /* ===================================================
               ORDERS LIST
            =================================================== */

            <div className="space-y-4">
              {orders.map((order, index) => {
                const statusClass =
                  statusColors[order.status] ||
                  "bg-white/5 text-white/60 border-white/10";

                return (
                  <Link
                    to={`/orders/${order._id}`}
                    key={order._id}
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                    className="
                      group relative isolate block
                      overflow-hidden
                      rounded-[1.75rem]
                      border border-white/10
                      bg-white/[0.035]
                      p-5
                      shadow-2xl shadow-black/10
                      backdrop-blur-2xl
                      transition-all duration-500
                      hover:-translate-y-1
                      hover:border-emerald-400/15
                      hover:bg-white/5
                      hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                      animate-[orderReveal_.55s_cubic-bezier(.16,1,.3,1)_both]
                      sm:p-6
                    "
                  >
                    {/* =================================================
                        CARD AMBIENCE
                    ================================================= */}

                    <div
                      className="
                        pointer-events-none absolute
                        -right-24 -top-24
                        size-48
                        rounded-full
                        bg-emerald-400/5
                        blur-[80px]
                        transition-all duration-500
                        group-hover:bg-emerald-400/8
                      "
                    />

                    {/* Orange accent */}
                    <div
                      className="
                        pointer-events-none absolute
                        -bottom-24 -left-24
                        size-40
                        rounded-full
                        bg-orange-400/2.5
                        blur-[70px]
                      "
                    />

                    {/* Exact glass shine */}
                    <div
                      className="
                        pointer-events-none absolute inset-y-0 left-[-120%]
                        z-20
                        w-[70%]
                        skew-x-[-18deg]
                        bg-linear-to-r
                        from-transparent
                        via-white/8
                        to-transparent
                        opacity-0
                        transition-[left,opacity]
                        duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:left-[150%]
                        group-hover:opacity-100
                      "
                    />

                    {/* =================================================
                        TOP — ORDER INFO
                    ================================================= */}

                    <div
                      className="
                        relative z-10
                        mb-5
                        flex flex-col gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      {/* Left */}
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex size-11 shrink-0
                            items-center justify-center
                            rounded-2xl
                            border border-emerald-300/10
                            bg-emerald-400/10
                            text-emerald-300
                            transition-all duration-300
                            group-hover:scale-105
                            group-hover:bg-emerald-400/15
                          "
                        >
                          <Package className="size-5" />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-white">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5">
                            <Calendar1Icon className="size-3.5 text-white/25" />

                            <p className="text-xs text-white/35">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`
                            flex items-center gap-1.5
                            rounded-full
                            border
                            px-3.5 py-1.5
                            text-xs font-semibold
                            shadow-sm
                            backdrop-blur-xl
                            transition-all duration-300
                            group-hover:shadow-md
                            ${statusClass}
                          `}
                        >
                          <span className="size-1.5 rounded-full bg-current opacity-70" />

                          {order.status}

                          <ChevronRightIcon
                            className="
                              size-3.5 opacity-50
                              transition-transform duration-300
                              group-hover:translate-x-0.5
                            "
                          />
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="
                        relative z-10 mb-5
                        h-px
                        bg-linear-to-r
                        from-transparent
                        via-white/10
                        to-transparent
                      "
                    />

                    {/* =================================================
                        PRODUCT IMAGES
                    ================================================= */}

                    <div
                      className="
                        relative z-10
                        flex items-center gap-3
                        overflow-x-auto
                        pb-1
                        scrollbar-hide
                      "
                    >
                      {order.items.slice(0, 4).map((item, i) => (
                        <div
                          key={i}
                          className="
                            group/image relative shrink-0
                          "
                        >
                          <div
                            className="
                              flex size-14
                              items-center justify-center
                              overflow-hidden
                              rounded-2xl
                              border border-white/10
                              bg-white/4.5
                              p-1
                              shadow-lg shadow-black/10
                              backdrop-blur-xl
                              transition-all duration-300
                              group-hover/image:border-emerald-300/15
                              group-hover/image:shadow-emerald-950/20
                              sm:size-16
                            "
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="
                                size-full
                                rounded-xl
                                object-cover
                                group-hover/image:scale-110
                                transition-all duration-500
                                ease-in-out
                              "
                            />
                          </div>
                        </div>
                      ))}

                      {order.items.length > 4 && (
                        <div
                          className="
                            flex size-14 shrink-0
                            items-center justify-center
                            rounded-2xl
                            border border-dashed
                            border-emerald-300/15
                            bg-emerald-400/5
                            text-xs font-bold
                            text-emerald-300/70
                            transition-all duration-300
                            hover:bg-emerald-400/10
                            sm:size-16
                          "
                        >
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>

                    {/* =================================================
                        BOTTOM — ITEMS / PRICE / ARROW
                    ================================================= */}

                    <div
                      className="
                        relative z-10
                        mt-5
                        flex items-center
                        justify-between gap-4
                        border-t border-white/10
                        pt-4
                      "
                    >
                      {/* Items */}
                      <div className="flex items-center gap-2">
                        <div
                          className="
                            flex size-7
                            items-center justify-center
                            rounded-lg
                            bg-emerald-400/10
                          "
                        >
                          <ShoppingBag className="size-3.5 text-emerald-300" />
                        </div>

                        <span className="text-xs font-medium text-white/35">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </span>
                      </div>

                      {/* Price + arrow */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p
                            className="
                              text-[9px]
                              font-medium uppercase
                              tracking-[0.15em]
                              text-white/25
                            "
                          >
                            Total
                          </p>

                          <p className="mt-0.5 text-base font-bold text-white">
                            {currency}
                            {order.total.toFixed(2)}
                          </p>
                        </div>

                        <div
                          className="
                            flex size-9
                            items-center justify-center
                            rounded-full
                            border border-white/10
                            bg-white/4.5
                            text-white/40
                            shadow-sm
                            transition-all duration-300
                            group-hover:translate-x-1
                            group-hover:border-emerald-300/20
                            group-hover:bg-emerald-400/10
                            group-hover:text-emerald-300
                          "
                        >
                          <ArrowRightIcon className="size-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* =======================================================
            BOTTOM MESSAGE
        ======================================================= */}

        {!loading && orders.length > 0 && (
          <div
            className="
              mt-10 flex items-center
              justify-center gap-2
              text-xs text-white/25
            "
          >
            <Sparkles className="size-3.5 text-orange-300/60" />
            <span>Your orders are safely stored in your account</span>
          </div>
        )}
      </div>

      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0
          h-80
          bg-linear-to-t
          from-[#031c14]
          via-[#031c14]/60
          to-transparent
        "
      />

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`
        @keyframes pageReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.99);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes orderReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes liquidFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          35% {
            transform: translate3d(35px, -25px, 0) scale(1.06);
          }

          70% {
            transform: translate3d(-20px, 30px, 0) scale(0.96);
          }
        }

        @keyframes liquidFloatReverse {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          40% {
            transform: translate3d(-30px, 25px, 0) scale(1.05);
          }

          75% {
            transform: translate3d(25px, -20px, 0) scale(0.96);
          }
        }

        @keyframes liquidPulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(1);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default MyOrders;
