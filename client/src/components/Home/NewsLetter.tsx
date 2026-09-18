import { ArrowRight, Check, Mail, Sparkles, Zap } from "lucide-react";

const NewsLetter = () => {
  return (
    <section className="my-8 sm:my-10">
      <div
        className="
          group relative isolate
          mx-auto w-full
          overflow-hidden
          rounded-[2rem]
          border border-white/10
          bg-white/[0.04]
          shadow-2xl shadow-black/20
          backdrop-blur-2xl
        "
      >
        {/* =========================================================
            LIQUID GLASS BACKGROUND
        ========================================================= */}

        <div
          className="
            pointer-events-none absolute
            -right-32 -top-32
            size-80
            rounded-full
            bg-emerald-400/[0.08]
            blur-[110px]
            transition-transform
            duration-[1400ms]
            ease-out
            group-hover:-translate-x-8
            group-hover:translate-y-6
          "
        />

        <div
          className="
            pointer-events-none absolute
            -bottom-40 -left-32
            size-96
            rounded-full
            bg-orange-300/[0.045]
            blur-[120px]
            transition-transform
            duration-[1600ms]
            ease-out
            group-hover:translate-x-8
            group-hover:-translate-y-5
          "
        />

        <div
          className="
            pointer-events-none absolute
            left-[35%] top-1/2
            size-56
            -translate-y-1/2
            rounded-full
            bg-emerald-300/[0.035]
            blur-[100px]
          "
        />

        {/* =========================================================
            SUBTLE GRID
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

        <div className="relative z-10 grid items-center gap-12 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:px-14 lg:py-16">
          {/* =======================================================
              LEFT CONTENT
          ======================================================= */}

          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="
                mb-5 inline-flex
                items-center gap-2
                rounded-full
                border border-emerald-400/15
                bg-emerald-400/[0.07]
                px-3 py-1.5
                shadow-lg shadow-emerald-950/10
                backdrop-blur-xl
              "
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-400/10">
                <Sparkles className="size-3 text-emerald-300" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                Fresh updates
              </span>

              <span className="size-1 rounded-full bg-emerald-400/50" />

              <span className="text-[9px] font-medium text-white/30">
                Straight to your inbox
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                max-w-xl
                text-3xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Fresh deals.
              <br />
              <span className="relative text-emerald-300">
                Fresh in your inbox.
                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-full
                    bg-linear-to-r
                    from-emerald-300/70
                    to-transparent
                  "
                />
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
              Subscribe to Grovia and be the first to know about exclusive
              offers, new arrivals, seasonal picks, and grocery deals.
            </p>

            {/* =====================================================
                FORM
            ===================================================== */}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              {/* Input */}
              <div
                className="
                  group/input
                  relative flex flex-1
                  items-center
                  rounded-2xl
                  border border-white/10
                  bg-black/[0.16]
                  shadow-inner shadow-black/10
                  backdrop-blur-xl
                  transition-all duration-300
                  focus-within:border-emerald-400/30
                  focus-within:bg-black/[0.22]
                  focus-within:shadow-lg
                  focus-within:shadow-emerald-950/10
                "
              >
                <Mail
                  className="
                    ml-4 size-4 shrink-0
                    text-white/25
                    transition-all duration-300
                    group-focus-within/input:scale-110
                    group-focus-within/input:text-emerald-300
                  "
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="
                    w-full
                    bg-transparent
                    px-3 py-3.5
                    text-xs
                    text-white/80
                    outline-none
                    placeholder:text-white/20
                  "
                />

                {/* Input glow */}
                <div
                  className="
                    pointer-events-none absolute
                    inset-0 rounded-2xl
                    ring-1 ring-inset
                    ring-transparent
                    transition-all duration-300
                    group-focus-within/input:ring-emerald-400/10
                  "
                />
              </div>

              {/* Subscribe */}
              <button
                type="submit"
                className="
                  group/button
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border border-emerald-300/20
                  bg-emerald-400
                  px-6 py-3.5
                  text-xs font-bold
                  text-[#031c14]
                  shadow-lg
                  shadow-emerald-950/20
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-emerald-300
                  hover:shadow-xl
                  hover:shadow-emerald-950/30
                  active:scale-[0.98]
                "
              >
                Subscribe
                <ArrowRight
                  className="
                    size-4
                    transition-transform duration-300
                    group-hover/button:translate-x-1
                  "
                />
              </button>
            </form>

            {/* =====================================================
                TRUST INDICATORS
            ===================================================== */}

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5 text-[10px] text-white/25">
                <Check className="size-3.5 text-emerald-400/70" />
                No spam
              </span>

              <span className="flex items-center gap-1.5 text-[10px] text-white/25">
                <Check className="size-3.5 text-emerald-400/70" />
                Exclusive offers
              </span>

              <span className="flex items-center gap-1.5 text-[10px] text-white/25">
                <Check className="size-3.5 text-emerald-400/70" />
                Unsubscribe anytime
              </span>
            </div>
          </div>

          {/* =======================================================
              MAIL VISUAL
          ======================================================= */}

          <div className="relative mx-auto hidden size-56 lg:flex">
            {/* Outer glow */}
            <div
              className="
                pointer-events-none absolute
                inset-4
                rounded-full
                bg-emerald-400/[0.10]
                blur-[55px]
                transition-all
                duration-700
                group-hover:inset-0
                group-hover:bg-emerald-400/[0.15]
              "
            />

            {/* Glass orb */}
            <div
              className="
                relative flex
                size-56
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
              "
            >
              {/* Orb highlight */}
              <div
                className="
                  pointer-events-none absolute
                  left-8 top-7
                  size-20
                  rounded-full
                  bg-white/[0.025]
                  blur-2xl
                "
              />

              {/* Floating dot */}
              <div
                className="
                  absolute
                  -right-1 top-10
                  flex size-5
                  items-center justify-center
                  rounded-full
                  border border-emerald-300/20
                  bg-emerald-300/10
                  shadow-lg shadow-emerald-950/20
                  animate-[newsletterFloat_3s_ease-in-out_infinite]
                "
              >
                <span className="size-1.5 rounded-full bg-emerald-300" />
              </div>

              {/* Envelope */}
              <div
                className="
                  relative
                  flex size-28
                  rotate-[-4deg]
                  items-center justify-center
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.06]
                  shadow-xl
                  shadow-black/20
                  backdrop-blur-xl
                  transition-all duration-500
                  group-hover:rotate-0
                  group-hover:scale-105
                  group-hover:border-emerald-400/20
                  group-hover:bg-emerald-400/[0.07]
                "
              >
                <Mail
                  className="
                    size-14
                    text-emerald-300/80
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:text-emerald-300
                  "
                  strokeWidth={1.4}
                />

                {/* Envelope shine */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    rounded-3xl
                    ring-1 ring-inset
                    ring-white/[0.05]
                  "
                />
              </div>

              {/* Sparkle */}
              <Sparkles
                className="
                  absolute
                  bottom-8 left-7
                  size-5
                  text-orange-300/70
                  animate-pulse
                "
              />

              {/* Small accent */}
              <Zap
                className="
                  absolute
                  right-9 bottom-10
                  size-3.5
                  rotate-12
                  text-emerald-300/40
                "
              />

              {/* Orb border */}
              <div className="pointer-events-none absolute inset-2 rounded-full border border-white/[0.04]" />
            </div>
          </div>
        </div>

        {/* =========================================================
            EDGE HIGHLIGHT
        ========================================================= */}

        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.06]" />
      </div>

      <style>{`
        @keyframes newsletterFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
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

export default NewsLetter;
