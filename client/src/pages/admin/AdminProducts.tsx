import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  EditIcon,
  XIcon,
  PackageIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import type { Product } from "../../types";
import Loading from "../../components/Loading";
import { dummyProducts } from "../../assets/assets";

export default function AdminProducts() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setProducts(dummyProducts);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleMarkOutOfStock = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Are you sure you want to mark "${name}" as out of stock?`,
      )
    )
      return;

    console.log(id);
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
            Inventory
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-white/40">
            Manage your product catalog and inventory.
          </p>
        </div>

        <Link
          to="/admin/products/new"
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

          <span className="relative z-10">Add Product</span>

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
        </Link>
      </div>

      {/* =========================================================
          PRODUCTS TABLE
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
                flex size-10 items-center justify-center
                rounded-xl
                border border-emerald-400/15
                bg-emerald-400/[0.06]
                text-emerald-300
              "
            >
              <PackageIcon className="size-5" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Product Catalog
              </h2>

              <p className="text-xs text-white/35">
                {products.length} products
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative z-10 overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.015] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-white/35"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="
                      group/row
                      transition-colors duration-200
                      hover:bg-white/[0.025]
                    "
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            size-12 shrink-0
                            overflow-hidden
                            rounded-xl
                            border border-white/10
                            bg-white/[0.04]
                          "
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="
                              size-full
                              object-cover
                              transition-transform
                              duration-500
                              group-hover/row:scale-105
                            "
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[260px] truncate font-semibold text-white/85">
                            {product.name}
                          </p>

                          <p className="mt-0.5 text-xs text-white/35">
                            {product.category || "Uncategorized"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-white/80">
                        {currency}
                        {product.price.toFixed(2)}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          border
                          px-2.5 py-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wide
                          ${
                            product.stock > 0
                              ? "border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-300"
                              : "border-red-400/15 bg-red-400/[0.07] text-red-300"
                          }
                        `}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          title="Edit Product"
                          className="
                            flex size-9 items-center justify-center
                            rounded-xl
                            border border-white/10
                            bg-white/[0.035]
                            text-white/40
                            transition-all duration-300
                            hover:border-emerald-400/20
                            hover:bg-emerald-400/[0.08]
                            hover:text-emerald-300
                          "
                        >
                          <EditIcon className="size-4" />
                        </Link>

                        <button
                          onClick={() =>
                            handleMarkOutOfStock(product._id, product.name)
                          }
                          title="Mark Out of Stock"
                          className="
                            flex size-9 items-center justify-center
                            rounded-xl
                            border border-white/10
                            bg-white/[0.035]
                            text-white/40
                            transition-all duration-300
                            hover:border-red-400/20
                            hover:bg-red-400/[0.07]
                            hover:text-red-300
                          "
                        >
                          <XIcon className="size-4" />
                        </button>

                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="
                            hidden items-center gap-1
                            rounded-xl
                            border border-white/10
                            bg-white/[0.035]
                            px-3 py-2
                            text-xs font-medium
                            text-white/45
                            transition-all duration-300
                            hover:border-white/15
                            hover:bg-white/[0.06]
                            hover:text-white/80
                            xl:flex
                          "
                        >
                          Edit
                          <ArrowUpRightIcon className="size-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
