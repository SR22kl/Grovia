import { ArrowRight, Check, Mail, Sparkles } from "lucide-react";

const NewsLetter = () => {
  return (
    <section className="relative mx-auto my-10 w-full max-w-7xl overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 px-6 py-12 shadow-sm sm:px-10 lg:px-16">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-green-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-green-50 blur-3xl" />

      {/* Decorative dots */}
      <div className="pointer-events-none absolute right-12 top-10 hidden size-3 animate-pulse rounded-full bg-green-300 sm:block" />
      <div className="pointer-events-none absolute bottom-12 right-1/4 hidden size-2 animate-ping rounded-full bg-green-300 sm:block" />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        {/* Content */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-900">
            <Sparkles className="size-3.5 animate-pulse" />
            Fresh updates, straight to your inbox
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Fresh deals.
            <br />
            <span className="text-green-700">Fresh in your inbox.</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Subscribe to Grovia and be the first to know about exclusive offers,
            new arrivals, seasonal picks, and grocery deals.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="group relative flex flex-1 items-center rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 focus-within:border-green-500 focus-within:shadow-md focus-within:ring-4 focus-within:ring-green-100">
              <Mail className="ml-4 size-5 shrink-0 text-gray-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-green-600" />

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm  hover:bg-green-800 hover:shadow-md active:scale-95"
            >
              Subscribe
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          {/* Trust text */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-green-600" />
              No spam
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-green-600" />
              Exclusive offers
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-green-600" />
              Unsubscribe anytime
            </span>
          </div>
        </div>

        {/* Mail Illustration */}
        <div className="relative mx-auto hidden size-52 lg:flex">
          {/* Glow */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-green-200/40 blur-3xl" />

          {/* Outer Circle */}
          <div className="relative flex size-52 items-center justify-center rounded-full border border-green-100 bg-white shadow-lg">
            {/* Floating dot */}
            <div className="absolute -right-1 top-8 size-5 animate-bounce rounded-full bg-green-200" />

            {/* Envelope */}
            <div className="flex size-28 rotate-[-4deg] items-center justify-center rounded-3xl border border-gray-100 bg-gray-50 shadow-md transition-transform duration-500 hover:rotate-0">
              <Mail className="size-14 text-green-700" strokeWidth={1.5} />
            </div>

            {/* Sparkle */}
            <Sparkles className="absolute bottom-8 left-7 size-6 animate-pulse text-green-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
