import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import type { VfxEffect, VfxLayer, Keyframe } from '@/types/vfx';

const STAGE_W = 600;
const STAGE_H = 340;
const CENTER_X = STAGE_W / 2;
const CENTER_Y = STAGE_H / 2;

const BACKDROPS = {
  ember: { label: 'Ember', top: '#1c1214', bottom: '#0d0b10', glow: '#df945c', grid: 'rgba(255,227,187,0.08)' },
  frost: { label: 'Frost', top: '#0f1822', bottom: '#091017', glow: '#8fd7ff', grid: 'rgba(207,238,255,0.09)' },
  arcane: { label: 'Arcane', top: '#1a1630', bottom: '#0f0d1b', glow: '#9e8bff', grid: 'rgba(228,217,255,0.08)' },
  poison: { label: 'Poison', top: '#132116', bottom: '#0d140d', glow: '#7ad96b', grid: 'rgba(215,255,196,0.08)' },
  void: { label: 'Void', top: '#141018', bottom: '#040407', glow: '#ff6fb2', grid: 'rgba(255,223,241,0.08)' },
} as const;

type BackdropKey = keyof typeof BACKDROPS;

const sampleTrack = (keyframes: Keyframe[], t: number): number => {
  if (keyframes.length === 0) return 1;
  if (keyframes.length === 1) return keyframes[0].value;
  if (t <= keyframes[0].at) return keyframes[0].value;
  if (t >= keyframes[keyframes.length - 1].at) return keyframes[keyframes.length - 1].value;

  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (t >= a.at && t <= b.at) {
      const ratio = (t - a.at) / (b.at - a.at);
      return a.value + (b.value - a.value) * ratio;
    }
  }
  return keyframes[keyframes.length - 1].value;
};

const renderLayerSvg = (layer: VfxLayer & { hidden?: boolean }, t: number) => {
  if (layer.hidden) return null;

  const scale = sampleTrack(layer.tracks.scale ?? [], t);
  const alpha = sampleTrack(layer.tracks.alpha ?? [], t);
  const offsetX = sampleTrack(layer.tracks.x ?? [], t) * 40;
  const offsetY = sampleTrack(layer.tracks.y ?? [], t) * 40;

  const x = CENTER_X + offsetX;
  const y = CENTER_Y + offsetY;

  switch (layer.type) {
    case 'orb': {
      const glow = sampleTrack(layer.tracks.glow ?? [], t);
      return (
        <g key={layer.id} opacity={alpha}>
          {layer.glowColor ? (
            <circle cx={x} cy={y} r={layer.radius * scale * (layer.glowScale ?? 2)} fill={layer.glowColor} opacity={glow * 0.5} />
          ) : null}
          <circle cx={x} cy={y} r={layer.radius * scale} fill={layer.color} />
        </g>
      );
    }
    case 'ring':
      return <circle key={layer.id} cx={x} cy={y} r={layer.radius * scale} fill="none" stroke={layer.color} strokeWidth={layer.thickness * scale} opacity={alpha} />;
    case 'streak': {
      const w = layer.width * scale;
      const h = layer.height * scale;
      return <rect key={layer.id} x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill={layer.color} opacity={alpha} transform={`rotate(${layer.rotationDeg} ${x} ${y})`} />;
    }
    case 'diamond': {
      const hw = (layer.width * scale) / 2;
      const hh = (layer.height * scale) / 2;
      return <polygon key={layer.id} points={`${x},${y - hh} ${x + hw},${y} ${x},${y + hh} ${x - hw},${y}`} fill={layer.color} opacity={alpha} transform={`rotate(${layer.rotationDeg} ${x} ${y})`} />;
    }
    case 'starburst': {
      const pts: string[] = [];
      for (let i = 0; i < layer.points * 2; i++) {
        const angle = (Math.PI * i) / layer.points + (layer.rotationDeg * Math.PI) / 180;
        const r = i % 2 === 0 ? layer.outerRadius * scale : layer.innerRadius * scale;
        pts.push(`${x + Math.cos(angle) * r},${y + Math.sin(angle) * r}`);
      }
      return <polygon key={layer.id} points={pts.join(' ')} fill={layer.color} opacity={alpha} />;
    }
    case 'trail': {
      const segs: React.ReactElement[] = [];
      for (let i = 0; i < layer.segments; i++) {
        const segT = i / Math.max(1, layer.segments - 1);
        const segAlpha = alpha * (1 - segT * layer.falloff * 10);
        const segScale = scale * (1 - segT * 0.15);
        if (segAlpha > 0) {
          segs.push(<circle key={i} cx={x - i * layer.spacing * 100} cy={y} r={layer.radius * segScale} fill={layer.color} opacity={Math.max(0, segAlpha)} />);
        }
      }
      return <g key={layer.id}>{segs}</g>;
    }
    case 'arc': {
      const r = layer.radius * scale;
      const sweep = (layer.sweepDeg * Math.PI) / 180;
      const sa = (layer.rotationDeg * Math.PI) / 180;
      const ea = sa + sweep;
      return <path key={layer.id} d={`M ${x + Math.cos(sa) * r} ${y + Math.sin(sa) * r} A ${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x + Math.cos(ea) * r} ${y + Math.sin(ea) * r}`} fill="none" stroke={layer.color} strokeWidth={layer.thickness * scale} opacity={alpha} strokeLinecap="round" />;
    }
    case 'sprite':
      return <rect key={layer.id} x={x - (layer.width * scale) / 2} y={y - (layer.height * scale) / 2} width={layer.width * scale} height={layer.height * scale} fill={layer.tintColor || '#888'} opacity={alpha} rx={4} />;
  }
};

