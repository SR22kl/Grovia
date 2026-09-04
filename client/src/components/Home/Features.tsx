import { heroSectionData } from "../../assets/assets";

const Features = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-app-border/80 bg-white py-5 shadow-sm">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-40 rounded-full bg-app-cream/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 size-40 rounded-full bg-app-green/5 blur-3xl" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {heroSectionData.hero_features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-transparent px-3 py-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-app-border hover:bg-zinc-50 hover:shadow-md sm:px-4"
              style={{
                animation: `featureFadeIn 0.5s ease-out ${index * 100}ms both`,
              }}
            >
              {/* Hover shimmer */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-app-cream/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Icon wrapper */}
              <div className="relative shrink-0">
                {/* Breathing glow */}
                <div className="absolute inset-0 rounded-xl bg-app-green/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-pulse" />

                {/* Icon */}
                <div className="relative flex size-10 items-center justify-center rounded-xl  text-app-green transition-all bg-green-950/10 duration-300 group-hover:scale-105 group-hover:bg-green-950/20 sm:size-11 cursor-pointer">
                  <feature.icon className="size-5 transition-transform duration-500 group-hover:scale-110 sm:size-6" />
                </div>
              </div>

              {/* Content */}
              <div className="relative min-w-0">
                <p className="truncate text-sm font-semibold text-app-green">
                  {feature?.title}
                </p>

                <p className="mt-0.5 text-[11px] leading-relaxed text-app-text-light sm:text-xs">
                  {feature?.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entrance animation */}
      <style>{`
        @keyframes featureFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Features;
