type Keyframe = { at: number; value: number };

type TrackMap = { [key: string]: Keyframe[] | undefined };

type LayerBase = {
  id: string;
  tracks: TrackMap;
};

type OrbLayer = LayerBase & {
  type: 'orb';
  radius: number;
  color: string;
  glowColor?: string;
  glowScale?: number;
};

type RingLayer = LayerBase & {
  type: 'ring';
  radius: number;
  thickness: number;
  color: string;
};

type TrailLayer = LayerBase & {
  type: 'trail';
  radius: number;
  segments: number;
  spacing: number;
  falloff: number;
  style?: string;
  color: string;
};

type StreakLayer = LayerBase & {
  type: 'streak';
  width: number;
  height: number;
  rotationDeg: number;
  color: string;
};

type DiamondLayer = LayerBase & {
  type: 'diamond';
  width: number;
  height: number;
  rotationDeg: number;
  color: string;
};

type ArcLayer = LayerBase & {
  type: 'arc';
  radius: number;
  thickness: number;
  sweepDeg: number;
  rotationDeg: number;
  color: string;
};

type StarburstLayer = LayerBase & {
  type: 'starburst';
  innerRadius: number;
  outerRadius: number;
  points: number;
  rotationDeg: number;
  color: string;
};

type SpriteLayer = LayerBase & {
  type: 'sprite';
  spriteId: string;
  width: number;
  height: number;
  tintColor: string;
};

type VfxLayer =
  | OrbLayer
  | RingLayer
  | TrailLayer
  | StreakLayer
  | DiamondLayer
  | ArcLayer
  | StarburstLayer
  | SpriteLayer;

type VfxLayerType = VfxLayer['type'];

type MotionMode = 'fixed' | 'line' | 'arc';

type VfxMotion = {
  mode: MotionMode;
  tracks?: TrackMap;
};

type VfxEffect = {
  id: string;
  label: string;
  durationMs: number;
  motion: VfxMotion;
  layers: VfxLayer[];
};

export type {
  ArcLayer,
  DiamondLayer,
  Keyframe,
  MotionMode,
  OrbLayer,
  RingLayer,
  SpriteLayer,
  StarburstLayer,
  StreakLayer,
  TrackMap,
  TrailLayer,
  VfxEffect,
  VfxLayer,
  VfxLayerType,
  VfxMotion,
};
