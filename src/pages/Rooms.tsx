import type {CSSProperties} from 'react';
import {ArrowRight, Check} from 'lucide-react';
import {media, rooms, units, type Unit} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {Link} from '../components/Link';

export function Rooms() {
  const root = useReveals<HTMLDivElement>();

  return (
    <div ref={root}>
      <PageHero {...rooms.hero} />

      {/* Quick jump between units */}
      <nav aria-label="Units" className="border-b border-navy/15 bg-paper">
        <ul className="mx-auto flex max-w-[1680px] flex-wrap gap-x-8 gap-y-1 px-5 py-4 md:px-12">
          {units.map((u, i) => (
            <li key={u.id}>
              <Link href={`/rooms#${u.id}`} className="caps inline-flex min-h-11 items-center gap-2 text-ink/75 hover:text-copper-deep">
                <span className="text-copper-deep">0{i + 1}</span> {u.name.join(' ')}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {units.map((u, i) => (
        <UnitSection key={u.id} unit={u} index={i} />
      ))}

      <section className="bg-navy text-paper">
        <div className="mx-auto grid max-w-[1680px] gap-10 px-5 section-y md:grid-cols-[1fr_1fr] md:px-12">
          <div>
            <p className="caps text-copper" data-reveal>
              Good to know
            </p>
            <p className="display mt-4 text-[clamp(38px,4vw,68px)]" data-reveal>
              Rates <span className="it">& what's included</span>
            </p>
            <p className="mt-6 max-w-[48ch] text-paper/85" data-reveal>
              {rooms.note}
            </p>
          </div>
          <ul className="grid content-end gap-3 sm:grid-cols-2">
            {rooms.included.map((x, i) => (
              <li key={x} className="flex items-center gap-3 border-b border-paper/15 py-3" data-reveal style={{'--d': `${i * 0.05}s`} as CSSProperties}>
                <Check aria-hidden size={18} className="shrink-0 text-copper" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function UnitSection({unit: u, index}: {unit: Unit; index: number}) {
  const flip = index % 2 === 1;
  const [main, ...rest] = u.images;

  return (
    <section id={u.id} className={`scroll-mt-4 ${flip ? 'bg-sand/60' : 'bg-paper'}`} aria-labelledby={`${u.id}-title`}>
      <div className="mx-auto grid max-w-[1680px] gap-10 px-5 section-y md:px-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className={`grid grid-cols-2 gap-[3px] ${flip ? 'lg:order-2' : ''}`}>
          <figure className={`relative col-span-2 overflow-hidden bg-navy ${rest.length ? 'aspect-[4/3]' : 'aspect-[4/3] lg:aspect-[4/5]'}`} data-reveal="wipe">
            <img src={media(main.src)} alt={main.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </figure>
          {rest.map((im, i) => (
            <figure
              key={im.src}
              className={`relative aspect-[4/3] overflow-hidden bg-navy ${rest.length === 1 ? 'col-span-2' : ''}`}
              data-reveal="wipe"
              style={{'--d': `${0.12 + i * 0.12}s`} as CSSProperties}
            >
              <img src={media(im.src)} alt={im.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="caps text-copper-deep" data-reveal>
            0{index + 1} · Sleeps {u.sleeps}
          </p>
          <h2 id={`${u.id}-title`} className="display mt-4 text-[clamp(50px,5.4vw,96px)] text-navy" data-reveal>
            <span className="block">{u.name[0]}</span>
            <span className="it block">{u.name[1]}</span>
          </h2>
          <p className="mt-6 max-w-[50ch] text-ink/80" data-reveal>
            {u.summary}
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-navy/15 py-5" data-reveal>
            <div>
              <dt className="caps text-ink/60">Sleeps</dt>
              <dd className="mt-1 text-navy">{u.sleeps}</dd>
            </div>
            <div>
              <dt className="caps text-ink/60">Beds</dt>
              <dd className="mt-1 text-navy">{u.beds}</dd>
            </div>
            <div>
              <dt className="caps text-ink/60">From</dt>
              <dd className="mt-1 text-navy">
                <span className="display text-[30px] tabular-nums">{u.from}</span> <span className="text-[14px] text-ink/65">/ night</span>
              </dd>
            </div>
          </dl>

          <ul className="mt-8 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {u.features.map((f, i) => (
              <li key={f} className="flex items-start gap-3 text-ink/85" data-reveal style={{'--d': `${i * 0.04}s`} as CSSProperties}>
                <Check aria-hidden size={18} className="mt-1 shrink-0 text-copper-deep" /> {f}
              </li>
            ))}
          </ul>

          <Link
            href={`/contact?unit=${u.id}`}
            className="caps group mt-10 inline-flex min-h-12 items-center gap-3 bg-navy px-7 text-paper transition-colors hover:bg-copper hover:text-ink"
            data-reveal
          >
            Enquire about this unit <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
