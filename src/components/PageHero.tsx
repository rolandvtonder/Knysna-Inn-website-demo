import {useEffect, useRef, useState} from 'react';
import {media, type Line} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Headline} from './Headline';

const SLIDE_MS = 6500;

type Props = {
  kicker: string;
  lines: Line[];
  body: string;
  images: string[];
  alt: string;
  /** "full" fills the screen; "short" is for utility pages like Contact. */
  size?: 'full' | 'short';
};

/**
 * Every page opens on this: a slow crossfading drift through the inn's own
 * photos, under the big serif headline. As you scroll on, the picture blurs,
 * dims and shrinks back — the camera pulling away — as the page transition.
 */
export function PageHero({kicker, lines, body, images, alt, size = 'full'}: Props) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // The outgoing photo stays fully opaque underneath while the next fades in
  // on top, so the crossfade never dips through to the dark background.
  const [{index, prev}, setSlide] = useState({index: 0, prev: -1});
  const rotating = images.length > 1 && !reduced;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => setSlide((s) => ({index: (s.index + 1) % images.length, prev: s.index})), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [rotating, images.length]);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        const r = el.getBoundingClientRect();
        const h = r.height;
        const p = clamp(-r.top / h);
        s.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 16).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return (
    <section
      ref={root}
      className={`relative overflow-hidden bg-ink ${size === 'full' ? 'h-svh min-h-[640px]' : 'h-[78svh] min-h-[560px]'}`}
    >
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <div role="img" aria-label={alt} className="absolute inset-0 isolate">
          {images.map((src, i) => (
            <div
              key={src}
              aria-hidden
              className={`kb absolute inset-0 overflow-hidden ${i === index ? 'on z-[2]' : i === prev ? 'prev z-[1]' : ''}`}
            >
              <img
                src={media(src)}
                alt=""
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </div>
          ))}
        </div>
        {/* Two scrims: one left for the headline, one low for the paragraph and buttons */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_21_34/0.78),rgb(15_21_34/0.35)_55%,rgb(15_21_34/0.1))]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_21_34/0.6),transparent_45%)]" />

        <div className="absolute inset-0 mx-auto flex max-w-[1680px] flex-col px-5 pt-[clamp(104px,15vh,150px)] md:px-12">
          <p className="caps flex items-center gap-3 text-white/90">
            <span aria-hidden className="h-px w-8 bg-copper" />
            {kicker}
          </p>
          <h1
            className={`display mt-5 text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)] ${
              size === 'full' ? 'text-[clamp(46px,9vw,170px)]' : 'text-[clamp(46px,8vw,150px)]'
            }`}
          >
            <Headline lines={lines} indent />
          </h1>
          <p className="mt-8 max-w-[34ch] text-[17px] leading-relaxed text-white/90 md:ml-[clamp(0px,16vw,300px)] md:text-[18px]">{body}</p>
        </div>
      </div>
    </section>
  );
}
