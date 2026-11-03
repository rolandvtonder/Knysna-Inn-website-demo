import {useEffect, useRef} from 'react';
import {brand} from '../content';
import {Link} from './Link';

/**
 * Fixed chrome over every page: the wordmark (difference-blended so it reads
 * over photos and paper alike), the menu toggle and the booking button.
 */
export function Header({menuOpen, onMenu, path}: {menuOpen: boolean; onMenu: () => void; path: string}) {
  const button = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Hand focus back to the toggle when the menu closes from inside it.
  useEffect(() => {
    if (wasOpen.current && !menuOpen) {
      const active = document.activeElement;
      if (!active || active === document.body || active.closest('#site-menu')) button.current?.focus({preventScroll: true});
    }
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="caps fixed top-3 left-3 z-[80] -translate-y-20 bg-copper px-4 py-3 text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <Link
        href="/"
        aria-label={`${brand.name} — home`}
        className="display absolute top-5 left-5 z-[55] flex min-h-11 items-center text-[26px] tracking-[0.12em] text-white mix-blend-difference md:top-7 md:left-12"
      >
        Knysna <span className="it ml-[0.3em] tracking-normal">Inn</span>
      </Link>

      <button
        ref={button}
        type="button"
        onClick={onMenu}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        className={`caps fixed top-4 right-4 z-[55] flex min-h-12 items-center gap-4 px-6 backdrop-blur-md transition-colors duration-500 md:top-6 md:right-8 ${
          menuOpen ? 'bg-ink text-paper' : 'bg-navy/75 text-paper ring-1 ring-paper/20 hover:bg-navy'
        }`}
      >
        {menuOpen ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${menuOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      {path !== '/contact' && (
        <Link
          href="/contact"
          className={`caps fixed right-4 bottom-4 z-[55] flex min-h-12 items-center px-7 shadow-[0_10px_30px_rgb(15_21_34/0.25)] transition-[background-color,opacity,translate] duration-500 md:right-8 md:bottom-6 ${
            menuOpen ? 'pointer-events-none translate-y-4 bg-copper text-ink opacity-0' : 'bg-copper text-ink hover:bg-paper'
          }`}
        >
          Book your <em className="ml-[0.4em] font-display text-[17px] tracking-[0.02em] normal-case">stay</em>
        </Link>
      )}
    </>
  );
}
