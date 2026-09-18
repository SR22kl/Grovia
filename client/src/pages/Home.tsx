import BrowseCategories from "../components/Home/BrowseCategories";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import NewsLetter from "../components/Home/NewsLetter";
import PopProducts from "../components/Home/PopProducts";
import PromoBanner from "../components/Home/PromoBanner";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* LIQUID GLASS BACKGROUND */}

      {/* Ambient emerald glow - top left */}
      <div
        className="
          pointer-events-none absolute
          -left-40 -top-40
          size-105
          rounded-full
          bg-emerald-400/8
          blur-[120px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
      />

      {/* Ambient teal glow - top right */}
      <div
        className="
          pointer-events-none absolute
          -right-32 top-[12%]
          size-90
          rounded-full
          bg-teal-300/20
          blur-[110px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
      />

      {/* Ambient emerald glow - center */}
      <div
        className="
          pointer-events-none absolute
          left-[35%] top-[42%]
          size-75
          rounded-full
          bg-emerald-500/50
          blur-[120px]
          animate-[liquidPulse_10s_ease-in-out_infinite]
        "
      />

      {/* Ambient glow - bottom */}
      <div
        className="
          pointer-events-none absolute
          -bottom-48 right-[15%]
          size-105
          rounded-full
          bg-emerald-300/50
          blur-[130px]
          animate-[liquidFloat_14s_ease-in-out_infinite]
        "
      />
      {/* SUBTLE GLASS GRID */}

      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
      />

      {/* TOP GLOSS */}

      <div
        className="
          pointer-events-none absolute inset-x-0 top-0
          h-105
          bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.07),transparent_65%)]
        "
      />

      {/* MAIN CONTENT */}

      {/* Navbar */}
      <section className="animate-[homeReveal_.5s_cubic-bezier(.16,1,.3,1)] mt-8 ">
        <Navbar />
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 ">
        {/* Hero */}
        <section className="animate-[homeReveal_.7s_cubic-bezier(.16,1,.3,1)]">
          <Hero />
        </section>

        {/* Features */}
        <section
          className="mt-15 animate-[homeReveal_.7s_cubic-bezier(.16,1,.3,1)] md:mt-18"
          style={{
            animationDelay: "80ms",
            animationFillMode: "both",
          }}
        >
          <Features />
        </section>

        {/* Browse Categories */}
        <section
          className="mt-10 animate-[homeReveal_.7s_cubic-bezier(.16,1,.3,1)] sm:mt-14"
          style={{
            animationDelay: "160ms",
            animationFillMode: "both",
          }}
        >
          <BrowseCategories />
        </section>

        {/* Popular Products */}
        <section
          className="mt-5 animate-[homeReveal_.7s_cubic-bezier(.16,1,.3,1)]"
          style={{
            animationDelay: "240ms",
            animationFillMode: "both",
          }}
        >
          <PopProducts />
        </section>

        {/* Promo Banner */}
        <section
          className="animate-[homeReveal_.7s_cubic-bezier(.16,1,.3,1)]"
          style={{
            animationDelay: "320ms",
            animationFillMode: "both",
          }}
        >
          <PromoBanner />
        </section>

        {/* Newsletter */}
        <section
          className="mt-10 animate-[homeReveal_.7s_cubic-bezier(.16,1,.3,1)] sm:mt-14"
          style={{
            animationDelay: "400ms",
            animationFillMode: "both",
          }}
        >
          <NewsLetter />
        </section>
      </div>

      {/* BOTTOM FADE */}

      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0
          h-72
          bg-linear-to-t
          from-[#031c14]
          via-[#031c14]/60
          to-transparent
        "
      />

      {/* ANIMATIONS */}

      <style>{`
        @keyframes homeReveal {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes liquidFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          35% {
            transform: translate3d(35px, -25px, 0) scale(1.06);
          }

          70% {
            transform: translate3d(-20px, 30px, 0) scale(0.96);
          }
        }

        @keyframes liquidFloatReverse {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          40% {
            transform: translate3d(-30px, 25px, 0) scale(1.05);
          }

          75% {
            transform: translate3d(25px, -20px, 0) scale(0.96);
          }
        }

        @keyframes liquidPulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(1);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;
