import type {CSSProperties} from 'react';
import {explore} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {Headline} from '../components/Headline';

export function Explore() {
  const root = useReveals<HTMLDivElement>();

  return (
    <div ref={root}>
      <PageHero {...explore.hero} />

      <section className="mx-auto max-w-[1680px] px-5 section-y md:px-12" aria-labelledby="places-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="caps text-copper-deep" data-reveal>
              Nearby
            </p>
            <h2 id="places-title" className="display mt-4 text-[clamp(40px,5.6vw,96px)] text-navy" data-reveal>
              <Headline lines={[{t: 'Lagoon, Heads'}, {t: '& forest.', i: true}]} />
            </h2>
          </div>
          <p className="caps max-w-[34ch] text-ink/60" data-reveal>
            Times are approximate, from our front gate.
          </p>
        </div>

        <ol className="mt-10 md:mt-12 border-t border-navy/20">
          {explore.places.map((p, i) => (
            <li
              key={p.name}
              className="group relative isolate grid gap-3 overflow-hidden border-b border-navy/20 py-6 md:grid-cols-[80px_1.1fr_1.2fr_200px] md:items-baseline md:gap-8 md:py-8"
              data-reveal
              style={{'--d': `${(i % 4) * 0.05}s`} as CSSProperties}
            >
              {/* Copper tide that rises behind the row on hover */}
              <span aria-hidden className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-copper/25 transition-transform duration-700 ease-silk group-hover:scale-y-100" />
              <span className="caps text-copper-deep">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="display text-[clamp(34px,3.4vw,58px)] text-navy">{p.name}</h3>
                <p className="caps mt-2 text-ink/60">{p.kind}</p>
              </div>
              <p className="max-w-[46ch] text-ink/80">{p.body}</p>
              <p className="caps text-navy md:text-right">{p.time}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-navy text-paper" aria-labelledby="getting-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 section-y md:grid-cols-[0.9fr_1.1fr] md:px-12">
          <div>
            <p className="caps text-copper" data-reveal>
              Getting here
            </p>
            <h2 id="getting-title" className="display mt-4 text-[clamp(40px,5.6vw,96px)]" data-reveal>
              <Headline lines={[{t: 'On the N2,'}, {t: 'at our door.', i: true}]} />
            </h2>
          </div>
          <dl className="grid gap-8">
            {explore.getting.map(([k, v], i) => (
              <div key={k} className="border-t border-paper/20 pt-5" data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties}>
                <dt className="caps text-copper">{k}</dt>
                <dd className="mt-2 max-w-[52ch] text-paper/85">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
