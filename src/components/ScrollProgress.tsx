import { useScrollProgress } from '../lib/useReveal';

export function ScrollProgress() {
  const pct = useScrollProgress();
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}
