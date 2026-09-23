import { type ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

export function Reveal({ children, delay = 0, className = '', instant = false }: { children: ReactNode; delay?: number; className?: string; instant?: boolean }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${(shown || instant) ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
