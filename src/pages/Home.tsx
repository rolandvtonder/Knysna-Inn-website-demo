import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {ArrowRight} from 'lucide-react';
import {amenities, explore, home, media, units} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {Headline} from '../components/Headline';
import {Icon} from '../components/Icon';
import {Link} from '../components/Link';

export function Home() {
  const root = useReveals<HTMLDivElement>();

  return (
    <div ref={root}>
      <PageHero {...home.hero} />
      <Intro />
      <UnitPanels />
      <InnTriptych />
      <Amenities />
      <ExploreTeaser />
    </div>
  );
}

function Intro() {
  return (
    <section className="mx-auto grid max-w-[1680px] gap-12 px-5 section-y md:grid-cols-[1fr_0.8fr] md:items-center md:gap-16 md:px-12">
      <div>
        <p className="caps text-copper-deep" data-reveal>
          {home.intro.kicker}
        </p>
        <h2 className="display mt-4 text-[clamp(40px,6vw,104px)] text-navy" data-reveal style={{'--d': '0.08s'} as CSSProperties}>
          <Headline lines={home.intro.lines} />
        </h2>
        <div className="mt-10 max-w-[58ch] space-y-5 text-ink/80">
          {home.intro.body.map((p, i) => (
            <p key={i} data-reveal style={{'--d': `${0.12 + i * 0.08}s`} as CSSProperties}>
              {p}
            </p>
          ))}
        </div>
        <dl className="mt-12 grid max-w-[560px] grid-cols-3 gap-6 border-t border-navy/15 pt-6">
          {home.intro.stats.map(([k, v], i) => (
            <div key={k} data-reveal style={{'--d': `${0.1 + i * 0.08}s`} as CSSProperties}>
              <dt className="caps text-ink/60">{k}</dt>
              <dd className="display mt-1 text-[clamp(30px,3vw,44px)] text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure className="relative aspect-[3/4] overflow-hidden bg-sand" data-reveal="wipe">
        <img src={media('entrance-arch.webp')} alt="The black wrought-iron Knysna Inn entrance arch over a garden path lined with ferns" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </figure>
    </section>
  );
}

/**
 * The four unit types: tall panels that slide in from the right one after
 * another the first time the row is on screen, each over its own photo.
 */
function UnitPanels() {
  const grid = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {threshold: 0.2});
    io.observe(grid.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-ink text-paper" aria-labelledby="units-title">
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-6 px-5 section-t pb-10 md:px-12">
        <div>
          <p className="caps text-copper">Rooms & rates</p>
          <h2 id="units-title" className="display mt-4 text-[clamp(40px,5.6vw,96px)]">
            <Headline lines={[{t: 'Four ways'}, {t: 'to stay.', i: true}]} />
          </h2>
        </div>
        <Link href="/rooms" className="caps group inline-flex min-h-12 items-center gap-3 border border-paper/40 px-6 transition-colors hover:bg-paper hover:text-ink">
          All rooms & rates <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div ref={grid} className="grid gap-[3px] overflow-hidden sm:grid-cols-2 xl:h-[88svh] xl:min-h-[640px] xl:grid-cols-4">
        {units.map((u, i) => (
          <Link
            key={u.id}
            href={`/rooms#${u.id}`}
            className={`group relative block h-[70svh] min-h-[460px] overflow-hidden transition-transform duration-[1100ms] ease-wipe xl:h-full ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.14}s`, background: u.tint}}
          >
            <img
              src={media(u.images[0].src)}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_21_34/0.7),transparent_40%,transparent_55%,rgb(15_21_34/0.75))]" />
            <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
              <div>
                <p className="caps text-paper/70">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(38px,3.2vw,58px)] text-white">
                  <span className="block">{u.name[0]}</span>
                  <span className="it block">{u.name[1]}</span>
                </h3>
              </div>
              <dl className={`grid grid-cols-3 gap-3 transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                {[
                  ['Sleeps', u.sleeps],
                  ['Beds', u.beds],
                  ['From', `${u.from} / night`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="caps text-white/65">{k}</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * One photo of the courtyard split across three panels, the slices lifting
 * into place one after another — the inn seen in pieces, then whole.
 */
function InnTriptych() {
  return (
    <section className="bg-ink pt-[3px] section-b text-paper">
      <div className="grid h-[62svh] min-h-[420px] grid-cols-3 gap-[3px] overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative overflow-hidden bg-navy" data-reveal="wipe" style={{'--d': `${i * 0.15}s`} as CSSProperties}>
            <img
              src={media('courtyard.webp')}
              alt={i === 0 ? 'The Knysna Inn courtyard: wooden tables and green chairs among flower beds under a reed pergola' : ''}
              aria-hidden={i === 0 ? undefined : true}
              loading="lazy"
              decoding="async"
              className="absolute top-0 h-full max-w-none object-cover"
              style={{width: '300%', left: `${-100 * i}%`}}
            />
          </div>
        ))}
      </div>
      <div className="mx-auto grid max-w-[1680px] gap-8 px-5 pt-10 md:grid-cols-[1fr_1fr] md:px-12">
        <div>
          <p className="caps text-copper" data-reveal>
            {home.inn.kicker}
          </p>
          <h2 className="display mt-4 text-[clamp(40px,5.6vw,96px)]" data-reveal>
            <Headline lines={home.inn.lines} />
          </h2>
        </div>
        <div className="md:self-end">
          <p className="max-w-[46ch] text-paper/85" data-reveal>
            {home.inn.body}
          </p>
          <Link href="/the-inn" className="caps group mt-8 inline-flex min-h-12 items-center gap-3 bg-copper px-6 text-ink transition-colors hover:bg-paper" data-reveal>
            See the Inn & gallery <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Amenities() {
  return (
    <section className="mx-auto max-w-[1680px] px-5 section-y md:px-12" aria-labelledby="amen-title">
      <p className="caps text-copper-deep" data-reveal>
        Every stay includes
      </p>
      <h2 id="amen-title" className="display mt-4 text-[clamp(40px,5.6vw,96px)] text-navy" data-reveal>
        <Headline lines={[{t: 'The small things,'}, {t: 'sorted.', i: true}]} />
      </h2>
      <ul className="mt-10 md:mt-12 grid gap-px overflow-hidden border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((a, i) => (
          <li key={a.label} className="flex items-start gap-5 bg-paper p-7 md:p-9" data-reveal style={{'--d': `${(i % 3) * 0.08}s`} as CSSProperties}>
            <Icon name={a.icon} size={30} className="mt-1 shrink-0 text-copper-deep" />
            <div>
              <p className="display text-[30px] text-navy">{a.label}</p>
              <p className="mt-1 text-ink/70">{a.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExploreTeaser() {
  return (
    <section className="bg-sand" aria-labelledby="explore-title">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 section-y md:grid-cols-[0.9fr_1.1fr] md:px-12">
        <div>
          <p className="caps text-copper-deep" data-reveal>
            {home.explore.kicker}
          </p>
          <h2 id="explore-title" className="display mt-4 text-[clamp(40px,5.6vw,96px)] text-navy" data-reveal>
            <Headline lines={home.explore.lines} />
          </h2>
          <Link href="/explore" className="caps group mt-10 inline-flex min-h-12 items-center gap-3 bg-navy px-6 text-paper transition-colors hover:bg-copper hover:text-ink" data-reveal>
            Explore Knysna <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ol className="border-t border-navy/20">
          {explore.places.slice(0, 5).map((p, i) => (
            <li key={p.name} className="flex items-baseline justify-between gap-6 border-b border-navy/20 py-5" data-reveal style={{'--d': `${i * 0.06}s`} as CSSProperties}>
              <span className="display text-[clamp(28px,2.6vw,42px)] text-navy">{p.name}</span>
              <span className="caps max-w-[13ch] text-right text-ink/65">{p.time}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
