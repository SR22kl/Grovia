import { useState } from "react";
import { heroSectionData } from "../assets/assets";
import { Link } from "react-router-dom";
import { BikeIcon, Key, Loader2Icon, Mail, UserIcon } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and register forms

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => (window.location.href = "/"), 1000);
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
          <img
            src={heroSectionData.hero_image}
            alt="Hero"
            className="absolute inset-0 object-cover h-full bg-center opacity-10"
          />
          <div className="relative z-10 text-center text-white px-12">
            <h2 className="text-4xl font-bold mb-4">Welcome Back To Grovia</h2>
            <p className="text-white/70 font-serif text-xl max-w-sm mx-auto">
              Fresh groceries delivered to your doorstep!
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex-center px-4 py-12 bg-app-cream ">
          <div className="w-full max-w-md">
            {/* form header msg */}
            <div className="text-center mb-8">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 mb-6"
              >
                <BikeIcon className="size-8 text-green-900" />
                <span className="text-2xl font-semibold text-green-900">
                  Grovia
                </span>
              </Link>
              <h1 className="text-2xl font-semibold text-green-900 mb-2">
                {isLogin
                  ? "Login to your account"
                  : "Sign up for a new account"}
              </h1>
              <p className="text-green-900/70 text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  className="text-orange-500 ml-1 font-semibold hover:text-orange-600 hover:underline transition-all duration-300 ease-in-out"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Create new account" : "login here"}
                </button>
              </p>
            </div>

            {/* Login / Register form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <label className="flex flex-col gap-1 text-green-900/70 text-sm font-medium mb-2">
                    Name
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 size-4 text-green-900/70" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full py-3 pl-10 pr-4 border text-sm border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1 text-green-900/70 text-sm font-medium mb-2">
                    Email
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 size-4 text-green-900/70" />
                      <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full py-3 pl-10 pr-4 border text-sm border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1 text-green-900/70 text-sm font-medium mb-2">
                    Password
                    <div className="relative">
                      <Key className="absolute left-3.5 top-1/2 transform -translate-y-1/2 size-4 text-green-900/70" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full py-3 pl-10 pr-4 border text-sm border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                      />
                    </div>
                  </label>
                </>
              )}

              {isLogin && (
                <>
                  <label className="flex flex-col gap-1 text-green-900/70 text-sm font-medium mb-2">
                    Email
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 size-4 text-green-900/70" />
                      <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full py-3 pl-10 pr-4 border text-sm border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1 text-green-900/70 text-sm font-medium mb-2">
                    Password
                    <div className="relative">
                      <Key className="absolute left-3.5 top-1/2 transform -translate-y-1/2 size-4 text-green-900/70" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full py-3 pl-10 pr-4 border text-sm border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                      />
                    </div>
                  </label>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-green-800 text-white font-semibold rounded-xl hover:bg-green-900 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : isLogin ? (
                  "LogIn"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
