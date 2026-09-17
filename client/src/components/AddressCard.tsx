import { CheckIcon, MapPinIcon, PencilIcon, Trash2Icon } from "lucide-react";
import type { Address } from "../types";

interface AddressCardProp {
  addr: Address;
  onEditHandler: (add: Address) => void;
  setAddresses: (addresses: Address[]) => void;
}

const AddressCard = ({
  addr,
  onEditHandler,
  setAddresses,
}: AddressCardProp) => {
  const handleDelete = async (id: string) => {
    console.log(id);
  };

  return (
    <div
      className="
        group relative isolate h-full overflow-hidden
        rounded-3xl

        border border-white/15
        bg-white/10

        p-5 sm:p-6

        backdrop-blur-xl

        shadow-[0_8px_25px_rgba(0,0,0,0.08)]

        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-1
        hover:border-emerald-300/35
        hover:bg-white/13
        hover:shadow-[inset_0_0_35px_rgba(52,211,153,0.10),0_8px_25px_rgba(0,0,0,0.08)]
      "
    >
      <div
        className="
          pointer-events-none absolute inset-0
          rounded-3xl

          bg-[radial-gradient(circle_at_85%_15%,rgba(52,211,153,0.16),transparent_42%)]

          opacity-0
          transition-opacity
          duration-500
          ease-out

          group-hover:opacity-100
        "
      />

      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0
          h-24

          bg-linear-to-t
          from-emerald-400/8
          to-transparent

          opacity-0
          transition-opacity
          duration-500
          ease-out

          group-hover:opacity-100
        "
      />

      {/* =========================================================
          GLASS SHINE
      ========================================================= */}

      <div
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
          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:left-[150%]
          group-hover:opacity-100
        "
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Icon */}
            <div
              className="
               flex size-12 shrink-0 items-center justify-center 
               rounded-2xl 
               border border-white/20 
               bg-linear-to-br from-emerald-400 via-emerald-500 to-app-green
               text-white shadow-lg shadow-emerald-950/20 
               transition-all duration-300 group-hover:scale-105 
               group-hover:shadow-emerald-400/20
              "
            >
              <MapPinIcon className="size-5" strokeWidth={2.3} />
            </div>

            {/* Label */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-bold text-white">
                  {addr.label}
                </h3>

                {addr.isDefault && (
                  <span
                    className="
                      inline-flex shrink-0
                      items-center gap-1

                      rounded-full

                      border border-orange-300/30
                      bg-orange-400/15

                      px-2.5 py-1

                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wide

                      text-orange-200
                    "
                  >
                    <CheckIcon className="size-3" strokeWidth={3} />
                    Default
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-emerald-100/50">
                Saved delivery address
              </p>
            </div>
          </div>

          {/* =====================================================
              ACTION BUTTONS
          ===================================================== */}

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => onEditHandler(addr)}
              aria-label={`Edit ${addr.label} address`}
              className="
                flex size-9
                items-center justify-center

                rounded-xl

                border border-white/10
                bg-white/5

                text-emerald-100/60

                transition-[background-color,border-color,color,transform]
                duration-300
                ease-out

                hover:border-emerald-300/20
                hover:bg-emerald-400/15
                hover:text-emerald-200
                hover:scale-105

                active:scale-95
              "
            >
              <PencilIcon className="size-4" />
            </button>

            <button
              onClick={() => handleDelete(addr._id)}
              aria-label={`Delete ${addr.label} address`}
              className="
                flex size-9
                items-center justify-center

                rounded-xl

                border border-white/10
                bg-white/5

                text-emerald-100/60

                transition-[background-color,border-color,color,transform]
                duration-300
                ease-out

                hover:border-red-300/20
                hover:bg-red-400/15
                hover:text-red-300
                hover:scale-105

                active:scale-95
              "
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>

        {/* =======================================================
            ADDRESS DETAILS
        ======================================================= */}

        <div
          className="
            relative

            mt-5

            rounded-2xl

            border border-white/10
            bg-black/5

            p-4

            transition-[background-color,border-color]
            duration-500
            ease-out

            group-hover:border-white/15
            group-hover:bg-black/10
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                mt-0.5

                flex size-8 shrink-0
                items-center justify-center

                rounded-lg

                bg-white/10

                transition-colors
                duration-300

                group-hover:bg-emerald-300/10
              "
            >
              <MapPinIcon className="size-4 text-emerald-200" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold leading-6 text-white/90">
                {addr.address}
              </p>

              <p className="mt-1 text-sm text-emerald-100/60">
                {addr.city}, {addr.state} - {addr.zip}
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM META
        ======================================================= */}

        <div className="mt-4 flex items-center gap-2">
          <span
            className="
              size-1.5
              rounded-full
              bg-emerald-300

              shadow-sm
              shadow-emerald-300/50

              transition-transform
              duration-300

              group-hover:scale-125
            "
          />

          <span className="text-[11px] font-medium text-emerald-100/45">
            Delivery location saved
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
