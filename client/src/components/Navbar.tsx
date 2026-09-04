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

const Navbar = () => {
  const user: any = {
    name: "John Doe",
    email: "johndoe@example.com",
    isAdmin: true,
  }

  const { cartCount, setIsCartOpen } = {
    cartCount: 5,
    setIsCartOpen: (_data: any) => {},
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-app-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-beween h-16 gap-4">
          {/* logo */}
          <Link
            to={"/"}
            className="flex items-center gap-2 text-[22px] font-medium shrink-0"
          >
            <BikeIcon className="text-green-950 size={24}" />{" "}
            <span className="text-green-900">Grovia</span>
          </Link>
          <div className="w-full flex items-center justify-end gap-4 lg:gap-10 ">
            {/* NavLinks-Desktop */}
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-800">
              <Link
                to={"/"}
                className="relative hover:text-green-900 transition
                            after:absolute after:left-0 after:bottom-0
                            after:h-0.5 after:w-0 after:bg-green-700
                            after:transition-all after:duration-300
                            hover:after:w-full"
              >
                Home
              </Link>
              <Link
                to={"/products"}
                className="relative hover:text-green-900 transition
                            after:absolute after:left-0 after:bottom-0
                            after:h-0.5 after:w-0 after:bg-green-700
                            after:transition-all after:duration-300
                            hover:after:w-full"
              >
                Products
              </Link>
              <Link
                to={"/deals"}
                className="relative text-orange-500 hover:text-orange-600 transition
                            after:absolute after:left-0 after:bottom-0
                            after:h-0.5 after:w-0 after:bg-orange-500
                            after:transition-all after:duration-300
                            hover:after:w-full"
              >
                Deals
              </Link>
            </div>
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex flex-1 max-w-md"
            >
              <div
                className="
                group relative w-full
                flex items-center
                rounded-full
                border border-green-200
                bg-white
                shadow-sm
                transition-all duration-300
                focus-within:border-green-600
                focus-within:ring-4
                focus-within:ring-green-100
                focus-within:shadow-md
              "
              >
                <SearchIcon
                  className="
                  pointer-events-none
                  absolute left-3
                  h-5 w-5
                  text-gray-400
                  transition-colors duration-300
                  group-focus-within:text-green-700
                "
                />

                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      navigate(`/search?q=${searchQuery}`);
                    }
                  }}
                  className="
                  w-full
                  rounded-full
                  bg-transparent
                  py-2.5
                  pl-10
                  pr-12
                  text-sm
                  text-gray-700
                  placeholder:text-gray-400
                  outline-none
                "
                />
              </div>
            </form>
            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                className="relative p-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartIcon className="size-6 text-zinc-900" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-1 text-[11px] bg-app-orange text-white size-4 flex-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1 p-2"
                  >
                    <div className="size-7 rounded-full bg-green-900 text-white flex-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {/* <ChevronDownIcon className="size-3 text-zinc-500" /> */}
                  </button>
                ) : (
                  <div className="flex-center gap-2">
                    <Link
                      to="/login"
                      className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-app-green via-emerald-800 to-app-green rounded-full transition-colors"
                    >
                      <UserIcon size={16} /> Sign In
                    </Link>
                    {userMenuOpen ? (
                      <XIcon
                        className="md:hidden"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      />
                    ) : (
                      <MenuIcon
                        className="md:hidden"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      />
                    )}
                  </div>
                )}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                      {user && (
                        <>
                          <div className="px-4 py-2 border-b border-app-border">
                            <p className="text-sm font-medium text-zinc-800">
                              {user.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {user.email}
                            </p>
                          </div>
                        </>
                      )}

                      <div
                        onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-2 cursor-pointer"
                      >
                        {!user && (
                          <Link to="/login" className="dropdown-link">
                            <UserIcon size={16} />
                            Sign In
                          </Link>
                        )}
                        {user && (
                          <Link to="/orders" className="dropdown-link">
                            <PackageIcon size={16} />
                            My Orders
                          </Link>
                        )}
                        {user && (
                          <Link to="/addresses" className="dropdown-link">
                            <MapPinIcon size={16} />
                            Addresses
                          </Link>
                        )}

                        <Link
                          to="/products"
                          className="dropdown-link md:hidden"
                        >
                          <ArrowUpRightIcon size={16} />
                          Products
                        </Link>

                        <Link to="/deals" className="dropdown-link md:hidden">
                          <TicketIcon size={16} /> Deals
                        </Link>
                        {user?.isAdmin && (
                          <Link to="/admin/products" className="dropdown-link">
                            <ShieldIcon
                              className="text-app-orange-dark"
                              size={16}
                            />
                            <span className="text-app-orange-dark">
                              Admin Panel
                            </span>
                          </Link>
                        )}
                        {user && (
                          <div className="border-t border-app-border pt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error transition-all hover:scale-105 duration-300 ease-in-out"
                            >
                              <LogOutIcon size={16} />
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
