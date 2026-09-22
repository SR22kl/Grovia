import { useEffect, useState } from "react";
import {
  PlusIcon,
  XIcon,
  TruckIcon,
  PhoneIcon,
  MailIcon,
  UserRoundIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { DeliveryPartner } from "../../types";
import Loading from "../../components/Loading";
import { dummyDeliveryPartnerData } from "../../assets/assets";

export default function AdminDeliveryPartners() {
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleType: "bike",
  });

  const fetchPartners = async () => {
    setPartners(dummyDeliveryPartnerData as any);

    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    console.log(id, isActive);
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/50">
            Logistics
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Delivery Partners
          </h1>

          <p className="mt-1 text-sm text-white/40">
            Manage your delivery team and partner availability.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="
            group relative isolate flex w-fit items-center gap-2
            overflow-hidden
            rounded-xl
            border border-emerald-400/20
            bg-emerald-400/10
            px-4 py-2.5
            text-sm font-medium
            text-emerald-200
            shadow-[0_10px_35px_rgba(16,185,129,0.08)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-emerald-300/30
            hover:bg-emerald-400/[0.14]
          "
        >
          <PlusIcon className="relative z-10 size-4" />

          <span className="relative z-10">Add Partner</span>

          <span
            className="
              pointer-events-none absolute inset-y-0 left-[-120%]
              w-[65%] skew-x-[-18deg]
              bg-linear-to-r
              from-transparent
              via-white/[0.08]
              to-transparent
              opacity-0
              transition-[left,opacity]
              duration-700
              group-hover:left-[150%]
              group-hover:opacity-100
            "
          />
        </button>
      </div>

      {/* =========================================================
          PARTNER GRID
      ========================================================= */}
      {partners.length === 0 ? (
        <section
          className="
            relative isolate overflow-hidden
            rounded-3xl
            border border-white/10
            bg-white/[0.035]
            px-6 py-16
            text-center
            shadow-[0_25px_80px_rgba(0,0,0,0.18)]
            backdrop-blur-2xl
          "
        >
          <div
            className="
              mx-auto mb-4
              flex size-14 items-center justify-center
              rounded-2xl
              border border-white/10
              bg-white/[0.035]
              text-white/20
            "
          >
            <TruckIcon className="size-7" />
          </div>

          <p className="text-lg font-semibold text-white">
            No delivery partners
          </p>

          <p className="mt-1 text-sm text-white/35">
            Onboard your first partner to get started.
          </p>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {partners.map((partner, index) => (
            <section
              key={partner._id}
              className="
                group relative isolate overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.035]
                p-5
                shadow-[0_20px_60px_rgba(0,0,0,0.16)]
                backdrop-blur-2xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-white/15
                hover:bg-white/[0.05]
              "
              style={{
                animation: `partnerCardEnter .5s cubic-bezier(.16,1,.3,1) ${
                  index * 70
                }ms both`,
              }}
            >
              {/* Ambient Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-emerald-400/[0.07] blur-3xl" />

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

              <div className="relative z-10 space-y-4">
                {/* Partner Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex size-11 shrink-0 items-center justify-center
                        rounded-2xl
                        border border-emerald-400/20
                        bg-emerald-400/10
                        text-emerald-300
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    >
                      <span className="text-sm font-semibold">
                        {partner.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white/85">
                        {partner.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-white/30">
                        <TruckIcon className="size-3" />

                        <span className="capitalize">
                          {partner.vehicleType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`
                      shrink-0
                      rounded-full
                      border
                      px-2.5 py-1
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wide
                      ${
                        partner.isActive
                          ? "border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-300"
                          : "border-red-400/15 bg-red-400/[0.07] text-red-300"
                      }
                    `}
                  >
                    {partner.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.07]" />

                {/* Contact Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-white/45">
                    <MailIcon className="size-3.5 shrink-0 text-white/25" />

                    <span className="truncate">{partner.email}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-white/45">
                    <PhoneIcon className="size-3.5 shrink-0 text-white/25" />

                    <span>{partner.phone}</span>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => toggleActive(partner._id, partner.isActive)}
                  className={`
                    w-full
                    rounded-xl
                    border
                    py-2.5
                    text-xs
                    font-medium
                    transition-all duration-300
                    ${
                      partner.isActive
                        ? `
                          border-red-400/15
                          bg-red-400/[0.05]
                          text-red-300/80
                          hover:border-red-400/25
                          hover:bg-red-400/[0.09]
                          hover:text-red-300
                        `
                        : `
                          border-emerald-400/15
                          bg-emerald-400/[0.05]
                          text-emerald-300/80
                          hover:border-emerald-400/25
                          hover:bg-emerald-400/[0.09]
                          hover:text-emerald-300
                        `
                    }
                  `}
                >
                  {partner.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* =========================================================
          ADD PARTNER MODAL
      ========================================================= */}
      {showForm && (
        <>
          {/* Overlay */}
          <div
            className="
              fixed inset-0 z-50
              bg-[#031c14]/75
              backdrop-blur-md
            "
            onClick={() => setShowForm(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
            <form
              onSubmit={handleSubmit}
              className="
                relative isolate
                my-auto
                w-full max-w-lg
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-[#061f17]/95
                p-5
                shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                backdrop-blur-2xl
                animate-[adminModalEnter_.3s_cubic-bezier(.16,1,.3,1)]
                sm:p-6
              "
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-emerald-400/[0.08] blur-3xl" />

              {/* Header */}
              <div className="relative z-10 mb-6 flex items-center justify-between">
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
                    <UserRoundIcon className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Onboard Delivery Partner
                    </h2>

                    <p className="text-xs text-white/30">
                      Add a new member to your delivery team.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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

              {/* Form */}
              <div className="relative z-10 space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter full name"
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-black/10
                      px-4 py-3
                      text-sm text-white
                      outline-none
                      placeholder:text-white/20
                      transition-all duration-300
                      focus:border-emerald-400/30
                      focus:bg-white/[0.04]
                      focus:ring-2
                      focus:ring-emerald-400/[0.08]
                    "
                  />
                </div>

                {/* Email + Password */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/60">
                      Email
                    </label>

                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      placeholder="partner@example.com"
                      className="
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-black/10
                        px-4 py-3
                        text-sm text-white
                        outline-none
                        placeholder:text-white/20
                        transition-all duration-300
                        focus:border-emerald-400/30
                        focus:bg-white/[0.04]
                        focus:ring-2
                        focus:ring-emerald-400/[0.08]
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/60">
                      Password
                    </label>

                    <input
                      type="password"
                      required
                      minLength={6}
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      placeholder="Minimum 6 characters"
                      className="
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-black/10
                        px-4 py-3
                        text-sm text-white
                        outline-none
                        placeholder:text-white/20
                        transition-all duration-300
                        focus:border-emerald-400/30
                        focus:bg-white/[0.04]
                        focus:ring-2
                        focus:ring-emerald-400/[0.08]
                      "
                    />
                  </div>
                </div>

                {/* Phone + Vehicle */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/60">
                      Phone
                    </label>

                    <input
                      type="text"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Phone number"
                      className="
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-black/10
                        px-4 py-3
                        text-sm text-white
                        outline-none
                        placeholder:text-white/20
                        transition-all duration-300
                        focus:border-emerald-400/30
                        focus:bg-white/[0.04]
                        focus:ring-2
                        focus:ring-emerald-400/[0.08]
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/60">
                      Vehicle Type
                    </label>

                    <select
                      value={form.vehicleType}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          vehicleType: e.target.value,
                        })
                      }
                      className="
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-[#061f17]
                        px-4 py-3
                        text-sm text-white
                        outline-none
                        transition-all duration-300
                        focus:border-emerald-400/30
                        focus:ring-2
                        focus:ring-emerald-400/[0.08]
                      "
                    >
                      <option value="bike" className="bg-[#061f17]">
                        Bike
                      </option>

                      <option value="scooter" className="bg-[#061f17]">
                        Scooter
                      </option>

                      <option value="car" className="bg-[#061f17]">
                        Car
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="
                  group/save
                  relative isolate
                  mt-6
                  flex w-full
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  border border-emerald-400/20
                  bg-emerald-400/10
                  py-3
                  text-sm font-semibold
                  text-emerald-200
                  transition-all duration-300
                  hover:border-emerald-300/30
                  hover:bg-emerald-400/[0.14]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <span className="relative z-10">
                  {saving ? "Creating..." : "Create Partner"}
                </span>

                <span
                  className="
                    pointer-events-none
                    absolute inset-y-0 left-[-120%]
                    z-0 w-[65%]
                    skew-x-[-18deg]
                    bg-linear-to-r
                    from-transparent
                    via-white/[0.08]
                    to-transparent
                    opacity-0
                    transition-[left,opacity]
                    duration-700
                    group-hover/save:left-[150%]
                    group-hover/save:opacity-100
                  "
                />
              </button>
            </form>
          </div>
        </>
      )}

      <style>{`
        @keyframes partnerCardEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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
