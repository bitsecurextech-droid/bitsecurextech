import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer and when user hasn't disabled it
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (localStorage.getItem('bsx-cursor-off') === '1') return;
    setEnabled(true);

    let rx = 0, ry = 0, dx = 0, dy = 0, raf = 0;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest('button, a, input, textarea, select, [role="button"]');
      if (ringRef.current) ringRef.current.classList.toggle('hover', !!interactive);
    };
    const animate = () => {
      rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="neon-cursor" />
      <div ref={dotRef} className="neon-cursor-dot" />
    </>
  );
}
