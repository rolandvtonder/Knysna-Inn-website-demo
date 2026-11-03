import type {CSSProperties} from 'react';
import {usePhase} from '../lib/router';
import {brand} from '../content';

/**
 * The page transition: the menu's three slabs at full width. On "cover" they
 * wipe in from the right one after another (copper, paper, navy); the new
 * page is swapped in underneath; on "reveal" they carry on out to the left
 * in reverse. Back at "idle" they snap offscreen right with no transition.
 */
export function PageWipe() {
  const phase = usePhase();

  const slab = (k: number, extra: string) => {
    const pos = phase === 'cover' ? 'translate-x-0' : phase === 'reveal' ? '-translate-x-[101%]' : 'translate-x-[101%]';
    const style: CSSProperties =
      phase === 'idle'
        ? {transition: 'none'}
        : {transitionDelay: `${phase === 'cover' ? k * 0.09 : (2 - k) * 0.09}s`};
    return {className: `absolute inset-0 transition-transform duration-[700ms] ease-wipe ${pos} ${extra}`, style};
  };

  return (
    <div aria-hidden className={`fixed inset-0 z-[70] overflow-hidden ${phase === 'idle' ? 'pointer-events-none' : ''}`}>
      <div {...slab(0, 'bg-copper')} />
      <div {...slab(1, 'bg-paper')} />
      <div {...slab(2, 'grid place-items-center bg-navy')}>
        <span className="display text-[clamp(40px,6vw,96px)] text-copper">
          <span className="it">{brand.name}</span>
        </span>
      </div>
    </div>
  );
}
