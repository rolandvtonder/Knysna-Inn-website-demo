import {useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode} from 'react';
import {Clock, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {contact, contactPage, units} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';

type Fields = {name: string; email: string; phone: string; unit: string; arrive: string; depart: string; guests: string; message: string};
type Errors = Partial<Record<keyof Fields, string>>;

const today = () => new Date().toISOString().slice(0, 10);

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your email so we can reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'That email doesn’t look right — check for a missing @ or dot.';
  if (!f.arrive) e.arrive = 'Please choose your arrival date.';
  else if (f.arrive < today()) e.arrive = 'Arrival can’t be in the past.';
  if (!f.depart) e.depart = 'Please choose your departure date.';
  else if (f.arrive && f.depart <= f.arrive) e.depart = 'Departure must be after arrival.';
  return e;
}

function compose(f: Fields) {
  const unit = units.find((u) => u.id === f.unit);
  return [
    `Hello Knysna Inn, I'd like to enquire about a stay.`,
    ``,
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    ...(f.phone ? [`Phone: ${f.phone}`] : []),
    `Dates: ${f.arrive} to ${f.depart}`,
    `Guests: ${f.guests}`,
    `Unit: ${unit ? unit.name.join(' ') : 'Any available'}`,
    ...(f.message.trim() ? [``, f.message.trim()] : []),
  ].join('\n');
}

