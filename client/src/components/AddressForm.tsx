import { CheckIcon, HomeIcon, MapPinIcon, XIcon } from "lucide-react";

const AddressForm = ({
  resetForm,
  handleSubmit,
  form,
  setForm,
  editingId,
}: any) => {
  return (
    <>
      {/* =========================================================
          BACKDROP
      ========================================================= */}

      <div
        className="
          fixed inset-0 z-50
          bg-emerald-950/60
          backdrop-blur-md
          animate-[fadeIn_0.2s_ease-out]
        "
      />

      {/* =========================================================
          MODAL WRAPPER
      ========================================================= */}

      <div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          overflow-y-auto
          p-4 sm:p-6
        "
        onClick={resetForm}
      >
        {/* =======================================================
            MODAL
        ======================================================= */}

        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
          className="
            group relative
            w-full max-w-lg
            overflow-hidden
            rounded-3xl
            border border-white/15
            bg-linear-to-br
            from-emerald-950/95
            via-app-green/95
            to-emerald-900/95
            p-5 sm:p-7
            shadow-2xl shadow-black/30
            backdrop-blur-2xl
            animate-[fadeIn_0.3s_ease-out]
          "
        >
          {/* =====================================================
              AMBIENT GLOWS
          ===================================================== */}

          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              size-56
              rounded-full
              bg-emerald-300/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-24 -left-20
              size-56
              rounded-full
              bg-teal-300/10
              blur-3xl
            "
          />

          {/* =====================================================
              GLASS SHINE
          ===================================================== */}

          <div
            className="
              pointer-events-none absolute inset-0
              bg-linear-to-br
              from-white/5
              via-transparent
              to-transparent
            "
          />

          <div className="relative z-10">
            {/* ===================================================
                HEADER
            =================================================== */}

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Header Icon */}
                <div
                  className="
                    flex size-11 items-center justify-center
                    rounded-2xl
                    border border-white/15
                    bg-white/10
                    shadow-lg
                    backdrop-blur-md
                  "
                >
                  {editingId ? (
                    <MapPinIcon
                      className="size-5 text-emerald-200"
                      strokeWidth={2.2}
                    />
                  ) : (
                    <HomeIcon
                      className="size-5 text-emerald-200"
                      strokeWidth={2.2}
                    />
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white sm:text-xl">
                    {editingId ? "Edit Address" : "Add New Address"}
                  </h2>

                  <p className="mt-0.5 text-xs text-emerald-100/55">
                    {editingId
                      ? "Update your delivery details"
                      : "Save a new delivery location"}
                  </p>
                </div>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={resetForm}
                aria-label="Close address form"
                className="
                  flex size-9 items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  text-emerald-100/60
                  transition-all duration-200
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                  hover:rotate-90
                "
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {/* ===================================================
                FORM FIELDS
            =================================================== */}

            <div className="space-y-4">
              {/* Label */}
              <div>
                <label
                  htmlFor="label"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-emerald-100/75"
                >
                  Label
                </label>

                <input
                  required
                  id="label"
                  type="text"
                  name="label"
                  placeholder="Home, Work, etc."
                  value={form.label}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      label: e.target.value,
                    })
                  }
                  className="
                    w-full rounded-xl
                    border border-white/10
                    bg-white/8
                    px-4 py-3
                    text-sm text-white
                    outline-none
                    placeholder:text-emerald-100/30
                    transition-all duration-200
                    focus:border-emerald-300/40
                    focus:bg-white/12
                    focus:ring-2
                    focus:ring-emerald-300/10
                  "
                />
              </div>

              {/* Street Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-emerald-100/75"
                >
                  Street Address
                </label>

                <div className="relative">
                  <MapPinIcon
                    className="
                      pointer-events-none
                      absolute left-3.5 top-1/2
                      size-4 -translate-y-1/2
                      text-emerald-200/50
                    "
                  />

                  <input
                    required
                    id="address"
                    type="text"
                    name="address"
                    placeholder="123 Main Street"
                    value={form.address}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        address: e.target.value,
                      })
                    }
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/8
                      py-3 pl-10 pr-4
                      text-sm text-white
                      outline-none
                      placeholder:text-emerald-100/30
                      transition-all duration-200
                      focus:border-emerald-300/40
                      focus:bg-white/12
                      focus:ring-2
                      focus:ring-emerald-300/10
                    "
                  />
                </div>
              </div>

              {/* City + State */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-emerald-100/75"
                  >
                    City
                  </label>

                  <input
                    required
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Pune"
                    value={form.city}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        city: e.target.value,
                      })
                    }
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/8
                      px-4 py-3
                      text-sm text-white
                      outline-none
                      placeholder:text-emerald-100/30
                      transition-all duration-200
                      focus:border-emerald-300/40
                      focus:bg-white/12
                      focus:ring-2
                      focus:ring-emerald-300/10
                    "
                  />
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-emerald-100/75"
                  >
                    State
                  </label>

                  <input
                    required
                    id="state"
                    type="text"
                    name="state"
                    placeholder="Maharashtra"
                    value={form.state}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        state: e.target.value,
                      })
                    }
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/8
                      px-4 py-3
                      text-sm text-white
                      outline-none
                      placeholder:text-emerald-100/30
                      transition-all duration-200
                      focus:border-emerald-300/40
                      focus:bg-white/12
                      focus:ring-2
                      focus:ring-emerald-300/10
                    "
                  />
                </div>
              </div>

              {/* Zip + Default */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Zip */}
                <div>
                  <label
                    htmlFor="zip"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-emerald-100/75"
                  >
                    Zip Code
                  </label>

                  <input
                    required
                    id="zip"
                    type="text"
                    name="zip"
                    placeholder="411001"
                    value={form.zip}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        zip: e.target.value,
                      })
                    }
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/8
                      px-4 py-3
                      text-sm text-white
                      outline-none
                      placeholder:text-emerald-100/30
                      transition-all duration-200
                      focus:border-emerald-300/40
                      focus:bg-white/12
                      focus:ring-2
                      focus:ring-emerald-300/10
                    "
                  />
                </div>

                {/* Default Checkbox */}
                <div className="flex items-end">
                  <label
                    htmlFor="isDefault"
                    className="
                      flex w-full cursor-pointer
                      items-center gap-3
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      px-4 py-3
                      transition-all duration-200
                      hover:border-white/20
                      hover:bg-white/10
                    "
                  >
                    <div className="relative">
                      <input
                        id="isDefault"
                        type="checkbox"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            isDefault: e.target.checked,
                          })
                        }
                        className="
                          peer
                          size-4
                          cursor-pointer
                          appearance-none
                          rounded-md
                          border border-white/25
                          bg-white/10
                          transition-all
                          checked:border-emerald-300
                          checked:bg-emerald-400
                        "
                      />

                      <CheckIcon
                        className="
                          pointer-events-none
                          absolute left-1/2 top-1/2
                          size-3
                          -translate-x-1/2
                          -translate-y-1/2
                          scale-0
                          text-emerald-950
                          transition-transform
                          peer-checked:scale-100
                        "
                        strokeWidth={3}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white/90">
                        Set as Default
                      </p>

                      <p className="text-[10px] text-emerald-100/45">
                        Use for future orders
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* ===================================================
                SUBMIT BUTTON
            =================================================== */}

            <button
              type="submit"
              className="
                group/button relative mt-6
                flex w-full
                items-center justify-center gap-2
                overflow-hidden
                rounded-xl
                border border-emerald-300/20
                bg-linear-to-r
                from-emerald-400
                via-emerald-500
                to-app-green
                py-3.5
                text-sm font-bold
                text-white
                shadow-lg shadow-emerald-950/30
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-emerald-950/40
                active:translate-y-0
              "
            >
              {/* Button shine */}
              <span
                className="
                  absolute inset-y-0 -left-full
                  w-1/2
                  skew-x-[-20deg]
                  bg-linear-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                  transition-all duration-700
                  group-hover/button:left-[130%]
                "
              />

              <span className="relative">
                {editingId ? "Save Changes" : "Add Address"}
              </span>

              <MapPinIcon
                className="
                  relative size-4
                  transition-transform duration-300
                  group-hover/button:-translate-y-0.5
                "
              />
            </button>

            {/* Footer hint */}
            <p className="mt-4 text-center text-[11px] text-emerald-100/35">
              Your address will be used for delivery purposes.
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
