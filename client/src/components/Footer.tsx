import { ArrowUp, BikeIcon, Mail, MapPin, Phone } from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Shop",
      links: [
        "All Products",
        "Fresh Produce",
        "Dairy & Eggs",
        "Bakery",
        "Snacks",
      ],
    },
    {
      title: "Quick Links",
      links: ["Home", "About Us", "Offers", "Contact Us", "FAQs"],
    },
    {
      title: "Customer Care",
      links: [
        "My Account",
        "Track Order",
        "Shipping & Delivery",
        "Returns",
        "Help Center",
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      label: "Instagram",
    },
    {
      icon: FaFacebookF,
      label: "Facebook",
    },
    {
      icon: FaXTwitter,
      label: "X",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-emerald-950 text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-96 rounded-full bg-emerald-800/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-green-900/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 sm:px-10 lg:px-16">
        {/* Main Footer */}
        <div className="grid gap-12 pb-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            {/* Logo */}
            <a href="/" className="group inline-flex items-center gap-2">
              <div
                className="
                  flex size-10 items-center justify-center
                  rounded-xl bg-emerald-400
                  text-emerald-950
                  shadow-lg shadow-emerald-950/30
                  transition-all duration-300
                  group-hover:-translate-y-1
                  group-hover:rotate-3
                  group-hover:shadow-emerald-400/20
                "
              >
                <BikeIcon className="size-5" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Gro<span className="text-emerald-400">via</span>
              </span>
            </a>

            <p className="mt-5 text-sm leading-6 text-emerald-100/60">
              Fresh groceries, everyday essentials, and everything you need
              delivered right to your doorstep.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-3">
              <a
                href="#"
                className="
                  group flex items-center gap-3
                  text-sm text-emerald-100/60
                  transition-colors duration-300
                  hover:text-emerald-300
                "
              >
                <span
                  className="
                    flex size-8 items-center justify-center
                    rounded-lg bg-emerald-900/80
                    transition-all duration-300
                    group-hover:bg-emerald-800
                  "
                >
                  <MapPin className="size-4 text-emerald-400" />
                </span>
                Pune, Maharashtra, India
              </a>

              <a
                href="tel:+910000000000"
                className="
                  group flex items-center gap-3
                  text-sm text-emerald-100/60
                  transition-colors duration-300
                  hover:text-emerald-300
                "
              >
                <span
                  className="
                    flex size-8 items-center justify-center
                    rounded-lg bg-emerald-900/80
                    transition-all duration-300
                    group-hover:bg-emerald-800
                  "
                >
                  <Phone className="size-4 text-emerald-400" />
                </span>
                +91 00000 00000
              </a>

              <a
                href="mailto:hello@grovia.com"
                className="
                  group flex items-center gap-3
                  text-sm text-emerald-100/60
                  transition-colors duration-300
                  hover:text-emerald-300
                "
              >
                <span
                  className="
                    flex size-8 items-center justify-center
                    rounded-lg bg-emerald-900/80
                    transition-all duration-300
                    group-hover:bg-emerald-800
                  "
                >
                  <Mail className="size-4 text-emerald-400" />
                </span>
                hello@grovia.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-white">
                  {section.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="
                          group relative inline-block
                          text-sm text-emerald-100/60
                          transition-colors duration-300
                          hover:text-emerald-300
                        "
                      >
                        {link}

                        {/* Animated underline */}
                        <span
                          className="
                            absolute -bottom-1 left-0
                            h-px w-0
                            bg-emerald-400
                            transition-all duration-300
                            group-hover:w-full
                          "
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-emerald-800/60" />

        {/* Bottom section */}
        <div
          className="
            flex flex-col gap-5
            py-6
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          {/* Copyright */}
          <p className="text-xs text-emerald-100/40">
            © {currentYear} Grovia. All rights reserved.
          </p>

          {/* Policies */}
          <div className="flex flex-wrap gap-5 text-xs text-emerald-100/40">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-emerald-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition-colors duration-300 hover:text-emerald-300"
            >
              Terms & Conditions
            </a>

            <a
              href="#"
              className="transition-colors duration-300 hover:text-emerald-300"
            >
              Cookie Policy
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="
                  group flex size-9 items-center justify-center
                  rounded-full
                  border border-emerald-800
                  bg-emerald-900/60
                  text-emerald-100/50
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-emerald-400/50
                  hover:bg-emerald-800
                  hover:text-emerald-300
                "
              >
                <Icon
                  className="
                    size-4
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                />
              </a>
            ))}

            {/* Back to top */}
            <a
              href="#"
              aria-label="Back to top"
              className="
                group ml-2 flex size-9 items-center justify-center
                rounded-full
                bg-emerald-400
                text-emerald-950
                shadow-lg shadow-emerald-950/30
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-emerald-300
                hover:shadow-emerald-400/20
              "
            >
              <ArrowUp
                className="
                  size-4
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
