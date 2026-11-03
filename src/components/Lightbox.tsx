import {useEffect, useRef} from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {media} from '../content';
import {lockScroll} from '../lib/scroll';

type Photo = {src: string; alt: string};

/**
 * Full-screen photo viewer built on <dialog>, which gives us the focus trap,
 * Escape-to-close and the inert page behind it for free.
 */
export function Lightbox({photos, index, onChange, onClose}: {photos: Photo[]; index: number | null; onChange: (i: number) => void; onClose: () => void}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  // Listen natively: however the dialog closes (Escape, button, backdrop),
  // release the page and clear the selection.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const d = dialog.current!;
    const onNativeClose = () => {
      lockScroll(false);
      closeRef.current();
    };
    d.addEventListener('close', onNativeClose);
    return () => d.removeEventListener('close', onNativeClose);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      lockScroll(true);
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onChange((index! + 1) % photos.length);
      if (e.key === 'ArrowLeft') onChange((index! - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, photos.length, onChange]);

  const photo = open ? photos[index] : null;

  return (
    <dialog
      ref={dialog}
      aria-label="Photo viewer"
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      className="m-0 h-full max-h-none w-full max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/80"
    >
      {photo && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <p className="caps text-paper/70" aria-live="polite">
              {index! + 1} / {photos.length}
            </p>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close photo viewer" className="grid size-12 place-items-center hover:text-copper">
              <X aria-hidden size={24} strokeWidth={1.5} />
            </button>
          </div>
          <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 md:px-20">
            <img src={media(photo.src)} alt={photo.alt} className="min-h-0 max-w-full flex-1 object-contain" />
            <figcaption className="mt-4 text-center text-paper/80">{photo.alt}</figcaption>
            <button
              type="button"
              onClick={() => onChange((index! - 1 + photos.length) % photos.length)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-1 grid size-12 -translate-y-1/2 place-items-center bg-ink/50 hover:text-copper md:left-5"
            >
              <ChevronLeft aria-hidden size={28} strokeWidth={1.3} />
            </button>
            <button
              type="button"
              onClick={() => onChange((index! + 1) % photos.length)}
              aria-label="Next photo"
              className="absolute top-1/2 right-1 grid size-12 -translate-y-1/2 place-items-center bg-ink/50 hover:text-copper md:right-5"
            >
              <ChevronRight aria-hidden size={28} strokeWidth={1.3} />
            </button>
          </figure>
        </div>
      )}
    </dialog>
  );
}
