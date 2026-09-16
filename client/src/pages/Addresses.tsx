import { useEffect, useState, type SubmitEvent } from "react";
import type { Address } from "../types";
import { dummyAddressData } from "../assets/assets";
import { MapPinIcon, PlusIcon, SparklesIcon } from "lucide-react";
import Loading from "../components/Loading";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onEditHandler = (add: Address) => {
    setForm({
      label: add.label,
      address: add.address,
      city: add.city,
      state: add.state,
      zip: add.zip,
      isDefault: add.isDefault,
    });

    setEditingId(add._id);
    setShowForm(true);
  };

  useEffect(() => {
    setAddresses(dummyAddressData);

    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-emerald-950 via-app-green to-emerald-800">
      {/* =========================================================
          BACKGROUND AMBIENT GLOWS
      ========================================================= */}

      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-1/4 size-125 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-1/3 size-125 rounded-full bg-teal-300/10 blur-3xl" />

      {/* Decorative grid */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* =======================================================
            PAGE HEADER
        ======================================================= */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          {/* Heading */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-100 backdrop-blur-md">
              <SparklesIcon className="size-3.5" />
              Your saved locations
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              My Addresses
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-emerald-100/70">
              Manage your saved delivery addresses and choose where you want
              your orders delivered.
            </p>
          </div>

          {/* Add Address Button */}
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="
              group relative inline-flex w-fit items-center gap-2
              overflow-hidden rounded-xl
              border border-white/20
              bg-white/95
              px-5 py-3
              text-sm font-bold
              text-app-green
              shadow-lg shadow-black/10
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-xl hover:shadow-black/20
              active:translate-y-0
            "
          >
            {/* Button shine */}
            <span
              className="
                absolute inset-y-0 -left-full w-1/2
                skew-x-[-20deg]
                bg-linear-to-r from-transparent via-white/70 to-transparent
                transition-all duration-700
                group-hover:left-[130%]
              "
            />

            <PlusIcon className="relative size-4 transition-transform duration-300 group-hover:rotate-90" />

            <span className="relative">Add Address</span>
          </button>
        </div>

        {/* =======================================================
            ADDRESS SUMMARY
        ======================================================= */}

        {!loading && addresses.length > 0 && (
          <div
            className="
              mb-6 flex w-fit items-center gap-3
              rounded-2xl
              border border-white/15
              bg-white/10
              px-4 py-3
              text-white
              shadow-sm
              backdrop-blur-xl
            "
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/10">
              <MapPinIcon className="size-4 text-emerald-200" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                {addresses.length}{" "}
                {addresses.length === 1 ? "address" : "addresses"} saved
              </p>

              <p className="text-xs text-emerald-100/60">
                Ready for your next delivery
              </p>
            </div>
          </div>
        )}

        {/* =======================================================
            FORM MODAL
        ======================================================= */}

        {showForm && (
          <AddressForm
            resetForm={resetForm}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            editingId={editingId}
          />
        )}

        {/* =======================================================
            ADDRESSES
        ======================================================= */}

        {loading ? (
          <div className="flex min-h-80 items-center justify-center">
            <Loading />
          </div>
        ) : addresses.length === 0 ? (
          <div
            className="
              relative overflow-hidden
              rounded-3xl
              border border-white/15
              bg-white/10
              px-6 py-20
              text-center
              shadow-2xl shadow-black/10
              backdrop-blur-xl
            "
          >
            {/* Empty state glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative">
              <div
                className="
                  mx-auto mb-5 flex size-20 items-center justify-center
                  rounded-3xl
                  border border-white/15
                  bg-white/10
                  shadow-lg
                  backdrop-blur-md
                "
              >
                <MapPinIcon className="size-9 text-emerald-200" />
              </div>

              <h2 className="mb-2 text-2xl font-bold text-white">
                No Addresses Saved
              </h2>

              <p className="text-sm text-emerald-100/65">
                Add an address to get started with your deliveries.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((add, index) => (
              <div
                key={add._id}
                className="animate-[fadeIn_0.5s_ease-out_both]"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <AddressCard
                  addr={add}
                  onEditHandler={onEditHandler}
                  setAddresses={setAddresses}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
