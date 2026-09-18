import {
  ArrowUpRightIcon,
  BikeIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  TicketIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const user: any = {
    name: "John Doe",
    email: "johndoe@example.com",
    isAdmin: true,
  };

  const { cartCount, setIsCartOpen } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="sticky top-0 z-50 px-4 sm:px-5 lg:px-6">
        <nav
          className="
            group relative isolate
            mx-auto max-w-7xl
            overflow-visible
            rounded-2xl
            border border-white/10
            bg-[#061f17]/80
            shadow-2xl shadow-black/20
            backdrop-blur-2xl
            animate-[navbarEnter_.5s_cubic-bezier(.16,1,.3,1)]
          "
        >
          {/* =====================================================
              GLASS SHINE
          ===================================================== */}

          <div
            className="
              pointer-events-none absolute inset-y-0 left-[-120%]
              z-30
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

          {/* Top glass highlight */}
          <div
            className="
              pointer-events-none absolute
              inset-x-6 top-0
              h-px
              bg-linear-to-r
              from-transparent
              via-white/15
              to-transparent
            "
          />

          {/* =====================================================
              NAV CONTENT
          ===================================================== */}

          <div className="relative z-10 flex h-17 items-center gap-3 px-3 sm:px-5 lg:px-6">
            {/* ===================================================
                LOGO
            =================================================== */}

            <Link
              to="/"
              className="
                group/logo
                flex shrink-0
                items-center gap-2.5
                rounded-xl
                px-1.5 py-1
                transition-all duration-300
              "
            >
              <div
                className="
                  relative flex size-9
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  border border-emerald-400/20
                  bg-emerald-400/8
                  shadow-lg shadow-emerald-950/10
                  transition-all duration-300
                  group-hover/logo:scale-105
                  group-hover/logo:border-emerald-400/35
                  group-hover/logo:bg-emerald-400/13
                "
              >
                <BikeIcon
                  className="
                    size-5
                    text-emerald-300
                    transition-transform
                    duration-500
                    group-hover/logo:translate-x-0.5
                    group-hover/logo:rotate-[-4deg]
                  "
                />

                <span
                  className="
                    pointer-events-none absolute
                    inset-y-0 -left-full
                    w-1/2
                    skew-x-[-18deg]
                    bg-linear-to-r
                    from-transparent
                    via-white/15
                    to-transparent
                    transition-all duration-700
                    group-hover/logo:left-[150%]
                  "
                />
              </div>

              <span className="text-[20px] font-bold tracking-tight text-white">
                Grovia
              </span>
            </Link>

            {/* ===================================================
                DESKTOP NAVIGATION
            =================================================== */}

            <div className="ml-5 hidden items-center gap-1 md:flex">
              <Link
                to="/"
                className="
                  group/nav
                  relative rounded-xl
                  px-3.5 py-2.5
                  text-xs font-semibold
                  text-white/45
                  transition-all duration-300
                  hover:bg-white/5
                  hover:text-white/90
                "
              >
                Home
                <span
                  className="
                    absolute bottom-1.5 left-1/2
                    h-0.5 w-0
                    -translate-x-1/2
                    rounded-full
                    bg-emerald-400
                    shadow-lg shadow-emerald-400/50
                    transition-all duration-300
                    group-hover/nav:w-4
                  "
                />
              </Link>

              <Link
                to="/products"
                className="
                  group/nav
                  relative rounded-xl
                  px-3.5 py-2.5
                  text-xs font-semibold
                  text-white/45
                  transition-all duration-300
                  hover:bg-white/5
                  hover:text-white/90
                "
              >
                Products
                <span
                  className="
                    absolute bottom-1.5 left-1/2
                    h-0.5 w-0
                    -translate-x-1/2
                    rounded-full
                    bg-emerald-400
                    shadow-lg shadow-emerald-400/50
                    transition-all duration-300
                    group-hover/nav:w-4
                  "
                />
              </Link>

              <Link
                to="/deals"
                className="
                  group/deals
                  relative flex items-center gap-1.5
                  rounded-xl
                  px-3.5 py-2.5
                  text-xs font-semibold
                  text-orange-300/80
                  transition-all duration-300
                  hover:bg-orange-300/6
                  hover:text-orange-300
                "
              >
                <span
                  className="
                    size-1.5 rounded-full
                    bg-orange-300
                    shadow-sm shadow-orange-300
                    animate-pulse
                  "
                />
                Deals
                <span
                  className="
                    absolute bottom-1.5 left-1/2
                    h-0.5 w-0
                    -translate-x-1/2
                    rounded-full
                    bg-orange-300
                    transition-all duration-300
                    group-hover/deals:w-4
                  "
                />
              </Link>
            </div>

            {/* ===================================================
                SEARCH
            =================================================== */}

            <form
              onSubmit={handleSearch}
              className="
                ml-auto hidden
                min-w-0 flex-1
                sm:flex
                sm:max-w-75
                lg:max-w-95
              "
            >
              <div
                className="
                  group/search
                  relative flex w-full
                  items-center
                  rounded-xl
                  border border-white/10
                  bg-white/4.5
                  backdrop-blur-xl
                  transition-all duration-300

                  focus-within:border-emerald-400/25
                  focus-within:bg-white/6.5
                  focus-within:shadow-lg
                  focus-within:shadow-emerald-950/20
                "
              >
                <SearchIcon
                  className="
                    pointer-events-none
                    ml-3.5 size-4
                    text-white/25
                    transition-colors duration-300
                    group-focus-within/search:text-emerald-300
                  "
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    min-w-0 w-full
                    bg-transparent
                    px-3 py-2.5
                    text-xs
                    text-white/80
                    outline-none
                    placeholder:text-white/20
                  "
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="
                      mr-2
                      flex size-6
                      items-center justify-center
                      rounded-lg
                      text-white/25
                      transition-colors
                      hover:bg-white/8
                      hover:text-white/60
                    "
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </div>
            </form>

            {/* ===================================================
                RIGHT ACTIONS
            =================================================== */}

            <div className="ml-auto flex items-center gap-1.5 sm:ml-3">
              {/* Cart */}
              <button
                type="button"
                aria-label="Open cart"
                onClick={() => setIsCartOpen(true)}
                className="
                  group/cart
                  relative flex size-10
                  items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/4
                  text-white/45
                  transition-all duration-300

                  hover:-translate-y-0.5
                  hover:border-emerald-400/20
                  hover:bg-emerald-400/[0.07]
                  hover:text-emerald-300
                  active:scale-95
                "
              >
                <ShoppingCartIcon
                  className="
                    size-4.5
                    transition-transform duration-300
                    group-hover/cart:scale-105
                  "
                />

                {cartCount > 0 && (
                  <span
                    className="
                      absolute -right-1 -top-1
                      flex size-4.25
                      items-center justify-center
                      rounded-full
                      border-2 border-[#061f17]
                      bg-orange-400
                      text-[8px]
                      font-bold
                      text-white
                      shadow-lg shadow-orange-950/20
                      animate-[cartBadge_.25s_ease-out]
                    "
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* =================================================
                  USER
              ================================================= */}

              <div className="relative">
                {user ? (
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="
                      group/user
                      flex items-center gap-2
                      rounded-xl
                      border border-white/10
                      bg-white/4
                      px-1.5 py-1.5
                      transition-all duration-300

                      hover:border-white/15
                      hover:bg-white/[0.07]
                    "
                  >
                    <span
                      className="
                        flex size-7
                        items-center justify-center
                        rounded-lg
                        bg-linear-to-br
                        from-emerald-300
                        to-emerald-600
                        text-[11px]
                        font-bold
                        text-[#031c14]
                        shadow-lg
                        shadow-emerald-950/20
                        transition-transform duration-300
                        group-hover/user:scale-105
                      "
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </span>

                    <ChevronDownIcon
                      className={`
                        hidden size-3
                        text-white/25
                        transition-transform
                        duration-300
                        sm:block
                        ${userMenuOpen ? "rotate-180 text-emerald-300" : ""}
                      `}
                    />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className="
                        hidden md:flex
                        items-center gap-2
                        rounded-xl
                        border border-emerald-300/20
                        bg-emerald-400
                        px-4 py-2.5
                        text-xs font-bold
                        text-[#031c14]
                        shadow-lg shadow-emerald-950/20
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-emerald-300
                        active:scale-[0.98]
                      "
                    >
                      <UserIcon className="size-3.5" />
                      Sign In
                    </Link>

                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen((prev) => !prev)}
                      className="
                        flex size-10
                        items-center justify-center
                        rounded-xl
                        border border-white/10
                        bg-white/4
                        text-white/50
                        transition-all duration-300
                        hover:bg-white/8
                        hover:text-white
                        md:hidden
                      "
                    >
                      {mobileMenuOpen ? (
                        <XIcon className="size-5" />
                      ) : (
                        <MenuIcon className="size-5" />
                      )}
                    </button>
                  </div>
                )}

                {/* =================================================
                    USER DROPDOWN
                ================================================= */}

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />

                    <div
                      className="
                        absolute right-0 top-full z-50
                        mt-3 w-64
                        overflow-hidden
                        rounded-2xl
                        border border-white/10
                        bg-[#071f17]/95
                        shadow-2xl
                        shadow-black/40
                        backdrop-blur-2xl
                        animate-[dropdownEnter_.2s_cubic-bezier(.16,1,.3,1)]
                      "
                    >
                      {/* Dropdown glow */}
                      <div
                        className="
                          pointer-events-none absolute
                          -right-16 -top-16
                          size-40
                          rounded-full
                          bg-emerald-400/8
                          blur-[60px]
                        "
                      />

                      {/* User info */}
                      <div className="relative border-b border-white/[0.07] p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex size-10
                              shrink-0
                              items-center justify-center
                              rounded-xl
                              bg-linear-to-br
                              from-emerald-300
                              to-emerald-600
                              text-sm font-bold
                              text-[#031c14]
                            "
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-white/85">
                              {user.name}
                            </p>

                            <p className="mt-0.5 truncate text-[10px] text-white/30">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative p-2">
                        {user && (
                          <>
                            <Link
                              to="/orders"
                              onClick={() => setUserMenuOpen(false)}
                              className="
                                group/item
                                flex items-center gap-3
                                rounded-xl
                                px-3 py-2.5
                                text-xs font-medium
                                text-white/45
                                transition-all duration-200
                                hover:bg-white/5
                                hover:text-white
                              "
                            >
                              <PackageIcon className="size-4 text-white/25 transition-colors group-hover/item:text-emerald-300" />
                              My Orders
                            </Link>

                            <Link
                              to="/addresses"
                              onClick={() => setUserMenuOpen(false)}
                              className="
                                group/item
                                flex items-center gap-3
                                rounded-xl
                                px-3 py-2.5
                                text-xs font-medium
                                text-white/45
                                transition-all duration-200
                                hover:bg-white/5
                                hover:text-white
                              "
                            >
                              <MapPinIcon className="size-4 text-white/25 transition-colors group-hover/item:text-emerald-300" />
                              Addresses
                            </Link>
                          </>
                        )}

                        <Link
                          to="/products"
                          onClick={() => setUserMenuOpen(false)}
                          className="
                            group/item
                            hidden md:flex
                            items-center gap-3
                            rounded-xl
                            px-3 py-2.5
                            text-xs font-medium
                            text-white/45
                            transition-all duration-200
                            hover:bg-white/5
                            hover:text-white
                          "
                        >
                          <ArrowUpRightIcon className="size-4 text-white/25 transition-colors group-hover/item:text-emerald-300" />
                          Products
                        </Link>

                        <Link
                          to="/deals"
                          onClick={() => setUserMenuOpen(false)}
                          className="
                            group/item
                            hidden md:flex
                            items-center gap-3
                            rounded-xl
                            px-3 py-2.5
                            text-xs font-medium
                            text-white/45
                            transition-all duration-200
                            hover:bg-white/5
                            hover:text-white
                          "
                        >
                          <TicketIcon className="size-4 text-orange-300/60 transition-colors group-hover/item:text-orange-300" />
                          Deals
                        </Link>

                        {user?.isAdmin && (
                          <Link
                            to="/admin/products"
                            onClick={() => setUserMenuOpen(false)}
                            className="
                              group/item
                              flex items-center gap-3
                              rounded-xl
                              px-3 py-2.5
                              text-xs font-semibold
                              text-orange-300/70
                              transition-all duration-200
                              hover:bg-orange-300/6
                              hover:text-orange-300
                            "
                          >
                            <ShieldIcon className="size-4" />
                            Admin Panel
                          </Link>
                        )}

                        {user && (
                          <div className="mt-1 border-t border-white/[0.07] pt-1">
                            <button
                              type="button"
                              onClick={handleLogout}
                              className="
                                group/logout
                                flex w-full
                                items-center gap-3
                                rounded-xl
                                px-3 py-2.5
                                text-xs font-medium
                                text-red-300/60
                                transition-all duration-200
                                hover:bg-red-400/6
                                hover:text-red-300
                              "
                            >
                              <LogOutIcon className="size-4 transition-transform duration-200 group-hover/logout:-translate-x-0.5" />
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu toggle when user exists */}
              {user && (
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="
                    flex size-10
                    items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/4
                    text-white/50
                    transition-all duration-300
                    hover:border-white/15
                    hover:bg-white/8
                    hover:text-white
                    md:hidden
                  "
                >
                  {mobileMenuOpen ? (
                    <XIcon className="size-5" />
                  ) : (
                    <MenuIcon className="size-5" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* =====================================================
              MOBILE MENU
          ===================================================== */}

          {mobileMenuOpen && (
            <div
              className="
                relative z-10
                border-t border-white/[0.07]
                px-3 pb-3 pt-3
                animate-[mobileMenuEnter_.25s_cubic-bezier(.16,1,.3,1)]
                md:hidden
              "
            >
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="mb-3">
                <div
                  className="
                    flex items-center
                    rounded-xl
                    border border-white/10
                    bg-white/4
                  "
                >
                  <SearchIcon className="ml-3.5 size-4 text-white/25" />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
                      w-full
                      bg-transparent
                      px-3 py-3
                      text-xs
                      text-white/80
                      outline-none
                      placeholder:text-white/20
                    "
                  />
                </div>
              </form>

              {/* Links */}
              <div className="grid grid-cols-3 gap-2">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="
                    flex items-center justify-center
                    rounded-xl
                    border border-white/[0.07]
                    bg-white/[0.035]
                    px-3 py-3
                    text-[11px] font-semibold
                    text-white/50
                    transition-all duration-300
                    hover:border-emerald-400/20
                    hover:bg-emerald-400/6
                    hover:text-emerald-300
                  "
                >
                  Home
                </Link>

                <Link
                  to="/products"
                  onClick={closeMobileMenu}
                  className="
                    flex items-center justify-center
                    rounded-xl
                    border border-white/[0.07]
                    bg-white/[0.035]
                    px-3 py-3
                    text-[11px] font-semibold
                    text-white/50
                    transition-all duration-300
                    hover:border-emerald-400/20
                    hover:bg-emerald-400/6
                    hover:text-emerald-300
                  "
                >
                  Products
                </Link>

                <Link
                  to="/deals"
                  onClick={closeMobileMenu}
                  className="
                    flex items-center justify-center
                    gap-1.5
                    rounded-xl
                    border border-orange-300/10
                    bg-orange-300/[0.035]
                    px-3 py-3
                    text-[11px] font-semibold
                    text-orange-300/70
                    transition-all duration-300
                    hover:border-orange-300/20
                    hover:bg-orange-300/6
                    hover:text-orange-300
                  "
                >
                  <span className="size-1.5 rounded-full bg-orange-300" />
                  Deals
                </Link>
              </div>

              {/* Mobile sign in */}
              {!user && (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="
                    mt-2
                    flex items-center
                    justify-center gap-2
                    rounded-xl
                    border border-emerald-300/20
                    bg-emerald-400
                    px-4 py-3
                    text-xs font-bold
                    text-[#031c14]
                  "
                >
                  <UserIcon className="size-3.5" />
                  Sign In
                </Link>
              )}
            </div>
          )}

          {/* Bottom edge */}
          <div
            className="
              pointer-events-none absolute
              inset-x-6 bottom-0
              h-px
              bg-linear-to-r
              from-transparent
              via-emerald-400/10
              to-transparent
            "
          />
        </nav>
      </header>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`
        @keyframes navbarEnter {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropdownEnter {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes mobileMenuEnter {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cartBadge {
          from {
            opacity: 0;
            transform: scale(0.5);
          }

          70% {
            transform: scale(1.12);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
