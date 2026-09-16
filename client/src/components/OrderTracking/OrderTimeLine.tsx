import { CheckIcon, ClockIcon, PackageIcon, TruckIcon } from "lucide-react";

export default function OrderTimeLine({ order }: { order: any }) {
  const allStatuses = [
    "Placed",
    "Confirmed",
    "Assigned",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];

  const currentIdx = allStatuses.indexOf(order.status);

  const statusIcons: any = {
    Placed: ClockIcon,
    Confirmed: CheckIcon,
    Assigned: TruckIcon,
    Packed: PackageIcon,
    "Out for Delivery": TruckIcon,
    Delivered: CheckIcon,
  };

  const statusHistory = order.statusHistory ?? [];

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-white/15
        bg-white/10
        p-5 sm:p-6
        shadow-lg shadow-black/10
        backdrop-blur-xl
        animate-[fadeIn_0.5s_ease-out_both]
      "
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-16 -top-16 size-40 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className="
              flex size-10 items-center justify-center
              rounded-xl
              border border-white/10
              bg-white/10
            "
          >
            <TruckIcon className="size-5 text-emerald-200" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Delivery Progress</h2>

            <p className="text-xs text-emerald-100/45">
              Follow your order journey
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          {allStatuses.map((status, i) => {
            const Icon = statusIcons[status] || PackageIcon;

            const isCompleted = i <= currentIdx;
            const isCurrent = i === currentIdx;

            const historyEntry = statusHistory.find(
              (h: any) => h.status === status,
            );

            return (
              <div
                key={status}
                className="flex gap-4"
                style={{
                  animationDelay: `${i * 70}ms`,
                }}
              >
                {/* Icon + Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      relative flex size-10 shrink-0 items-center justify-center
                      rounded-xl
                      border
                      transition-all duration-500
                      ${
                        isCompleted
                          ? "border-emerald-300/20 bg-emerald-400/20 text-emerald-200 shadow-lg shadow-emerald-950/10"
                          : "border-white/10 bg-white/5 text-emerald-100/30"
                      }
                      ${isCurrent ? "ring-4 ring-emerald-300/10" : ""}
                    `}
                  >
                    {/* Current pulse */}
                    {isCurrent && (
                      <span className="absolute inset-0 animate-ping rounded-xl bg-emerald-300/10" />
                    )}

                    <Icon className="relative size-4" />
                  </div>

                  {/* Connector */}
                  {i < allStatuses.length - 1 && (
                    <div className="relative h-14 w-px overflow-hidden bg-white/10">
                      <div
                        className={`
                          absolute left-0 top-0 w-full
                          transition-all duration-700
                          ${
                            i < currentIdx
                              ? "h-full bg-linear-to-b from-emerald-300 to-emerald-500"
                              : "h-0"
                          }
                        `}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 pt-1">
                  <p
                    className={`
                      text-sm font-bold transition-colors duration-300
                      ${isCompleted ? "text-white" : "text-emerald-100/35"}
                    `}
                  >
                    {status}
                  </p>

                  {historyEntry ? (
                    <p className="mt-1 text-xs text-emerald-100/45">
                      {new Date(historyEntry.timestamp).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-emerald-100/20">
                      Pending
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
