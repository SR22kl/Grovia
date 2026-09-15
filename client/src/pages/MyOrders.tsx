import { useEffect, useState } from "react";
import type { Order } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyDashboardOrdersData, statusColors } from "../assets/assets";
import Loading from "../components/Loading";
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
    <div className="relative min-h-screen overflow-hidden bg-app-cream">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div
        className="
          pointer-events-none
          absolute -left-40 top-20
          h-96 w-96
          rounded-full
          bg-green-200/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-40 top-1/3
          h-96 w-96
          rounded-full
          bg-orange-200/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute bottom-0 left-1/3
          h-80 w-80
          rounded-full
          bg-emerald-200/10
          blur-3xl
        "
      />

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              {/* Small label */}
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-full
                    bg-app-green/10
                    text-app-green
                  "
                >
                  <ShoppingBag className="size-3.5" />
                </span>

                <span
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-app-green
                  "
                >
                  Your purchases
                </span>
              </div>

              {/* Title */}
              <h1
                className="
                  font-serif
                  text-3xl
                  font-bold
                  tracking-tight
                  text-app-green
                  sm:text-4xl
                "
              >
                My Orders
              </h1>

              <p
                className="
                  mt-1.5
                  max-w-lg
                  text-sm
                  text-app-text-light
                "
              >
                Track your orders and keep an eye on everything you've
                purchased.
              </p>
            </div>

            {/* Order count */}
            {!loading && orders.length > 0 && (
              <div
                className="
                  hidden
                  rounded-2xl
                  border border-white/70
                  bg-white/50
                  px-4 py-2.5
                  text-right
                  shadow-sm
                  backdrop-blur-md
                  sm:block
                "
              >
                <p
                  className="
                    text-xl
                    font-bold
                    leading-none
                    text-app-green
                  "
                >
                  {orders.length}
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    font-medium
                    text-app-text-light
                  "
                >
                  Total Orders
                </p>
              </div>
            )}
          </div>
        </div>
        {/* FILTER TABS */}
        <div
          className="
            mb-7
            overflow-x-auto
            rounded-2xl
            border border-white/70
            bg-white/45
            p-1.5
            shadow-sm
            backdrop-blur-xl
            scrollbar-hide
          "
        >
          <div className="flex min-w-max gap-1">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative
                    rounded-xl
                    px-4 py-2
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? `
                          bg-app-green
                          text-white
                          shadow-md
                          shadow-green-900/15
                        `
                        : `
                          text-app-text-light
                          hover:bg-white/70
                          hover:text-app-green
                        `
                    }
                  `}
                >
                  {tab === "All" ? "All Orders" : tab}

                  {/* Active indicator */}

                  {isActive && (
                    <span
                      className="
                        absolute
                        bottom-1
                        left-1/2
                        h-0.5
                        w-5
                        -translate-x-1/2
                        rounded-full
                        bg-white/70
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border border-white/70
              bg-white/55
              px-6 py-20
              text-center
              shadow-[0_20px_60px_rgba(27,48,34,0.06)]
              backdrop-blur-xl
            "
          >
            {/* Background glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-56 w-56
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-app-green/10
                blur-3xl
              "
            />

            <div className="relative">
              <div
                className="
                  mx-auto mb-5
                  flex h-20 w-20
                  items-center justify-center
                  rounded-3xl
                  border border-white/70
                  bg-white/60
                  shadow-lg
                  backdrop-blur-md
                "
              >
                <Package
                  className="
                    size-9
                    text-app-green/70
                  "
                />
              </div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-app-green
                "
              >
                No orders yet
              </h2>

              <p
                className="
                  mx-auto
                  mb-6 mt-2
                  max-w-sm
                  text-sm
                  leading-6
                  text-app-text-light
                "
              >
                Looks like you haven't placed an order yet. Start shopping and
                your orders will appear here.
              </p>

              <Link
                to="/products"
                className="
                  group
                  relative
                  mx-auto
                  flex
                  w-fit
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-xl
                  bg-linear-to-r
                  from-app-green
                  via-emerald-600
                  to-app-green
                  px-5 py-2.5
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-green-900/15
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  active:scale-[0.98]
                "
              >
                {/* Gloss */}
                <span
                  className="
                    absolute
                    inset-y-0
                    -left-full
                    w-1/3
                    skew-x-[-20deg]
                    bg-white/20
                    transition-all
                    duration-700
                    group-hover:left-[120%]
                  "
                />

                <span className="relative">Start Shopping</span>

                <ArrowRightIcon
                  className="
                    relative
                    size-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        ) : (
          //  ORDERS LIST
          <div className="space-y-4">
            {orders.map((order, index) => {
              const statusClass =
                statusColors[order.status] || "bg-gray-100 text-gray-700";

              return (
                <Link
                  to={`/orders/${order._id}`}
                  key={order._id}
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                  className="
                    group
                    relative
                    block
                    max-w-5xl
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/70
                    bg-white/55
                    p-5
                    shadow-[0_10px_35px_rgba(27,48,34,0.05)]
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-white
                    hover:bg-white/70
                    hover:shadow-[0_20px_55px_rgba(27,48,34,0.10)]
                    animate-[fadeIn_0.5s_ease-out_both]
                    sm:p-6
                  "
                >
                  {/* CARD GLOW */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-40 w-40
                      rounded-full
                      bg-app-green/5
                      blur-3xl
                      transition-all
                      duration-500
                      group-hover:bg-app-green/10
                    "
                  />

                  {/* TOP — ORDER ID / DATE / STATUS */}
                  <div
                    className="
                      relative
                      mb-5
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    {/* Left */}

                    <div className="flex items-center gap-3">
                      {/* Order icon */}
                      <div
                        className="
                          flex
                          h-11 w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border border-app-green/10
                          bg-app-green/5
                          text-app-green
                          transition-all
                          duration-300
                          group-hover:scale-105
                          group-hover:bg-app-green/10
                        "
                      >
                        <Package className="size-5" />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-bold
                            text-app-green
                          "
                        >
                          Order #{order._id.slice(-8).toUpperCase()}
                        </p>

                        <div
                          className="
                            mt-1
                            flex
                            items-center
                            gap-1.5
                          "
                        >
                          <Calendar1Icon
                            className="
                              size-3.5
                              text-app-text-light
                            "
                          />

                          <p
                            className="
                              text-xs
                              text-app-text-light
                            "
                          >
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

                    {/* Right — status */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          flex
                          items-center
                          gap-1
                          rounded-full
                          border
                          border-white/60
                          px-3.5 py-1.5
                          text-xs
                          font-semibold
                          shadow-sm
                          backdrop-blur-md
                          transition-all
                          duration-300
                          group-hover:shadow-md
                          ${statusClass}
                        `}
                      >
                        {order.status}

                        <ChevronRightIcon
                          className="
                            size-3.5
                            opacity-60
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                          "
                        />
                      </span>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div
                    className="
                      mb-5
                      h-px
                      bg-linear-to-r
                      from-transparent
                      via-app-border/60
                      to-transparent
                    "
                  />

                  <div
                    className="
                      relative
                      flex
                      items-center
                      gap-3
                    "
                  >
                    {order.items.slice(0, 4).map((item, i) => (
                      <div
                        key={i}
                        className="
                            group/image
                            relative
                            shrink-0
                          "
                      >
                        <div
                          className="
                              flex
                              size-14
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-2xl
                              border
                              border-white/80
                              bg-white/60
                              p-1
                              shadow-sm
                              backdrop-blur-md
                              transition-all
                              duration-300
                              group-hover/image:-translate-y-1
                              group-hover/image:shadow-md
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
                                transition-transform
                                duration-500
                                group-hover/image:scale-105
                              "
                          />
                        </div>
                      </div>
                    ))}

                    {order.items.length > 4 && (
                      <div
                        className="
                          flex
                          size-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-dashed
                          border-app-green/20
                          bg-app-green/5
                          text-xs
                          font-bold
                          text-app-green
                          transition-all
                          duration-300
                          hover:bg-app-green/10
                          sm:size-16
                        "
                      >
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>

                  {/* BOTTOM — ITEMS / PRICE / ARROW */}
                  <div
                    className="
                      relative
                      mt-5
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-t
                      border-app-border/40
                      pt-4
                    "
                  >
                    {/* Items */}
                    <div className="flex items-center gap-2">
                      <div
                        className="
                          flex
                          h-7 w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-app-green/5
                        "
                      >
                        <ShoppingBag
                          className="
                            size-3.5
                            text-app-green
                          "
                        />
                      </div>

                      <span
                        className="
                          text-xs
                          font-medium
                          text-app-text-light
                        "
                      >
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>

                    {/* Price + Arrow */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p
                          className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-wider
                            text-app-text-light
                          "
                        >
                          Total
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-base
                            font-bold
                            text-app-green
                          "
                        >
                          {currency}
                          {order.total.toFixed(2)}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div
                        className="
                          flex
                          h-9 w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-app-green/10
                          bg-white/60
                          text-app-green
                          shadow-sm
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:bg-app-green
                          group-hover:text-white
                          group-hover:shadow-md
                        "
                      >
                        <ArrowRightIcon className="size-4" />
                      </div>
                    </div>
                  </div>

                  {/* HOVER GLOSS */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-full
                      w-1/4
                      skew-x-[-20deg]
                      bg-white/10
                      transition-all
                      duration-1000
                      group-hover:left-[120%]
                    "
                  />
                </Link>
              );
            })}
          </div>
        )}

        {/* BOTTOM DECORATION */}
        {!loading && orders.length > 0 && (
          <div
            className="
              mt-10
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-app-text-light
            "
          >
            <Sparkles className="size-3.5 text-app-orange" />
            <span>Your orders are safely stored in your account</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
