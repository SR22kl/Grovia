import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  PackageIcon,
  ImageIcon,
  SparklesIcon,
  SaveIcon,
} from "lucide-react";
import { categoriesData, dummyProducts } from "../../assets/assets";
import Loading from "../../components/Loading";

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    unit: "",
    stock: "",
    isOrganic: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        setFormData(() => dummyProducts.find((p) => p._id === id) as any);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/50">
          Inventory
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {isEdit ? "Edit Product" : "New Product"}
        </h1>

        <p className="mt-1 text-sm text-white/40">
          {isEdit
            ? "Update the information for this product."
            : "Add a new product to your store catalog."}
        </p>
      </div>

      {/* =========================================================
          FORM CARD
      ========================================================= */}
      <section
        className="
          relative isolate overflow-hidden
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
        <div className="relative z-10 flex items-center gap-3 border-b border-white/10 px-4 py-5 sm:px-6">
          <Link
            to="/admin/products"
            className="
              flex size-10 shrink-0 items-center justify-center
              rounded-xl
              border border-white/10
              bg-white/[0.035]
              text-white/45
              transition-all duration-300
              hover:border-emerald-400/20
              hover:bg-emerald-400/[0.08]
              hover:text-emerald-300
            "
          >
            <ArrowLeftIcon className="size-4" />
          </Link>

          <div
            className="
              hidden size-10 items-center justify-center
              rounded-xl
              border border-emerald-400/15
              bg-emerald-400/[0.06]
              text-emerald-300
              sm:flex
            "
          >
            <PackageIcon className="size-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Product Details
            </h2>

            <p className="text-xs text-white/35">
              {isEdit ? "Update existing product" : "Create new product"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="relative z-10 py-12">
            <Loading />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-8 p-4 sm:p-6 lg:p-8"
          >
            {/* =====================================================
                BASIC INFORMATION
            ===================================================== */}
            <div>
              <div className="mb-5">
                <p className="text-sm font-semibold text-white">
                  Basic Information
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Add the essential details for your product.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Product Name
                  </label>

                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter product name"
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

                {/* Category */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Category
                  </label>

                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
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
                    <option value="" className="bg-[#061f17]">
                      Select a category
                    </option>

                    {categoriesData.map((c) => (
                      <option
                        key={c.slug}
                        value={c.slug}
                        className="bg-[#061f17]"
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Unit */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Unit
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="e.g. kg, piece, liter"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unit: e.target.value,
                      })
                    }
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
            </div>

            {/* =====================================================
                PRICING & INVENTORY
            ===================================================== */}
            <div className="border-t border-white/[0.07] pt-8">
              <div className="mb-5">
                <p className="text-sm font-semibold text-white">
                  Pricing & Inventory
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Set the selling price and available stock.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {/* Price */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Price ($)
                  </label>

                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                    className="
                      [&::-webkit-inner-spin-button]:appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-black/10
                      px-4 py-3
                      text-sm text-white
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-400/30
                      focus:ring-2
                      focus:ring-emerald-400/[0.08]
                    "
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Original Price ($)
                    <span className="ml-1 text-white/25">Optional</span>
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value,
                      })
                    }
                    className="
                      [&::-webkit-inner-spin-button]:appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-black/10
                      px-4 py-3
                      text-sm text-white
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-400/30
                      focus:ring-2
                      focus:ring-emerald-400/[0.08]
                    "
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Stock
                  </label>

                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: e.target.value,
                      })
                    }
                    className="
                      [&::-webkit-inner-spin-button]:appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-black/10
                      px-4 py-3
                      text-sm text-white
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-400/30
                      focus:ring-2
                      focus:ring-emerald-400/[0.08]
                    "
                  />
                </div>
              </div>
            </div>

            {/* =====================================================
                PRODUCT IMAGE
            ===================================================== */}
            <div className="border-t border-white/[0.07] pt-8">
              <div className="mb-5">
                <p className="text-sm font-semibold text-white">
                  Product Image
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Upload a clear image for your product.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Preview */}
                {(imageFile || formData.image) && (
                  <div
                    className="
                      group/preview
                      relative
                      size-24
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.035]
                    "
                  >
                    <img
                      src={
                        imageFile
                          ? URL.createObjectURL(imageFile)
                          : formData.image
                      }
                      alt="Preview"
                      className="
                        size-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover/preview:scale-105
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                )}

                {/* Upload */}
                <label
                  className="
                    flex
                    min-h-24
                    flex-1
                    cursor-pointer
                    items-center
                    gap-4
                    rounded-2xl
                    border border-dashed border-white/10
                    bg-white/[0.02]
                    px-5
                    transition-all duration-300
                    hover:border-emerald-400/20
                    hover:bg-emerald-400/[0.03]
                  "
                >
                  <div
                    className="
                      flex size-11 shrink-0 items-center justify-center
                      rounded-xl
                      border border-emerald-400/15
                      bg-emerald-400/[0.06]
                      text-emerald-300
                    "
                  >
                    <ImageIcon className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/75">
                      Choose product image
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      PNG, JPG or WEBP
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* =====================================================
                DESCRIPTION
            ===================================================== */}
            <div className="border-t border-white/[0.07] pt-8">
              <div className="mb-5">
                <p className="text-sm font-semibold text-white">Description</p>

                <p className="mt-1 text-xs text-white/35">
                  Tell customers what makes this product special.
                </p>
              </div>

              <textarea
                required
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                placeholder="Write a product description..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-white/10
                  bg-black/10
                  px-4 py-3
                  text-sm
                  leading-6
                  text-white
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

            {/* =====================================================
                ORGANIC
            ===================================================== */}
            <div className="border-t border-white/[0.07] pt-8">
              <label
                htmlFor="isOrganic"
                className="
                  group/organic
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  gap-4
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.02]
                  p-4
                  transition-all duration-300
                  hover:border-emerald-400/15
                  hover:bg-emerald-400/[0.03]
                "
              >
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
                    <SparklesIcon className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80">
                      Organic Product
                    </p>

                    <p className="text-xs text-white/30">
                      Mark this product as organic.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  id="isOrganic"
                  checked={formData.isOrganic}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isOrganic: e.target.checked,
                    })
                  }
                  className="
                    size-5
                    cursor-pointer
                    rounded
                    border-white/20
                    bg-white/[0.05]
                    accent-emerald-400
                  "
                />
              </label>
            </div>

            {/* =====================================================
                ACTIONS
            ===================================================== */}
            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-white/[0.07]
                pt-6
                sm:flex-row
                sm:items-center
                sm:justify-end
              "
            >
              <Link
                to="/admin/products"
                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  px-5 py-2.5
                  text-sm font-medium
                  text-white/50
                  transition-all duration-300
                  hover:border-white/15
                  hover:bg-white/[0.06]
                  hover:text-white/80
                "
              >
                Cancel
              </Link>

              <button
                disabled={saving}
                type="submit"
                className="
                  group/save
                  relative
                  isolate
                  flex
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-xl
                  border border-emerald-400/20
                  bg-emerald-400/10
                  px-5 py-2.5
                  text-sm font-medium
                  text-emerald-200
                  shadow-[0_10px_35px_rgba(16,185,129,0.08)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-300/30
                  hover:bg-emerald-400/[0.14]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <SaveIcon className="relative z-10 size-4" />

                <span className="relative z-10">
                  {saving ? "Saving..." : "Save Product"}
                </span>

                {/* Shine */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-[-120%]
                    z-0
                    w-[65%]
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
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
