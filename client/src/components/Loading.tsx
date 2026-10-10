const Loading = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#031c14]">
      {/* Ambient emerald glow */}
      <div className="pointer-events-none absolute size-40 animate-[loaderBreathe_3s_ease-in-out_infinite] rounded-full bg-emerald-400/8 blur-[55px]" />

      <div className="relative flex flex-col items-center">
        {/* Orbital Loader */}
        <div className="relative flex size-24 items-center justify-center">
          {/* Outer atmospheric ring */}
          <div className="absolute inset-0 rounded-full border border-emerald-400/8" />

          {/* Segmented orbit */}
          <div
            className="absolute inset-1 animate-[loaderOrbit_2.8s_linear_infinite] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 35deg, rgba(52,211,153,0.08) 48deg, rgba(52,211,153,0.95) 95deg, rgba(45,212,191,0.7) 125deg, transparent 155deg, transparent 360deg)",
              maskImage:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))",
              WebkitMaskImage:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))",
            }}
          />

          {/* Counter-rotating inner orbit */}
          <div
            className="absolute inset-3.25 animate-[loaderOrbitReverse_1.8s_linear_infinite] rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg, transparent 0deg, rgba(45,212,191,0.05) 30deg, rgba(45,212,191,0.7) 95deg, transparent 145deg, transparent 360deg)",
              maskImage:
                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
              WebkitMaskImage:
                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
            }}
          />

          {/* Orbiting particle */}
          <div className="absolute inset-0.5 animate-[loaderOrbit_2.8s_linear_infinite]">
            <div className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          </div>

          {/* Inner glass core */}
          <div className="relative flex size-11 items-center justify-center rounded-full border border-emerald-300/20 bg-[#06271d]/90 shadow-[inset_0_0_14px_rgba(52,211,153,0.08),0_0_25px_rgba(16,185,129,0.12)] backdrop-blur-xl">
            {/* Pulsating energy core */}
            <div className="absolute size-5 animate-[loaderCore_1.8s_ease-in-out_infinite] rounded-full bg-emerald-400/20 blur-md" />

            <div className="relative size-2.5 animate-[loaderCore_1.8s_ease-in-out_infinite] rounded-full bg-linear-to-br from-emerald-200 via-emerald-400 to-teal-500 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />

            {/* Tiny core highlight */}
            <div className="absolute left-3.75 top-3.25 size-1 rounded-full bg-white/80" />
          </div>
        </div>

        {/* Loading label */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald-200/80">
            Grovia
          </p>

          {/* Animated progress lights */}
          <div className="flex items-center gap-1.5">
            <span className="size-1 animate-[loaderDot_1.2s_ease-in-out_infinite] rounded-full bg-emerald-400" />
            <span className="size-1 animate-[loaderDot_1.2s_ease-in-out_.2s_infinite] rounded-full bg-emerald-400/70" />
            <span className="size-1 animate-[loaderDot_1.2s_ease-in-out_.4s_infinite] rounded-full bg-teal-400/50" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loaderOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes loaderOrbitReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes loaderBreathe {
          0%, 100% { opacity: 0.5; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes loaderCore {
          0%, 100% { opacity: 0.7; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes loaderDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[loader"] {
            animation-duration: 4s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
