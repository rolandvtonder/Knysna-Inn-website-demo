import {useSyncExternalStore} from 'react';
import {resetScroll, scrollToId} from './scroll';

/**
 * A small History-API router with a page wipe built in. `navigate` first
 * covers the screen (phase "cover"), swaps the page while it can't be seen,
 * jumps to the top, then uncovers it (phase "reveal"). Components subscribe
 * with `usePath` / `usePhase`; nothing else re-renders.
 */

export type Phase = 'idle' | 'cover' | 'reveal';

/** Matches the slab timing in PageWipe: last slab lands at ~0.18s + 0.7s. */
const COVER_MS = 900;
const REVEAL_MS = 900;

const listeners = new Set<() => void>();
let path = normalize(window.location.pathname);
let phase: Phase = 'idle';
let reduced = false;
let busy = false;

function normalize(p: string) {
  const trimmed = p.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function emit() {
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function setRouterReducedMotion(value: boolean) {
  reduced = value;
}

export const usePath = () => useSyncExternalStore(subscribe, () => path);
export const usePhase = () => useSyncExternalStore(subscribe, () => phase);

function swap(next: string, hash: string) {
  path = next;
  emit();
  // Let React commit the new page before measuring/scrolling.
  requestAnimationFrame(() => {
    if (hash) scrollToId(hash);
    else resetScroll();
  });
}

/** Navigates to an in-site URL like `/rooms`, `/contact?unit=x` or `/rooms#family-suite`. */
export function navigate(href: string, {push = true}: {push?: boolean} = {}) {
  const url = new URL(href, window.location.origin);
  const next = normalize(url.pathname);
  const hash = url.hash.slice(1);

  if (next === path) {
    if (push) history.pushState(null, '', url.pathname + url.search + url.hash);
    if (hash) scrollToId(hash);
    else resetScroll();
    return;
  }
  if (busy) return;
  if (push) history.pushState(null, '', url.pathname + url.search + url.hash);

  if (reduced) {
    swap(next, hash);
    return;
  }

  busy = true;
  phase = 'cover';
  emit();
  window.setTimeout(() => {
    swap(next, hash);
    phase = 'reveal';
    emit();
    window.setTimeout(() => {
      phase = 'idle';
      busy = false;
      emit();
    }, REVEAL_MS);
  }, COVER_MS);
}

window.addEventListener('popstate', () => {
  navigate(window.location.pathname + window.location.search + window.location.hash, {push: false});
});
