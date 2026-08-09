export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Base color */}
      <div className="absolute inset-0 bg-navy-950" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,102,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)',
        }}
      />

      {/* Top center glow */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl opacity-60" />

      {/* Left cyber glow */}
      <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-cyber-500/8 blur-[120px]" />

      {/* Right electric glow */}
      <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-electric-500/8 blur-[120px]" />

      {/* Mid accent orb */}
      <div className="absolute top-2/3 left-1/4 h-[300px] w-[300px] rounded-full bg-cyber-400/5 blur-[100px]" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
