import {
  ArrowRight,
  Check,
  MapPinned,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutAddress = ({
  user,
  address,
  setAddress,
  setStep,
}: any) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-7">
      {/* Header */}
      <div className="mb-7 flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
          <MapPinned className="size-5 text-emerald-300" />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Step 01
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Delivery Address
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Where should we deliver your order?
          </p>
        </div>
      </div>

      {/* Saved Addresses */}
      {user?.addresses && user.addresses.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Saved Addresses
            </h3>

            <span className="text-[11px] text-white/25">
              {user.addresses.length} saved
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {user.addresses.map((addr: any) => {
              const selected =
                address.label === addr.label &&
                address.address === addr.address;

              return (
                <button
                  type="button"
                  key={addr._id || addr.label}
                  onClick={() =>
                    setAddress({
                      _id: addr._id,
                      label: addr.label,
                      address: addr.address,
                      city: addr.city,
                      state: addr.state,
                      zip: addr.zip,
                      lat: addr.lat,
                      lng: addr.lng,
                      isDefault: addr.isDefault,
                    })
                  }
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    selected
                      ? "border-emerald-400/50 bg-emerald-400/10 shadow-lg shadow-emerald-950/20"
                      : "border-white/10 bg-white/[0.035] hover:-translate-y-0.5 hover:border-emerald-400/25 hover:bg-white/6"
                  }`}
                >
                  {/* selected glow */}
                  {selected && (
                    <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-emerald-400/15 blur-2xl" />
                  )}

                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex size-8 items-center justify-center rounded-lg transition-colors ${
                          selected
                            ? "bg-emerald-400 text-[#031c14]"
                            : "bg-white/6 text-white/40 group-hover:text-emerald-300"
                        }`}
                      >
                        <MapPinned className="size-4" />
                      </div>

                      <span className="text-sm font-semibold text-white">
                        {addr.label}
                      </span>
                    </div>

                    {selected && (
                      <div className="flex size-5 items-center justify-center rounded-full bg-emerald-400 text-[#031c14]">
                        <Check className="size-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="relative mt-4 pl-10">
                    <p className="truncate text-sm text-white/65">
                      {addr.address}
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                  </div>

                  {addr.isDefault && (
                    <span className="relative mt-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                      Default
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add address */}
      <Link
        to="/addresses"
        className="group mt-5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/2.5 px-5 py-3.5 text-sm font-medium text-white/55 transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-emerald-300"
      >
        <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
        Add New Address
      </Link>

      {/* Continue */}
      <button
        onClick={() => {
          setStep("payment");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={!address.address || !address.city}
        className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-[#031c14] shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
      >
        Continue to Payment

        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default CheckoutAddress;