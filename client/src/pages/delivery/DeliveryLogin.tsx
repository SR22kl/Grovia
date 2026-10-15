import { useEffect, useState } from "react";
import {
  BikeIcon,
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeliveryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/delivery/login", {
        email,
        password,
      });

      localStorage.setItem("delivery_token", data.token);
      localStorage.setItem("delivery_partner", JSON.stringify(data.partner));

      toast.success("Login successful!");
      navigate("/delivery");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || error?.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("delivery_token")) {
      navigate("/delivery", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-112 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/4 size-120 rounded-full bg-teal-400/10 blur-[130px]" />
        <div className="absolute -bottom-48 left-1/3 size-128 rounded-full bg-orange-400/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#031c14]/80" />
      </div>

      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-12 xl:px-20">
        {/* Brand panel */}
        <section className="relative hidden min-h-170 flex-col justify-between overflow-hidden rounded-4xl border border-white/10 bg-white/[0.035] p-10 shadow-2xl shadow-black/10 backdrop-blur-2xl lg:flex xl:p-14">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-300/9 via-transparent to-teal-300/[0.035]" />

          <div className="pointer-events-none absolute -right-24 top-20 size-80 rounded-full bg-emerald-400/10 blur-[90px]" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-200/20 bg-emerald-300/10 shadow-lg shadow-emerald-950/20">
              <BikeIcon className="size-6 text-emerald-300" />
            </div>

            <div>
              <p className="text-xl font-semibold tracking-tight">Grovia</p>
              <p className="mt-0.5 text-xs tracking-[0.2em] text-emerald-200/60 uppercase">
                Delivery network
              </p>
            </div>
          </div>

          <div className="relative z-10 my-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3.5 py-2 text-xs font-medium tracking-wide text-emerald-200">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
              YOUR NEXT DELIVERY STARTS HERE
            </div>

            <h1 className="max-w-xl text-5xl leading-[1.12] font-semibold tracking-tight xl:text-6xl">
              Every delivery,
              <span className="mt-2 block bg-linear-to-r from-emerald-200 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                made meaningful.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/55">
              Your deliveries, your routes, your progress. Sign in to access
              your delivery workspace and keep Grovia moving.
            </p>

            {/* Glass feature card */}
            <div className="mt-10 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/4.5 p-5 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/10">
                  <ShieldCheck className="size-5 text-emerald-300" />
                </div>

                <div>
                  <p className="font-medium text-white/90">
                    Your delivery workspace
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/45">
                    Access your assigned orders and manage deliveries from one
                    place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-white/35">
            <span>Deliver with confidence.</span>
            <span>Grovia © {new Date().getFullYear()}</span>
          </div>
        </section>

        {/* Login panel */}
        <section className="mx-auto w-full max-w-md animate-[loginReveal_.7s_ease-out_both] lg:ml-auto lg:mr-0">
          {/* Mobile branding */}

          <div className="mb-8 relative flex justify-center items-center gap-2 lg:hidden">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 shadow-lg shadow-emerald-950/30">
              <BikeIcon className="size-7 text-emerald-300" />
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight">Grovia</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center mb-7">
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-emerald-300/80 uppercase">
              Delivery partner portal
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back<span className="text-emerald-300">.</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Sign in with your partner account to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4.5 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8"
          >
            {/* Subtle glass highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-200/40 to-transparent" />

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="delivery-email"
                  className="mb-2 block text-sm font-medium text-white/75"
                >
                  Email address
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 transition-colors focus-within:border-emerald-300/50 focus-within:bg-emerald-300/[0.035]">
                  <Mail className="size-4 shrink-0 text-white/35 transition-colors group-focus-within:text-emerald-300" />

                  <input
                    id="delivery-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@example.com"
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-white/25"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="delivery-password"
                  className="mb-2 block text-sm font-medium text-white/75"
                >
                  Password
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 transition-colors focus-within:border-emerald-300/50 focus-within:bg-emerald-300/[0.035]">
                  <LockKeyhole className="size-4 shrink-0 text-white/35 transition-colors group-focus-within:text-emerald-300" />

                  <input
                    id="delivery-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-white/25"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-400 to-teal-400 px-5 py-3.5 text-sm font-semibold text-[#032017] shadow-lg shadow-emerald-950/20 transition duration-300 hover:shadow-xl hover:shadow-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  {loading ? "Signing in..." : "Sign in to dashboard"}
                </span>

                {!loading && (
                  <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </div>

            <div className="mt-6 flex items-start gap-2.5 border-t border-white/8 pt-5">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-300/70" />
              <p className="text-xs leading-5 text-white/35">
                Secure partner access. Your account credentials are used to
                authenticate your delivery workspace.
              </p>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-white/30">
            Need help accessing your account? Contact your Grovia administrator.
          </p>
        </section>
      </div>

      <style>{`
        @keyframes loginReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