export function Contact() {
  const root = useReveals<HTMLDivElement>();
  const preset = new URLSearchParams(window.location.search).get('unit') ?? '';

  return (
    <div ref={root}>
      <PageHero {...contactPage.hero} size="short" />

      <section className="mx-auto grid max-w-[1680px] gap-14 px-5 section-y md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <aside aria-labelledby="details-title">
          <p className="caps text-copper-deep" data-reveal>
            Find us
          </p>
          <h2 id="details-title" className="display mt-4 text-[clamp(44px,4.6vw,80px)] text-navy" data-reveal>
            42 Main <span className="it">Street</span>
          </h2>
          <ul className="mt-10 space-y-6">
            <Detail icon={<MapPin aria-hidden size={22} strokeWidth={1.4} />} label="Address" d={0}>
              <address className="not-italic">
                {contact.street}, {contact.town}
                <br />
                {contact.region}
              </address>
            </Detail>
            <Detail icon={<Phone aria-hidden size={22} strokeWidth={1.4} />} label="Phone" d={0.05}>
              <a href={contact.phoneHref} className="underline decoration-copper underline-offset-4 hover:text-copper-deep">
                {contact.phone}
              </a>
            </Detail>
            <Detail icon={<MessageCircle aria-hidden size={22} strokeWidth={1.4} />} label="WhatsApp" d={0.1}>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="underline decoration-copper underline-offset-4 hover:text-copper-deep">
                Message us on WhatsApp
              </a>
            </Detail>
            <Detail icon={<Mail aria-hidden size={22} strokeWidth={1.4} />} label="Email" d={0.15}>
              <a href={`mailto:${contact.email}`} className="break-all underline decoration-copper underline-offset-4 hover:text-copper-deep">
                {contact.email}
              </a>
            </Detail>
            <Detail icon={<Clock aria-hidden size={22} strokeWidth={1.4} />} label="Check-in · Check-out" d={0.2}>
              From {contact.checkIn} · By {contact.checkOut}
            </Detail>
          </ul>
        </aside>

        <EnquiryForm preset={preset} />
      </section>

      <section aria-label="Map" className="bg-navy p-[3px]">
        <iframe
          title="Map showing Knysna Inn at 42 Main Street, Knysna"
          src={contact.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[60svh] min-h-[380px] w-full border-0 grayscale-[0.3]"
        />
      </section>
    </div>
  );
}

function Detail({icon, label, children, d}: {icon: ReactNode; label: string; children: ReactNode; d: number}) {
  return (
    <li className="flex gap-5 border-b border-navy/15 pb-6" data-reveal style={{'--d': `${d}s`} as CSSProperties}>
      <span className="mt-0.5 text-copper-deep">{icon}</span>
      <div>
        <p className="caps text-ink/60">{label}</p>
        <div className="mt-1 text-ink">{children}</div>
      </div>
    </li>
  );
}

/**
 * No backend: the form validates on blur and on submit, then hands a
 * pre-written message to the guest's email app or to WhatsApp.
 */
function EnquiryForm({preset}: {preset: string}) {
  const uid = useId();
  const summary = useRef<HTMLDivElement>(null);
  const [f, setF] = useState<Fields>({
    name: '',
    email: '',
    phone: '',
    unit: units.some((u) => u.id === preset) ? preset : '',
    arrive: '',
    depart: '',
    guests: '2',
    message: '',
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState<'' | 'email' | 'whatsapp'>('');

  const errors = validate(f);
  const shown = (k: keyof Fields) => (touched[k] || submitted ? errors[k] : undefined);
  const set = (k: keyof Fields) => (e: {target: {value: string}}) => setF((prev) => ({...prev, [k]: e.target.value}));
  const blur = (k: keyof Fields) => () => setTouched((t) => ({...t, [k]: true}));

  const send = (via: 'email' | 'whatsapp') => (e?: FormEvent) => {
    e?.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      requestAnimationFrame(() => summary.current?.focus());
      setSent('');
      return;
    }
    const text = compose(f);
    if (via === 'email') {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${f.arrive} to ${f.depart}`)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    }
    setSent(via);
  };

  const errorList = submitted ? (Object.entries(errors) as [keyof Fields, string][]) : [];
  const fid = (k: string) => `${uid}-${k}`;
  const input =
    'mt-2 block min-h-12 w-full border border-navy/25 bg-white px-4 text-[17px] text-ink transition-colors focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-[#b3261e]';

  const field = (k: keyof Fields, label: string, el: ReactNode, required = false, hint?: string) => (
    <div>
      <label htmlFor={fid(k)} className="caps text-ink/75">
        {label} {required && <span aria-hidden className="text-copper-deep">*</span>}
      </label>
      {el}
      {hint && !shown(k) && (
        <p id={`${fid(k)}-hint`} className="mt-1.5 text-[14px] text-ink/60">
          {hint}
        </p>
      )}
      {shown(k) && (
        <p id={`${fid(k)}-err`} className="mt-1.5 text-[14px] text-[#b3261e]">
          {shown(k)}
        </p>
      )}
    </div>
  );
  const aria = (k: keyof Fields, hint = false) => ({
    id: fid(k),
    'aria-invalid': shown(k) ? true : undefined,
    'aria-describedby': shown(k) ? `${fid(k)}-err` : hint ? `${fid(k)}-hint` : undefined,
    onBlur: blur(k),
  });

  return (
    <form noValidate onSubmit={send('email')} className="bg-sand/60 p-6 md:p-10" aria-labelledby={`${uid}-title`} data-reveal>
      <p className="caps text-copper-deep">Enquiry</p>
      <h2 id={`${uid}-title`} className="display mt-3 text-[clamp(40px,4vw,68px)] text-navy">
        Tell us your <span className="it">dates</span>
      </h2>
      <p className="mt-3 text-ink/70">
        Fields marked <span className="text-copper-deep">*</span> are required. Sending opens your email app or WhatsApp with your message already written. Nothing is stored on this site.
      </p>

      {errorList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="mt-6 border-l-4 border-[#b3261e] bg-white p-5 outline-none">
          <p className="font-medium text-ink">Please fix {errorList.length === 1 ? 'this' : `these ${errorList.length}`} before sending:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#${fid(k)}`} onClick={(e) => (e.preventDefault(), document.getElementById(fid(k))?.focus())} className="text-[#b3261e] underline">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="mt-8 grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        {field('name', 'Full name', <input {...aria('name')} className={input} value={f.name} onChange={set('name')} autoComplete="name" />, true)}
        {field('email', 'Email', <input {...aria('email')} type="email" className={input} value={f.email} onChange={set('email')} autoComplete="email" inputMode="email" />, true)}
        {field('phone', 'Phone', <input {...aria('phone', true)} type="tel" className={input} value={f.phone} onChange={set('phone')} autoComplete="tel" />, false, 'Optional. Include your country code if you are calling from abroad.')}
        {field(
          'guests',
          'Guests',
          <select {...aria('guests')} className={input} value={f.guests} onChange={set('guests')}>
            {['1', '2', '3', '4'].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>,
        )}
      </fieldset>

      <fieldset className="mt-6 grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your stay</legend>
        {field('arrive', 'Arrival', <input {...aria('arrive')} type="date" min={today()} className={input} value={f.arrive} onChange={set('arrive')} />, true)}
        {field('depart', 'Departure', <input {...aria('depart')} type="date" min={f.arrive || today()} className={input} value={f.depart} onChange={set('depart')} />, true)}
        <div className="sm:col-span-2">
          {field(
            'unit',
            'Unit',
            <select {...aria('unit')} className={input} value={f.unit} onChange={set('unit')}>
              <option value="">Any available unit</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name.join(' ')} — sleeps {u.sleeps}
                </option>
              ))}
            </select>,
          )}
        </div>
        <div className="sm:col-span-2">
          {field('message', 'Message', <textarea {...aria('message')} rows={4} className={`${input} py-3`} value={f.message} onChange={set('message')} />)}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" className="caps inline-flex min-h-12 items-center gap-3 bg-navy px-7 text-paper transition-colors hover:bg-copper hover:text-ink">
          <Mail aria-hidden size={16} /> Send by email
        </button>
        <button type="button" onClick={send('whatsapp')} className="caps inline-flex min-h-12 items-center gap-3 border border-navy px-7 text-navy transition-colors hover:bg-navy hover:text-paper">
          <MessageCircle aria-hidden size={16} /> Send on WhatsApp
        </button>
      </div>
      <p aria-live="polite" className="mt-4 min-h-6 text-[15px] text-garden">
        {sent === 'email' && 'Your email app should now be open with your enquiry written. Press send there, and we will reply soon.'}
        {sent === 'whatsapp' && 'WhatsApp should now be open in a new tab with your enquiry written. Press send there.'}
      </p>
    </form>
  );
}
