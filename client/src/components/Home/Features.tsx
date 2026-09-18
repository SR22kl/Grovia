import { heroSectionData } from "../../assets/assets";

const Features = () => {
  return (
    <section
      className="
        group relative isolate overflow-hidden
        rounded-[1.75rem]
        border border-white/10
        bg-white/4.5
        shadow-2xl shadow-black/10
        backdrop-blur-2xl
      "
    >
      {/* =========================================================
          AMBIENT GLOW
      ========================================================= */}

      <div
        className="
          pointer-events-none absolute
          -left-24 -top-24
          size-52
          rounded-full
          bg-emerald-400/[0.07]
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24 -right-24
          size-52
          rounded-full
          bg-orange-300/4.5
          blur-[90px]
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
          FEATURES
      ========================================================= */}

      <div className="relative z-10 grid grid-cols-2 divide-white/[0.07] md:grid-cols-4 md:divide-x">
        {heroSectionData.hero_features.map((feature, index) => (
          <div
            key={index}
            className="
              group/feature relative
              flex items-center gap-3
              border-b border-white/[0.07]
              px-4 py-5
              transition-all duration-300
              hover:bg-white/[0.035]
              md:border-b-0
              md:px-5
              lg:px-6
            "
            style={{
              animation: `featureReveal 0.55s cubic-bezier(.16,1,.3,1) ${
                index * 90
              }ms both`,
            }}
          >
            {/* Individual feature shine */}
            <div
              className="
                pointer-events-none absolute inset-0
                -translate-x-full
                bg-linear-to-r
                from-transparent
                via-white/[0.035]
                to-transparent
                transition-transform duration-700
                group-hover/feature:translate-x-full
              "
            />

            {/* Icon */}
            <div className="relative shrink-0">
              <div
                className="
                  absolute inset-0
                  rounded-xl
                  bg-emerald-400/20
                  opacity-0
                  blur-lg
                  transition-opacity duration-300
                  group-hover/feature:opacity-100
                "
              />

              <div
                className="
                  relative flex size-10
                  items-center justify-center
                  rounded-xl
                  border border-emerald-400/15
                  bg-emerald-400/8
                  text-emerald-300
                  transition-all duration-300
                  group-hover/feature:scale-105
                  group-hover/feature:border-emerald-400/25
                  group-hover/feature:bg-emerald-400/13
                  sm:size-11
                "
              >
                <feature.icon
                  className="
                    size-5
                    transition-transform duration-500
                    group-hover/feature:scale-110
                    group-hover/feature:-rotate-3
                    sm:size-5.25
                  "
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative min-w-0">
              <p
                className="
                  truncate
                  text-xs font-bold
                  text-white/80
                  transition-colors duration-300
                  group-hover/feature:text-emerald-300
                  sm:text-sm
                "
              >
                {feature?.title}
              </p>

              <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-white/30 sm:text-[11px]">
                {feature?.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================
          EDGE HIGHLIGHT
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/5" />

      {/* =========================================================
          ANIMATION
      ========================================================= */}

      <style>{`
        @keyframes featureReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;
