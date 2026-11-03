import type {ComponentPropsWithRef} from 'react';
import {navigate} from '../lib/router';

type Props = ComponentPropsWithRef<'a'> & {href: string};

/**
 * An in-site link: a real <a href> (so it can be opened in a new tab, copied
 * and crawled) whose plain left-click runs the page wipe instead of a reload.
 */
export function Link({href, onClick, ...rest}: Props) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
