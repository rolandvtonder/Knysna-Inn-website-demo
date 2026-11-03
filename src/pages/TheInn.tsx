import {useState, type CSSProperties} from 'react';
import {Expand} from 'lucide-react';
import {inn, media} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {Headline} from '../components/Headline';
import {Lightbox} from '../components/Lightbox';

export function TheInn() {
  const root = useReveals<HTMLDivElement>();
  const [photo, setPhoto] = useState<number | null>(null);

  return (
    <div ref={root}>
      <PageHero {...inn.hero} />

      {inn.stories.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={s.id} className={i % 2 ? 'bg-sand/60' : 'bg-paper'} aria-labelledby={`story-${s.id}`}>
            <div className="mx-auto grid max-w-[1680px] items-center gap-10 px-5 section-y md:grid-cols-2 md:gap-16 md:px-12">
              <figure className={`relative aspect-[4/3] overflow-hidden bg-navy ${flip ? 'md:order-2' : ''} ${s.id === 'street' ? 'md:aspect-[4/5]' : ''}`} data-reveal="wipe">
                <img src={media(s.image)} alt={s.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </figure>
              <div className={flip ? 'md:pl-[6vw]' : 'md:pr-[6vw]'}>
                <p className="caps text-copper-deep" data-reveal>
                  {s.kicker}
                </p>
                <h2 id={`story-${s.id}`} className="display mt-4 text-[clamp(40px,5vw,88px)] text-navy" data-reveal>
                  <Headline lines={s.lines} />
                </h2>
                <p className="mt-6 max-w-[48ch] text-ink/80" data-reveal>
                  {s.body}
                </p>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-ink section-t px-[3px] pb-[3px] text-paper" aria-labelledby="gallery-title">
        <div className="mx-auto mb-12 max-w-[1680px] px-5 md:px-12">
          <p className="caps text-copper" data-reveal>
            Gallery
          </p>
          <h2 id="gallery-title" className="display mt-4 text-[clamp(40px,5.6vw,96px)]" data-reveal>
            <Headline lines={[{t: 'Have a'}, {t: 'look around.', i: true}]} />
          </h2>
        </div>
        <ul className="columns-2 gap-[3px] md:columns-3 xl:columns-4">
          {inn.gallery.map((g, i) => (
            <li key={g.src} className="mb-[3px] break-inside-avoid" data-reveal style={{'--d': `${(i % 4) * 0.06}s`} as CSSProperties}>
              <button
                type="button"
                onClick={() => setPhoto(i)}
                className={`group relative block w-full overflow-hidden bg-navy ${g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                aria-label={`Open photo: ${g.alt}`}
              >
                <img src={media(g.src)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-silk group-hover:scale-105" />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30" />
                <Expand aria-hidden size={22} className="absolute right-4 bottom-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Lightbox photos={inn.gallery} index={photo} onChange={setPhoto} onClose={() => setPhoto(null)} />
    </div>
  );
}
