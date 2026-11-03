import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {Mail, MessageCircle, Phone} from 'lucide-react';
import {contact, routes} from '../content';
import {lockScroll} from '../lib/scroll';
import {Link} from './Link';

/**
 * The menu: three slabs wipe in from the right one after another (navy,
 * copper, paper); the paper one stays and holds the items. Hovering an item
 * ripples it like light on the lagoon — an SVG turbulence + displacement
 * filter whose strength and phase are animated per frame.
 */
export function Menu({open, path, onClose}: {open: boolean; path: string; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 9).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    lockScroll(true);
    // Focus lands on the first item once the paper slab has arrived.
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(40vw,540px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: navy → copper → paper, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 overflow-hidden ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away, with a scrim so the page behind reads as dismissed */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-navy')} style={delay(0)} />
      <div className={slab('bg-copper')} style={delay(1)} />
      <nav className={slab('flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-28 pb-8 text-ink md:px-10')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {routes.map((r, i) => {
            const current = r.path === path;
            return (
              <li
                key={r.path}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'} as CSSProperties}
              >
                <Link
                  ref={i === 0 ? first : undefined}
                  href={r.path}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={(e) => e.currentTarget.matches(':focus-visible') && setHover(i)}
                  onClick={onClose}
                  className={`display relative inline-block py-1 text-[clamp(36px,3vw,52px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  }`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {current ? <span className="it">{r.label}</span> : r.label}
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-ink/55">0{i + 1}</sup>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <p className="caps text-ink/60">
            {contact.street}, {contact.town}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <a href={contact.phoneHref} className="caps inline-flex min-h-11 items-center gap-2 text-ink hover:text-copper-deep">
              <Phone aria-hidden size={15} strokeWidth={1.6} /> Call
            </a>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="caps inline-flex min-h-11 items-center gap-2 text-ink hover:text-copper-deep">
              <MessageCircle aria-hidden size={15} strokeWidth={1.6} /> WhatsApp
            </a>
            <a href={`mailto:${contact.email}`} className="caps inline-flex min-h-11 items-center gap-2 text-ink hover:text-copper-deep">
              <Mail aria-hidden size={15} strokeWidth={1.6} /> Email
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