type VfxPreviewCanvasProps = {
  effect: VfxEffect;
  selectedLayerIndex: number | null;
  hiddenLayers: Set<string>;
};

const VfxPreviewCanvas = ({ effect, selectedLayerIndex, hiddenLayers }: VfxPreviewCanvasProps) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backdrop, setBackdrop] = useState<BackdropKey>('ember');
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);
  const bd = BACKDROPS[backdrop];

  const tick = useCallback(() => {
    const elapsed = performance.now() - startRef.current;
    const t = (elapsed % effect.durationMs) / effect.durationMs;
    setProgress(t);
    rafRef.current = requestAnimationFrame(tick);
  }, [effect.durationMs]);

  useEffect(() => {
    if (playing) {
      startRef.current = performance.now() - progress * effect.durationMs;
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, tick, effect.durationMs, progress]);

  const visibleLayers = effect.layers.map((l) => ({
    ...l,
    hidden: hiddenLayers.has(l.id),
  }));

  return (
    <Box>
      <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className="w-full rounded-t-lg">
        {/* Backdrop gradient */}
        <defs>
          <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bd.top} />
            <stop offset="100%" stopColor={bd.bottom} />
          </linearGradient>
          <radialGradient id="bg-glow">
            <stop offset="0%" stopColor={bd.glow} stopOpacity="0.12" />
            <stop offset="100%" stopColor={bd.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={STAGE_W} height={STAGE_H} fill="url(#bg-grad)" />
        <ellipse cx={CENTER_X} cy={CENTER_Y} rx={180} ry={120} fill="url(#bg-glow)" />

        {/* Grid */}
        {Array.from({ length: 11 }, (_, i) => {
          const gx = (STAGE_W / 10) * i;
          return <line key={`gv-${i}`} x1={gx} y1={0} x2={gx} y2={STAGE_H} stroke={bd.grid} />;
        })}
        {Array.from({ length: 7 }, (_, i) => {
          const gy = (STAGE_H / 6) * i;
          return <line key={`gh-${i}`} x1={0} y1={gy} x2={STAGE_W} y2={gy} stroke={bd.grid} />;
        })}

        {/* Crosshair */}
        <line x1={CENTER_X - 12} y1={CENTER_Y} x2={CENTER_X + 12} y2={CENTER_Y} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <line x1={CENTER_X} y1={CENTER_Y - 12} x2={CENTER_X} y2={CENTER_Y + 12} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />

        {/* Ground line */}
        <line x1={0} y1={STAGE_H * 0.75} x2={STAGE_W} y2={STAGE_H * 0.75} stroke={bd.grid} strokeDasharray="6 4" />

        {/* Layers */}
        {visibleLayers.map((layer) => renderLayerSvg(layer, progress))}

        {/* Selected highlight */}
        {selectedLayerIndex !== null ? (
          <circle cx={CENTER_X} cy={CENTER_Y} r={6} fill="none" stroke="rgba(255,255,255,0.3)" strokeDasharray="3" />
        ) : null}
      </svg>

      {/* Controls bar */}
      <HStack className="p-2 justify-between bg-muted/30">
        <HStack>
          <Button size="xs" variant="ghost" onClick={() => setPlaying((v) => !v)}>
            {playing ? '⏸' : '▶'}
          </Button>
          <Button size="xs" variant="ghost" onClick={() => { setPlaying(false); setProgress(0); }}>
            ⏮
          </Button>
        </HStack>
        <HStack>
          <input
            type="range" min={0} max={1} step={0.01} value={progress}
            onChange={(e) => { setPlaying(false); setProgress(Number(e.target.value)); }}
            className="w-40 accent-primary"
          />
          <Text size="xs" mono className="w-12 text-right">{Math.round(progress * 100)}%</Text>
        </HStack>
        <Text size="xs" muted>{effect.durationMs}ms</Text>
      </HStack>

      {/* Backdrop selector */}
      <HStack className="p-2 gap-1 justify-center bg-muted/20 rounded-b-lg">
        {(Object.entries(BACKDROPS) as [BackdropKey, typeof BACKDROPS.ember][]).map(([key, val]) => (
          <Button
            key={key}
            size="xs"
            variant={backdrop === key ? 'default' : 'ghost'}
            onClick={() => setBackdrop(key)}
            className="gap-1.5"
          >
            <Box className="size-2.5 rounded-full" style={{ background: val.glow }} />
            {val.label}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default VfxPreviewCanvas;
export { sampleTrack };
