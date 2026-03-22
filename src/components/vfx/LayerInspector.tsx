import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Stack, HStack } from '@/components/ui/stack';
import { Text, Label } from '@/components/ui/text';
import type { VfxLayer, Keyframe } from '@/types/vfx';
import CurveEditor from '@/components/vfx/CurveEditor';

type LayerInspectorProps = {
  layer: VfxLayer;
  onChange: (patch: Partial<VfxLayer>) => void;
};

const TRACK_COLORS: Record<string, string> = {
  scale: '#ffd27a',
  alpha: '#8fd7ff',
  glow: '#ff6fb2',
  x: '#7ad96b',
  y: '#9e8bff',
  travel: '#ff9f43',
};

const NumberField = ({ label, value, onChange, step = 1, min }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
}) => (
  <Stack className="gap-1">
    <Label>{label}</Label>
    <Input type="number" value={value} step={step} min={min} onChange={(e) => onChange(Number(e.target.value))} />
  </Stack>
);

const ColorField = ({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <Stack className="gap-1">
    <Label>{label}</Label>
    <HStack className="gap-2">
      <input
        type="color"
        value={value.startsWith('#') ? value.slice(0, 7) : '#ffffff'}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 rounded border border-border cursor-pointer"
      />
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" />
    </HStack>
  </Stack>
);

const LayerInspector = ({ layer, onChange }: LayerInspectorProps) => {
  const updateTrack = (trackName: string, keyframes: Keyframe[]) => {
    onChange({ tracks: { ...layer.tracks, [trackName]: keyframes } } as Partial<VfxLayer>);
  };

  const removeTrack = (trackName: string) => {
    const { [trackName]: _, ...rest } = layer.tracks;
    onChange({ tracks: rest } as Partial<VfxLayer>);
  };

  const renderTypeFields = () => {
    switch (layer.type) {
      case 'orb':
        return (
          <>
            <NumberField label="Radius" value={layer.radius} onChange={(v) => onChange({ radius: v } as Partial<VfxLayer>)} min={1} />
            <ColorField label="Color" value={layer.color} onChange={(v) => onChange({ color: v } as Partial<VfxLayer>)} />
            <ColorField label="Glow Color" value={layer.glowColor ?? ''} onChange={(v) => onChange({ glowColor: v } as Partial<VfxLayer>)} />
            <NumberField label="Glow Scale" value={layer.glowScale ?? 1} onChange={(v) => onChange({ glowScale: v } as Partial<VfxLayer>)} step={0.1} />
          </>
        );
      case 'ring':
        return (
          <>
            <NumberField label="Radius" value={layer.radius} onChange={(v) => onChange({ radius: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Thickness" value={layer.thickness} onChange={(v) => onChange({ thickness: v } as Partial<VfxLayer>)} min={1} />
            <ColorField label="Color" value={layer.color} onChange={(v) => onChange({ color: v } as Partial<VfxLayer>)} />
          </>
        );
      case 'trail':
        return (
          <>
            <NumberField label="Radius" value={layer.radius} onChange={(v) => onChange({ radius: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Segments" value={layer.segments} onChange={(v) => onChange({ segments: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Spacing" value={layer.spacing} onChange={(v) => onChange({ spacing: v } as Partial<VfxLayer>)} step={0.01} />
            <NumberField label="Falloff" value={layer.falloff} onChange={(v) => onChange({ falloff: v } as Partial<VfxLayer>)} step={0.01} />
            <ColorField label="Color" value={layer.color} onChange={(v) => onChange({ color: v } as Partial<VfxLayer>)} />
          </>
        );
      case 'streak':
        return (
          <>
            <NumberField label="Width" value={layer.width} onChange={(v) => onChange({ width: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Height" value={layer.height} onChange={(v) => onChange({ height: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Rotation" value={layer.rotationDeg} onChange={(v) => onChange({ rotationDeg: v } as Partial<VfxLayer>)} />
            <ColorField label="Color" value={layer.color} onChange={(v) => onChange({ color: v } as Partial<VfxLayer>)} />
          </>
        );
      case 'diamond':
        return (
          <>
            <NumberField label="Width" value={layer.width} onChange={(v) => onChange({ width: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Height" value={layer.height} onChange={(v) => onChange({ height: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Rotation" value={layer.rotationDeg} onChange={(v) => onChange({ rotationDeg: v } as Partial<VfxLayer>)} />
            <ColorField label="Color" value={layer.color} onChange={(v) => onChange({ color: v } as Partial<VfxLayer>)} />
          </>
        );
      case 'arc':
        return (
          <>
            <NumberField label="Radius" value={layer.radius} onChange={(v) => onChange({ radius: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Thickness" value={layer.thickness} onChange={(v) => onChange({ thickness: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Sweep (deg)" value={layer.sweepDeg} onChange={(v) => onChange({ sweepDeg: v } as Partial<VfxLayer>)} />
            <NumberField label="Rotation" value={layer.rotationDeg} onChange={(v) => onChange({ rotationDeg: v } as Partial<VfxLayer>)} />
            <ColorField label="Color" value={layer.color} onChange={(v) => onChange({ color: v } as Partial<VfxLayer>)} />
          </>
        );
      case 'starburst':
        return (
          <>
            <NumberField label="Inner Radius" value={layer.innerRadius} onChange={(v) => onChange({ innerRadius: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Outer Radius" value={layer.outerRadius} onChange={(v) => onChange({ outerRadius: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Points" value={layer.points} onChange={(v) => onChange({ points: v } as Partial<VfxLayer>)} min={3} />
            <NumberField label="Rotation" value={layer.rotationDeg} onChange={(v) => onChange({ rotationDeg: v } as Partial<VfxLayer>)} />
            <ColorField label="Color" value={layer.color} onChange={(v) => onChange({ color: v } as Partial<VfxLayer>)} />
          </>
        );
      case 'sprite':
        return (
          <>
            <Stack className="gap-1">
              <Label>Sprite ID</Label>
              <Input value={layer.spriteId} onChange={(e) => onChange({ spriteId: e.target.value } as Partial<VfxLayer>)} />
            </Stack>
            <NumberField label="Width" value={layer.width} onChange={(v) => onChange({ width: v } as Partial<VfxLayer>)} min={1} />
            <NumberField label="Height" value={layer.height} onChange={(v) => onChange({ height: v } as Partial<VfxLayer>)} min={1} />
            <ColorField label="Tint Color" value={layer.tintColor} onChange={(v) => onChange({ tintColor: v } as Partial<VfxLayer>)} />
          </>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <HStack className="justify-between">
          <CardTitle className="text-base">Layer: {layer.id}</CardTitle>
          <Badge variant="outline">{layer.type}</Badge>
        </HStack>
      </CardHeader>
      <CardContent>
        <Stack className="gap-4">
          <Stack className="gap-1">
            <Label>ID</Label>
            <Input value={layer.id} onChange={(e) => onChange({ id: e.target.value } as Partial<VfxLayer>)} />
          </Stack>

          <Separator />

          <Text size="xs" className="font-semibold uppercase tracking-wider text-muted-foreground">
            Properties
          </Text>
          {renderTypeFields()}

          <Separator />

          <Text size="xs" className="font-semibold uppercase tracking-wider text-muted-foreground">
            Animation Curves
          </Text>
          {Object.entries(layer.tracks).map(([trackName, keyframes]) => (
            <Stack key={trackName} className="gap-1">
              <CurveEditor
                trackName={trackName}
                keyframes={keyframes ?? []}
                onChange={(kfs) => updateTrack(trackName, kfs)}
                color={TRACK_COLORS[trackName] ?? '#aaa'}
              />
              <Button
                size="xs"
                variant="ghost"
                className="self-end text-destructive text-[10px]"
                onClick={() => removeTrack(trackName)}
              >
                Remove track
              </Button>
            </Stack>
          ))}

          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              const name = prompt('Track name (e.g. scale, alpha, glow, x, y)');
              if (name && !layer.tracks[name]) {
                updateTrack(name, [{ at: 0, value: 1 }, { at: 1, value: 1 }]);
              }
            }}
          >
            + Add Track
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LayerInspector;
