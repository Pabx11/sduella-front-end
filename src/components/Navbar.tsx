"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, User as UserIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import type { User } from "../types";
import Link from "next/link";

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

interface DropdownLink {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  path: string;
  children?: DropdownLink[];
}

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Jobs",
    path: "/jobs",
    children: [
      { label: "All Jobs", path: "/jobs" },
      { label: "Internships", path: "/internships" },
      { label: "Learnerships", path: "/learnerships" },
      { label: "Apprenticeships", path: "/apprenticeships" },
    ],
  },
  {
    label: "Study Funding",
    path: "/bursaries",
    children: [
      { label: "All Study Funding", path: "/bursaries" },
      { label: "Bursaries", path: "/bursaries/south-africa" },
      { label: "Scholarships", path: "/scholarships" },
      { label: "Student Grants", path: "/student-funding" },
    ],
  },
  {
    label: "Business Funding",
    path: "/business-funding",
    children: [
      { label: "All Business Funding", path: "/business-funding" },
      { label: "Startup Funding", path: "/startup-funding" },
      { label: "Business Grants", path: "/business-grants" },
      {
        label: "Growth & Enterprise",
        path: "/business-funding?type=business_funding",
      },
    ],
  },
  { label: "About", path: "/about" },
];

export default function Navbar({ user, onOpenAuth, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname() || "/";

  const isActive = (item: NavItem) => {
    if (item.path.includes("#")) {
      return pathname === "/";
    }
    return (
      pathname === item.path ||
      (item.path !== "/" && pathname.startsWith(`${item.path}/`))
    );
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="fixed inset-x-0 top-0 h-[62px] bg-white border-b border-grey-200 z-[300] flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-8">
        <a
          href="/"
          className="flex items-center cursor-pointer"
          aria-label="Sduella home"
        >
          <img
            className="h-50 w-100"
            src="/pictures/Sduella Modern Logo (1).svg"
            alt="SDUELLA Logo"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-5 list-none h-[62px]">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative h-full flex items-center"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              {item.children ? (
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === item.label}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label,
                    )
                  }
                  className={cn(
                    "h-full inline-flex items-center gap-1.5 font-syne text-[13px] font-semibold text-grey-600 hover:text-black transition-colors tracking-wide",
                    isActive(item) && "text-black",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      openDropdown === item.label && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.path}
                  className={cn(
                    "font-syne text-[13px] font-semibold text-grey-600 hover:text-black transition-colors tracking-wide",
                    isActive(item) && "text-black",
                  )}
                >
                  {item.label}
                </Link>
              )}

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-2 min-w-[240px]"
                  >
                    <div
                      role="menu"
                      className="bg-white border border-grey-200 p-2 shadow-[0_18px_45px_rgba(17,17,17,0.14)]"
                    >
                      <div className="px-3 pt-2 pb-2 font-syne text-[9px] font-bold uppercase tracking-[0.18em] text-grey-400">
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <a
                          key={`${item.label}-${child.label}`}
                          href={child.path}
                          role="menuitem"
                          onClick={closeMenus}
                          className="flex items-center justify-between px-3 py-2.5 font-syne text-[12px] font-semibold text-grey-600 hover:bg-off-white hover:text-black transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        {user ? (
          <>
            <a
              href="/dashboard"
              className="font-syne text-xs font-bold text-grey-600 hover:text-black"
            >
              {user.name.split(" ")[0]}
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 border border-grey-200 font-syne text-xs font-bold hover:border-black"
            >
              Log out
            </button>
          </>
        ) : (
          <span className="gap-5 flex flex-row max-md:flex-column items-center content-center">
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-5 py-2.5 bg-black text-white font-syne text-md flex flex-row gap-3 items-center"
            >
              <UserIcon size={16} /> Sign in / Sign up
            </button>
            <Link
              href={"/contact"}
              className={
                "font-syne text-[13px] font-semibold text-grey-600 hover:text-black transition-colors tracking-wide text-black"
              }
            >
              I want to list
            </Link>
          </span>
        )}
      </div>

      <button
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        className="lg:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[62px] inset-x-0 max-h-[calc(100dvh-62px)] overflow-y-auto bg-white border-b border-grey-200 px-4 py-3 sm:p-6 lg:hidden"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-grey-100 last:border-0"
                >
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={openDropdown === item.label}
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label,
                          )
                        }
                        className="w-full py-4 flex items-center justify-between font-syne text-lg font-bold text-black"
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={cn(
                            "transition-transform",
                            openDropdown === item.label && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pb-4 pl-4 border-l-2 border-blue">
                              {item.children.map((child) => (
                                <a
                                  key={`${item.label}-mobile-${child.label}`}
                                  href={child.path}
                                  onClick={closeMenus}
                                  className="py-2 font-syne text-sm font-semibold text-grey-600 hover:text-black"
                                >
                                  {child.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.path}
                      onClick={closeMenus}
                      className="block py-4 font-syne text-lg font-bold text-black"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-3 border-t border-grey-200">
                {user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="/dashboard"
                      onClick={closeMenus}
                      className="py-3 text-center bg-black text-white font-syne text-sm font-bold"
                    >
                      My account
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        closeMenus();
                      }}
                      className="py-3 border border-grey-200 font-syne text-sm font-bold"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <span className="gap-5 flex flex-row max-md:flex-column items-center content-center">
                    <button
                      type="button"
                      onClick={onOpenAuth}
                      className="px-5 py-2.5 bg-black text-white font-syne text-md flex flex-row gap-3 items-center"
                    >
                      <UserIcon size={16} /> Sign in / Sign up
                    </button>
                    <Link
                      href={"/contact"}
                      className={
                        "font-syne text-[13px] font-semibold text-grey-600 hover:text-black transition-colors tracking-wide text-black"
                      }
                    >
                      I want to list
                    </Link>
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
