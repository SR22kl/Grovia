import { useState, useEffect } from "react";
import { TruckIcon, ShoppingBagIcon, XIcon, UserRoundIcon } from "lucide-react";
import toast from "react-hot-toast";
import type { DeliveryPartner } from "../../types";
import Loading from "../../components/Loading";
import {
  dummyDashboardOrdersData,
  dummyDeliveryPartnerData,
} from "../../assets/assets";

export default function AdminOrders() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [orders, setOrders] = useState<any[]>([]);
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState("");

  const fetchOrders = async () => {
    setOrders(dummyDashboardOrdersData);
    setTimeout(() => setLoading(false), 1000);
  };

  const fetchPartners = async () => {
    setPartners(dummyDeliveryPartnerData as any);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchOrders();
    fetchPartners();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    console.log(id, newStatus);
  };

  const handleAssign = async () => {
    if (!assignModal || !selectedPartner) return;

    toast.success("Delivery partner assigned!");

    setAssignModal(null);
    setSelectedPartner("");
  };

  const statusOptions = [
    "Placed",
    "Confirmed",
    "Assigned",
    "Packed",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const statusColors: Record<string, string> = {
    Placed: "border-blue-400/20 bg-blue-400/[0.07] text-blue-300",
    Confirmed: "border-amber-400/20 bg-amber-400/[0.07] text-amber-300",
    Assigned: "border-indigo-400/20 bg-indigo-400/[0.07] text-indigo-300",
    Packed: "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300",
    "Out for Delivery":
      "border-purple-400/20 bg-purple-400/[0.07] text-purple-300",
    Delivered: "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300",
    Cancelled: "border-red-400/20 bg-red-400/[0.07] text-red-300",
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/50">
          Fulfillment
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Orders
        </h1>

        <p className="mt-1 text-sm text-white/40">
          Manage orders, delivery partners and order status.
        </p>
      </div>

      {/* =========================================================
          ORDERS TABLE
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
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-64 rounded-full bg-emerald-400/[0.05] blur-[100px]" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className="
                flex size-10 shrink-0 items-center justify-center
                rounded-xl
                border border-emerald-400/15
                bg-emerald-400/[0.06]
                text-emerald-300
              "
            >
              <ShoppingBagIcon className="size-5" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">All Orders</h2>

              <p className="text-xs text-white/35">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative z-10 overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.015] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Delivery Partner</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-white/35"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="
                      group/row
                      transition-colors duration-200
                      hover:bg-white/[0.025]
                    "
                  >
                    {/* Order */}
                    <td className="px-6 py-4">
                      <p className="font-mono text-xs font-semibold text-emerald-200/70">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-white/85">
                        {order.user?.name || "Unknown User"}
                      </p>

                      <p className="mt-0.5 text-xs text-white/35">
                        {order.user?.email || "No email"}
                      </p>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-white/80">
                        {currency}
                        {order.total.toFixed(2)}
                      </span>
                    </td>

                    {/* Delivery Partner */}
                    <td className="px-6 py-4">
                      {order.deliveryPartner ? (
                        <div className="flex items-center gap-2.5">
                          <div
                            className="
                              flex size-8 shrink-0 items-center justify-center
                              rounded-full
                              border border-emerald-400/20
                              bg-emerald-400/10
                              text-emerald-300
                            "
                          >
                            <span className="text-xs font-semibold">
                              {order.deliveryPartner.name?.charAt(0)}
                            </span>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-white/75">
                              {order.deliveryPartner.name}
                            </p>

                            <p className="text-[10px] text-white/30">
                              {order.deliveryPartner.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setAssignModal(order._id);
                            setSelectedPartner("");
                          }}
                          className="
                            flex items-center gap-1.5
                            rounded-xl
                            border border-indigo-400/15
                            bg-indigo-400/[0.06]
                            px-3 py-2
                            text-xs font-medium
                            text-indigo-300
                            transition-all duration-300
                            hover:border-indigo-400/25
                            hover:bg-indigo-400/[0.10]
                          "
                        >
                          <TruckIcon className="size-3.5" />
                          Assign
                        </button>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`
                          cursor-pointer
                          rounded-xl
                          border
                          px-3 py-2
                          text-xs
                          font-semibold
                          outline-none
                          transition-all duration-300
                          focus:ring-2
                          focus:ring-white/[0.08]
                          ${statusColors[order.status] || "border-white/10 bg-white/[0.05] text-white/60"}
                        `}
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-[#061f17] text-white"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================
          ASSIGN DELIVERY PARTNER MODAL
      ========================================================= */}
      {assignModal && (
        <>
          {/* Overlay */}
          <div
            className="
              fixed inset-0 z-50
              bg-[#031c14]/75
              backdrop-blur-md
            "
            onClick={() => setAssignModal(null)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="
                relative isolate
                w-full max-w-md
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-[#061f17]/95
                p-5
                shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                backdrop-blur-2xl
                animate-[adminModalEnter_.3s_cubic-bezier(.16,1,.3,1)]
              "
            >
              {/* Modal Glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-emerald-400/[0.08] blur-3xl" />

              {/* Header */}
              <div className="relative z-10 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex size-10 items-center justify-center
                      rounded-xl
                      border border-emerald-400/15
                      bg-emerald-400/[0.06]
                      text-emerald-300
                    "
                  >
                    <TruckIcon className="size-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Assign Delivery Partner
                    </h3>

                    <p className="text-xs text-white/30">
                      Choose a partner for this order
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAssignModal(null)}
                  className="
                    flex size-9 items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/[0.035]
                    text-white/40
                    transition-all duration-300
                    hover:border-white/15
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
                >
                  <XIcon className="size-4" />
                </button>
              </div>

              {/* Partners */}
              {partners.length === 0 ? (
                <div
                  className="
                    relative z-10
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.025]
                    p-5
                    text-center
                  "
                >
                  <TruckIcon className="mx-auto mb-3 size-8 text-white/20" />

                  <p className="text-sm text-white/45">
                    No active delivery partners.
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Please onboard a partner first.
                  </p>
                </div>
              ) : (
                <div className="relative z-10 mb-5 max-h-72 space-y-2 overflow-y-auto no-scrollbar">
                  {partners.map((partner) => (
                    <label
                      key={partner._id}
                      className={`
                        flex cursor-pointer items-center gap-3
                        rounded-2xl
                        border
                        p-3
                        transition-all duration-300
                        ${
                          selectedPartner === partner._id
                            ? "border-emerald-400/25 bg-emerald-400/[0.08]"
                            : "border-white/10 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.045]"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="partner"
                        value={partner._id}
                        checked={selectedPartner === partner._id}
                        onChange={() => setSelectedPartner(partner._id)}
                        className="accent-emerald-400"
                      />

                      <div
                        className="
                          flex size-9 shrink-0 items-center justify-center
                          rounded-xl
                          border border-emerald-400/15
                          bg-emerald-400/[0.06]
                          text-emerald-300
                        "
                      >
                        <UserRoundIcon className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white/80">
                          {partner.name}
                        </p>

                        <p className="truncate text-xs text-white/30 capitalize">
                          {partner.vehicleType} • {partner.phone}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="relative z-10 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAssignModal(null)}
                  className="
                    flex-1
                    rounded-xl
                    border border-white/10
                    bg-white/[0.035]
                    py-2.5
                    text-sm font-medium
                    text-white/50
                    transition-all duration-300
                    hover:border-white/15
                    hover:bg-white/[0.06]
                    hover:text-white/80
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleAssign}
                  disabled={!selectedPartner}
                  className="
                    flex-1
                    rounded-xl
                    border border-emerald-400/20
                    bg-emerald-400/10
                    py-2.5
                    text-sm font-medium
                    text-emerald-200
                    transition-all duration-300
                    hover:border-emerald-400/30
                    hover:bg-emerald-400/[0.14]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Assign Partner
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes adminModalEnter {
          from {
            opacity: 0;
            transform: translateY(10px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
