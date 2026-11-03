import {useCallback, useEffect, useRef, useState, type JSX} from 'react';
import {startScroll} from './lib/scroll';
import {setRouterReducedMotion, usePath} from './lib/router';
import {useReducedMotion} from './hooks/useReducedMotion';
import {routes} from './content';
import {Header} from './components/Header';
import {Menu} from './components/Menu';
import {PageWipe} from './components/PageWipe';
import {Footer} from './components/Footer';
import {Home} from './pages/Home';
import {Rooms} from './pages/Rooms';
import {TheInn} from './pages/TheInn';
import {Explore} from './pages/Explore';
import {Contact} from './pages/Contact';
import {NotFound} from './pages/NotFound';

const pages: Record<string, () => JSX.Element> = {
  '/': Home,
  '/rooms': Rooms,
  '/the-inn': TheInn,
  '/explore': Explore,
  '/contact': Contact,
};

export default function App() {
  const reduced = useReducedMotion();
  const path = usePath();
  const [open, setOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);

  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => setRouterReducedMotion(reduced), [reduced]);

  // New page: retitle, and move focus to it for keyboard and screen-reader users.
  useEffect(() => {
    setOpen(false);
    document.title = routes.find((r) => r.path === path)?.title ?? 'Page not found — Knysna Inn';
    if (first.current) {
      first.current = false;
      return;
    }
    main.current?.focus({preventScroll: true});
  }, [path]);

  const close = useCallback(() => setOpen(false), []);
  const Page = pages[path] ?? NotFound;

  return (
    <>
      <Header menuOpen={open} onMenu={() => setOpen((o) => !o)} path={path} />
      <main id="main" ref={main} tabIndex={-1} className="outline-none">
        <Page key={path} />
      </main>
      <Footer path={path} />
      <Menu open={open} path={path} onClose={close} />
      <PageWipe />
      <div className="grain" aria-hidden />
    </>
  );
}
