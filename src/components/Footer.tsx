import {ArrowUpRight} from 'lucide-react';
import {contact, footer, routes} from '../content';
import {useFitText} from '../hooks/useFitText';
import {Headline} from './Headline';
import {Link} from './Link';

export function Footer({path}: {path: string}) {
  const word = useFitText<HTMLSpanElement>();

  return (
    <footer className="relative overflow-hidden bg-navy text-paper">
      {path !== '/contact' && (
        <div className="mx-auto grid max-w-[1680px] gap-10 border-b border-paper/15 px-5 section-y md:grid-cols-[1.4fr_1fr] md:items-end md:px-12">
          <h2 className="display text-[clamp(52px,7vw,120px)]">
            <Headline lines={[{t: 'Ready when'}, {t: 'you are.', i: true}]} />
          </h2>
          <div className="space-y-6">
            <p className="max-w-[40ch] text-paper/85">Send your dates and we will reply with availability and an exact quote. Or just call us.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="caps inline-flex min-h-12 items-center bg-copper px-7 text-ink transition-colors hover:bg-paper">
                Send an enquiry
              </Link>
              <a href={contact.phoneHref} className="caps inline-flex min-h-12 items-center border border-paper/40 px-7 transition-colors hover:bg-paper hover:text-ink">
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-14 sm:grid-cols-2 md:px-12 lg:grid-cols-4">
        <div>
          <p className="caps text-copper">Visit</p>
          <address className="mt-3 not-italic text-paper/85">
            {contact.street}
            <br />
            {contact.town}
            <br />
            {contact.region}
          </address>
          <a href={contact.mapLink} target="_blank" rel="noreferrer" className="caps mt-3 inline-flex min-h-11 items-center gap-1.5 text-paper hover:text-copper">
            Open in Maps <ArrowUpRight aria-hidden size={14} />
          </a>
        </div>
        <div>
          <p className="caps text-copper">Talk to us</p>
          <ul className="mt-3 space-y-1 text-paper/85">
            <li>
              <a href={contact.phoneHref} className="hover:text-copper">{contact.phone}</a>
            </li>
            <li>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-copper">WhatsApp us</a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-copper">{contact.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="caps text-copper">Stay</p>
          <ul className="mt-3 space-y-1 text-paper/85">
            <li>Check-in from {contact.checkIn}</li>
            <li>Check-out by {contact.checkOut}</li>
            <li>Free secure parking</li>
            <li>Free Wi-Fi</li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="caps text-copper">Pages</p>
          <ul className="mt-3 space-y-1">
            {routes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} aria-current={r.path === path ? 'page' : undefined} className="text-paper/85 hover:text-copper aria-[current=page]:text-copper">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-[1680px] px-5 md:px-12" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap leading-[0.8] text-copper">
          Knysna <span className="it">Inn</span>
        </span>
      </div>
      <div className="mx-auto flex max-w-[1680px] flex-col gap-2 px-5 pt-6 pb-24 text-[14px] text-paper/60 md:flex-row md:justify-between md:px-12 md:pb-8">
        <p>{footer.blurb}</p>
        <p>© 2026 Knysna Inn</p>
      </div>
    </footer>
  );
}
