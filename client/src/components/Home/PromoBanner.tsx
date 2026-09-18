import { SiAndroid, SiAppstore } from "@icons-pack/react-simple-icons";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { appPromoBannerData, assets } from "../../assets/assets";

const PromoBanner = () => {
  return (
    <section className="my-14 sm:my-20">
      <div
        className="
          group relative isolate
          overflow-hidden
          rounded-[2rem]
          border border-white/10
          bg-linear-to-br
          from-emerald-500/[0.14]
          via-white/[0.045]
          to-orange-300/[0.06]
          shadow-2xl
          shadow-black/20
          backdrop-blur-2xl
        "
      >
        {/* =========================================================
            AMBIENT LIQUID GLOWS
        ========================================================= */}

        <div
          className="
            pointer-events-none absolute
            -left-28 -top-28
            size-72
            rounded-full
            bg-emerald-400/[0.10]
            blur-[100px]
            transition-transform
            duration-[1200ms]
            group-hover:translate-x-8
            group-hover:translate-y-6
          "
        />

        <div
          className="
            pointer-events-none absolute
            -bottom-32 -right-20
            size-80
            rounded-full
            bg-orange-300/[0.07]
            blur-[110px]
            transition-transform
            duration-[1400ms]
            group-hover:-translate-x-8
            group-hover:-translate-y-5
          "
        />

        {/* =========================================================
            GLASS GRID
        ========================================================= */}

        <div
          className="
            pointer-events-none absolute inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />

        {/* =========================================================
            GLASS SHINE
        ========================================================= */}

        <div
          className="
            pointer-events-none absolute inset-y-0 left-[-120%]
            z-20
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

        <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-12 sm:px-10 sm:py-14 md:flex-row md:justify-between lg:px-14">
          {/* Left */}
          <div className="max-w-xl text-center md:text-left">
            {/* Badge */}
            <div
              className="
                mb-5 inline-flex
                items-center gap-2
                rounded-full
                border border-emerald-400/15
                bg-emerald-400/[0.07]
                px-3 py-1.5
                backdrop-blur-xl
              "
            >
              <Smartphone className="size-3.5 text-emerald-300" />

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                Grovia Mobile App
              </span>
            </div>

            <h2
              className="
                font-serif
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              {appPromoBannerData?.title}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/40 sm:text-base">
              {appPromoBannerData?.description}
            </p>

            {/* App buttons */}
            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <button
                type="button"
                className="
                  group/store
                  inline-flex
                  items-center gap-2.5
                  rounded-xl
                  border border-white/15
                  bg-white/[0.95]
                  px-4 py-2.5
                  text-xs font-bold
                  text-[#063025]
                  shadow-xl shadow-black/10
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  hover:shadow-2xl
                  active:scale-[0.98]
                "
              >
                <SiAppstore className="size-5" />

                <span>App Store</span>

                <ArrowUpRight
                  className="
                    size-3
                    opacity-40
                    transition-transform duration-300
                    group-hover/store:translate-x-0.5
                    group-hover/store:-translate-y-0.5
                  "
                />
              </button>

              <button
                type="button"
                className="
                  group/store
                  inline-flex
                  items-center gap-2.5
                  rounded-xl
                  border border-white/15
                  bg-white/[0.07]
                  px-4 py-2.5
                  text-xs font-bold
                  text-white/75
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-white/25
                  hover:bg-white/[0.12]
                  hover:text-white
                  active:scale-[0.98]
                "
              >
                <SiAndroid className="size-5" />

                <span>Google Play</span>

                <ArrowUpRight
                  className="
                    size-3
                    opacity-40
                    transition-transform duration-300
                    group-hover/store:translate-x-0.5
                    group-hover/store:-translate-y-0.5
                  "
                />
              </button>
            </div>
          </div>

          {/* =========================================================
              TRUCK VISUAL
          ========================================================= */}

          <div className="relative shrink-0">
            {/* Glow behind truck */}
            <div
              className="
                pointer-events-none absolute
                left-1/2 top-1/2
                size-44
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-emerald-300/[0.12]
                blur-[60px]
                transition-all
                duration-700
                group-hover:size-56
                group-hover:bg-emerald-300/[0.16]
              "
            />

            {/* Glass orb */}
            <div
              className="
                relative flex
                size-44
                items-center
                justify-center
                rounded-full
                border border-white/10
                bg-white/[0.045]
                shadow-2xl
                shadow-black/20
                backdrop-blur-xl
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
                sm:size-52
              "
            >
              <img
                src={assets.delivery_truck}
                alt="Delivery truck"
                className="
                  relative z-10
                  w-36
                  object-contain
                  drop-shadow-2xl
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:translate-x-2
                  sm:w-44
                "
              />

              {/* Orb shine */}
              <div className="pointer-events-none absolute inset-3 rounded-full border border-white/[0.05]" />
            </div>
          </div>
        </div>

        {/* =========================================================
            EDGE HIGHLIGHT
        ========================================================= */}

        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.06]" />
      </div>
    </section>
  );
};

export default PromoBanner;
