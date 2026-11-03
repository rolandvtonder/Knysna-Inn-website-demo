import type {Line} from '../content';

/**
 * Renders headline lines from content.ts, setting the `i` lines in italic so
 * the upright/italic rhythm stays in the copy rather than in the markup.
 */
export function Headline({lines, indent = false}: {lines: Line[]; indent?: boolean}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${indent && i === 0 ? 'sm:pl-[1.2em]' : ''}`}>
          {l.t}
        </span>
      ))}
    </>
  );
}
