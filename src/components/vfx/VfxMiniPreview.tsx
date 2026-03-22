import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import type { VfxEffect, VfxLayer, Keyframe } from '@/types/vfx';

const W = 120;
const H = 80;
const CX = W / 2;
const CY = H / 2;

const sample = (kfs: Keyframe[], t: number): number => {
  if (kfs.length === 0) return 1;
  if (kfs.length === 1) return kfs[0].value;
  if (t <= kfs[0].at) return kfs[0].value;
  if (t >= kfs[kfs.length - 1].at) return kfs[kfs.length - 1].value;
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i];
    const b = kfs[i + 1];
    if (t >= a.at && t <= b.at) {
      const r = (t - a.at) / (b.at - a.at);
      return a.value + (b.value - a.value) * r;
    }
  }
  return kfs[kfs.length - 1].value;
};

const renderMiniLayer = (layer: VfxLayer, t: number) => {
  const scale = sample(layer.tracks.scale ?? [], t);
  const alpha = sample(layer.tracks.alpha ?? [], t);
  const ox = sample(layer.tracks.x ?? [], t) * 20;
  const oy = sample(layer.tracks.y ?? [], t) * 20;
  const x = CX + ox;
  const y = CY + oy;

  switch (layer.type) {
    case 'orb': {
      const glow = sample(layer.tracks.glow ?? [], t);
      return (
        <g key={layer.id} opacity={alpha}>
          {layer.glowColor ? <circle cx={x} cy={y} r={layer.radius * scale * (layer.glowScale ?? 2) * 0.5} fill={layer.glowColor} opacity={glow * 0.5} /> : null}
          <circle cx={x} cy={y} r={layer.radius * scale * 0.5} fill={layer.color} />
        </g>
      );
    }
    case 'ring':
      return <circle key={layer.id} cx={x} cy={y} r={layer.radius * scale * 0.5} fill="none" stroke={layer.color} strokeWidth={layer.thickness * scale * 0.5} opacity={alpha} />;
    case 'trail': {
      const segs: JSX.Element[] = [];
      for (let i = 0; i < Math.min(layer.segments, 5); i++) {
        const sa = alpha * (1 - (i / Math.max(1, layer.segments - 1)) * layer.falloff * 10);
        if (sa > 0) {
          segs.push(<circle key={i} cx={x - i * layer.spacing * 50} cy={y} r={layer.radius * scale * 0.4} fill={layer.color} opacity={Math.max(0, sa)} />);
        }
      }
      return <g key={layer.id}>{segs}</g>;
    }
    case 'streak':
      return <rect key={layer.id} x={x - layer.width * scale * 0.25} y={y - layer.height * scale * 0.25} width={layer.width * scale * 0.5} height={layer.height * scale * 0.5} rx={layer.height * scale * 0.25} fill={layer.color} opacity={alpha} transform={`rotate(${layer.rotationDeg} ${x} ${y})`} />;
    case 'starburst': {
      const pts: string[] = [];
      for (let i = 0; i < layer.points * 2; i++) {
        const angle = (Math.PI * i) / layer.points + (layer.rotationDeg * Math.PI) / 180;
        const r = (i % 2 === 0 ? layer.outerRadius : layer.innerRadius) * scale * 0.5;
        pts.push(`${x + Math.cos(angle) * r},${y + Math.sin(angle) * r}`);
      }
      return <polygon key={layer.id} points={pts.join(' ')} fill={layer.color} opacity={alpha} />;
    }
    default:
      return <circle key={layer.id} cx={x} cy={y} r={4 * scale} fill={layer.type === 'diamond' ? '#9ee7ff' : '#888'} opacity={alpha} />;
  }
};

type VfxMiniPreviewProps = {
  effect: VfxEffect;
  selected?: boolean;
  onClick?: () => void;
};

const VfxMiniPreview = ({ effect, selected, onClick }: VfxMiniPreviewProps) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(performance.now());

  const tick = useCallback(() => {
    const t = ((performance.now() - startRef.current) % effect.durationMs) / effect.durationMs;
    setProgress(t);
    rafRef.current = requestAnimationFrame(tick);
  }, [effect.durationMs]);

  useEffect(() => {
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <Box
      className={`rounded-lg border overflow-hidden cursor-pointer transition-all ${
        selected ? 'border-primary ring-1 ring-primary/40' : 'border-border hover:border-muted-foreground/40'
      }`}
      onClick={onClick}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80, background: 'radial-gradient(ellipse at center, #1c1214, #0d0b10)' }}>
        <line x1={CX - 6} y1={CY} x2={CX + 6} y2={CY} stroke="rgba(255,255,255,0.1)" />
        <line x1={CX} y1={CY - 6} x2={CX} y2={CY + 6} stroke="rgba(255,255,255,0.1)" />
        {effect.layers.map((layer) => renderMiniLayer(layer, progress))}
      </svg>
      <Box className={`px-2 py-1 text-center ${selected ? 'bg-primary/10' : 'bg-muted/30'}`}>
        <Text size="xs" className={`truncate ${selected ? 'text-primary font-medium' : ''}`}>
          {effect.label}
        </Text>
      </Box>
    </Box>
  );
};

export default VfxMiniPreview;
