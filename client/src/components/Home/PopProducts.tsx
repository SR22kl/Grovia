import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { dummyProducts } from "../../assets/assets";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import ProductCard from "../ProductCard";

const PopProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(dummyProducts.slice(0, 10));
  }, []);
  return (
    <>
      <section className="py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-semibold text-2xl">Popular Products</h2>
              <p className="text-sm text-app-text-light mt-1">
                Seasonal Favorites, Organic & More
              </p>
            </div>
            {/* view all  */}
            <Link
              to="/products"
              className="group flex items-center gap-1.5 font-medium text-base text-app-orange hover:text-app-orange-dark "
            >
              View All
              <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-all duration-200 ease-in" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PopProducts;
