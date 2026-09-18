import { ArrowRightIcon, LeafIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { heroSectionData } from "../../assets/assets";

const Hero = () => {
  return (
    <section className="group relative isolate mb-10 min-h-135 overflow-hidden rounded-4xl border border-white/10 bg-white/4 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:min-h-145">
      {/* =========================================================
          HERO IMAGE
      ========================================================= */}

      <img
        src={heroSectionData?.hero_image}
        alt="Fresh and organic groceries"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          transition-transform
          duration-1800
          ease-out
          group-hover:scale-[1.035]
        "
      />

      {/* =========================================================
          GLASS OVERLAYS
      ========================================================= */}

      {/* Main emerald cinematic overlay */}
      <div
        className="
          absolute inset-0
          bg-linear-to-r
          from-[#031c14]
          via-[#031c14]/90
          via-55%
          to-transparent
        "
      />

      {/* Bottom fade */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-40
          bg-linear-to-t
          from-[#031c14]/80
          to-transparent
        "
      />

      {/* Soft image tint */}
      <div className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply" />

      {/* =========================================================
          AMBIENT GLOW
      ========================================================= */}

      <div
        className="
          pointer-events-none absolute
          -left-24 -top-24
          size-72
          rounded-full
          bg-emerald-400/10
          blur-[100px]
          transition-transform
          duration-1500
          group-hover:translate-x-8
          group-hover:translate-y-6
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 left-[35%]
          size-80
          rounded-full
          bg-orange-300/6
          blur-[110px]
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

      <div className="relative z-10 flex min-h-135 items-center px-5 py-16 sm:min-h-145 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className="
              mb-6 inline-flex items-center gap-2
              rounded-full
              border border-orange-300/20
              bg-orange-300/10
              px-3.5 py-2
              shadow-lg shadow-orange-950/10
              backdrop-blur-xl
              transition-all duration-300
              hover:border-orange-300/30
              hover:bg-orange-300/15
            "
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-orange-300/15">
              <LeafIcon className="size-3.5 text-orange-300" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-200">
              Fresh & Organic
            </span>

            <span className="size-1 rounded-full bg-orange-300/60" />
            <SparklesIcon className="size-3 text-orange-200/70" />
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-xl
              font-serif
              text-4xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Nourish your home with{" "}
            <span className="relative inline-block text-orange-300">
              Earth's finest
              <span className="absolute -bottom-1 left-0 h-px w-full bg-linear-to-r from-orange-300/70 to-transparent" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg font-serif text-sm leading-7 text-white/55 sm:text-base">
            {heroSectionData?.description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="
                group/button
                inline-flex items-center justify-center gap-2
                rounded-2xl
                border border-orange-300/30
                bg-orange-500
                px-6 py-3.5
                text-xs font-bold
                text-white
                shadow-xl shadow-orange-950/20
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-orange-600
                hover:shadow-2xl hover:shadow-orange-950/30
                active:scale-[0.98]
              "
            >
              Shop Now
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>

            <Link
              to="/products"
              className="
                inline-flex items-center justify-center
                rounded-2xl
                border border-white/15
                bg-white/8
                px-6 py-3.5
                text-xs font-semibold
                text-white/80
                shadow-lg shadow-black/10
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-white/25
                hover:bg-white/13
                hover:text-white
                active:scale-[0.98]
              "
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          GLASS EDGE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/6" />
    </section>
  );
};

export default Hero;
