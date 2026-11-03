import {Link} from '../components/Link';

export function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center bg-navy px-5 py-32 text-paper">
      <div className="max-w-[640px] text-center">
        <p className="caps text-copper">Page not found</p>
        <h1 className="display mt-5 text-[clamp(56px,8vw,128px)]">
          Wrong <span className="it">door.</span>
        </h1>
        <p className="mt-6 text-paper/85">That page doesn’t exist. Try the front gate instead.</p>
        <Link href="/" className="caps mt-10 inline-flex min-h-12 items-center bg-copper px-7 text-ink transition-colors hover:bg-paper">
          Back to home
        </Link>
      </div>
    </section>
  );
}
