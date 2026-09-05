import { SiAndroid, SiAppstore } from "@icons-pack/react-simple-icons";
import { appPromoBannerData, assets } from "../../assets/assets";

const PromoBanner = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-linear-to-r from-app-green via-emerald-800 to-app-green rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10">
          {/* left side */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">
              {appPromoBannerData?.title}
            </h2>
            <p className="text-white/70 mb-6 max-w-md">
              {appPromoBannerData?.description}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="bg-white text-app-green hover:bg-orange-100 font-semibold px-6 py-2 rounded-xl flex-center gap-2">
                <SiAppstore className="size-5" />
                App Store
              </button>
              <button className="bg-white/10 hover:bg-white/20 transition-all border border-white/20 text-white font-semibold px-6 py-2 rounded-md flex-center gap-2">
                <SiAndroid className="size-5" />
                Google Play
              </button>
            </div>
          </div>
          {/* Right side */}

          <img
            className="max-w-60 sm:max-w-120 xl:pr-10"
            src={assets.delivery_truck}
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default PromoBanner;
