import { useScrollProgress } from '../lib/useReveal';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div 
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}
