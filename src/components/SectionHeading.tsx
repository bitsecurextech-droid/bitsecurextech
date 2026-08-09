import { type ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({ eyebrow, title, subtitle, center = true }: {
  eyebrow?: string; title: ReactNode; subtitle?: ReactNode; center?: boolean;
}) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {eyebrow && <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>}
      <Reveal delay={80}>
        <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white dark:text-white light:text-surface-900 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p className="mt-5 text-base leading-relaxed text-slate-400 light:text-surface-500 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
