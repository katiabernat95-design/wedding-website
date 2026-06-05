import { useState, useCallback, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "../config";

interface NavLinkConfig {
  to: string;
  key: "home" | "schedule" | "party" | "photos" | "faq" | "rsvp";
  end?: boolean;
}

const links: NavLinkConfig[] = [
  { to: "/", key: "home", end: true },
  { to: "/schedule", key: "schedule" },
  { to: "/party", key: "party" },
  { to: "/photos", key: "photos" },
  { to: "/faq", key: "faq" },
  { to: "/rsvp", key: "rsvp" },
];

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative w-5 h-4 flex flex-col justify-between">
      <span
        className={
          "block h-0.5 w-full bg-current origin-center transition-transform duration-300 " +
          (open ? "translate-y-[7px] rotate-45" : "")
        }
      />
      <span
        className={
          "block h-0.5 w-full bg-current transition-opacity duration-300 " +
          (open ? "opacity-0" : "")
        }
      />
      <span
        className={
          "block h-0.5 w-full bg-current origin-center transition-transform duration-300 " +
          (open ? "-translate-y-[7px] -rotate-45" : "")
        }
      />
    </span>
  );
}

export function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Close drawer whenever the route changes
  useEffect(() => { close(); }, [location.pathname, close]);

  return (
    <>
      {/* Sticky header bar */}
      <header className="sticky top-0 z-40 bg-[var(--color-ivory)]/90 backdrop-blur border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between gap-3">
          {/* Couple name as brand */}
          <NavLink
            to="/"
            onClick={close}
            className="font-serif text-lg leading-none text-[var(--color-ink)] select-none"
          >
            {wedding.bride} <span className="text-[var(--color-sage-600)]">&</span> {wedding.groom}
          </NavLink>

          {/* Burger button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="p-2 -mr-1 text-[var(--color-ink)] rounded-lg hover:bg-[var(--color-line)] transition-colors"
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </header>

      {/* Fullscreen overlay drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-[var(--color-ink)]/40 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 max-w-[85vw] bg-[var(--color-ivory)] flex flex-col shadow-2xl"
              aria-label="Navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-line)]">
                <span className="font-serif text-lg text-[var(--color-ink)]">
                  {wedding.bride} <span className="text-[var(--color-sage-600)]">&</span> {wedding.groom}
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="p-2 -mr-1 text-[var(--color-ink)] rounded-lg hover:bg-[var(--color-line)] transition-colors"
                >
                  <BurgerIcon open={true} />
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col flex-1 px-4 py-6 gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.end}
                      onClick={close}
                      className={({ isActive }) =>
                        [
                          "flex items-center px-4 py-3.5 rounded-xl text-base font-medium tracking-wide transition-colors",
                          isActive
                            ? "bg-[var(--color-sage-600)]/10 text-[var(--color-sage-700)]"
                            : "text-[var(--color-ink-soft)] hover:bg-[var(--color-line)] hover:text-[var(--color-ink)]",
                        ].join(" ")
                      }
                    >
                      {t(`nav.${l.key}`)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

    </>
  );
}
