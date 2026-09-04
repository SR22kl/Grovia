import { TruckIcon, XIcon, ZapIcon } from "lucide-react";
import { useState } from "react";

const Banners = () => {
  const [bannerVisible, setBannerVisible] = useState(() => {
    return sessionStorage.getItem("banner_dismissed") !== "true";
  });

  const dismissBanner = () => {
    setBannerVisible(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };
  return (
    <>
      <div>
        {bannerVisible && (
          <div className="bg-linear-to-r from-app-green via-emerald-800 to-app-green  p-2 text-white text-xs sm:text-sm relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex-center gap-6">
              <div className="flex-center gap-2">
                <TruckIcon className="size-4 shrink-0" />
                <span className="font-medium">
                  Free delivery on orders over $15
                </span>
              </div>
              <span className="hidden sm:inline text-white/40">|</span>
              <div className="hidden sm:flex items-center gap-2">
                <ZapIcon className="size-4 fill-yellow-400 shrink-0" />
                <span className="font-medium">
                  Freshly picked groceries delivered to your doorstep
                </span>
              </div>
            </div>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              onClick={dismissBanner}
            >
              <XIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Banners;
