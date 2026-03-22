export type ScreenEffect = {
  hpDelta?: number;
  goldDelta?: number;
  expDelta?: number;
};

// ── Biomes ──────────────────────────────────────────────

export type NarrativeOption = {
  id: string;
  text: string;
  effect: ScreenEffect;
  flavor: string;
};

export type NarrativeTemplate = {
  id: string;
  prompt: string;
  options: NarrativeOption[];
};

export type BiomePhase = {
  theme: string;
  ambiance: string;
  narratives: NarrativeTemplate[];
  combatIntro: string;
  bossIntro?: string;
};

export type Biome = {
  id: string;
  name: string;
  description: string;
  phases: {
    early: BiomePhase;
    core: BiomePhase;
    resolve: BiomePhase;
  };
};

// ── Enemies ─────────────────────────────────────────────

export type EnemyTemplate = {
  name: string;
  hpMultiplier: number;
  attackMultiplier: number;
};

export type BossTemplate = EnemyTemplate & {
  intro: string;
};

export type BiomeEnemies = {
  early: EnemyTemplate[];
  core: EnemyTemplate[];
  bosses: BossTemplate[];
  finalBoss: BossTemplate;
};

// ── Riddles ─────────────────────────────────────────────

export type RiddleChoice = {
  id: string;
  text: string;
  correct: boolean;
};

export type Riddle = {
  id: string;
  biome: string | null;
  question: string;
  choices: RiddleChoice[];
  reward: ScreenEffect;
  penalty: ScreenEffect;
  timeLimit: number;
};

// ── Shop ────────────────────────────────────────────────

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  effect: ScreenEffect;
  minBloc: number;
};

// ── Combat ──────────────────────────────────────────────

export type RoleId = 'warrior' | 'sage' | 'ranger';

export type AbilityConfig = {
  label: string;
  icon: string;
  subtitle: string;
  damage: number;
  aoe: boolean;
};

export type RollOutcome = {
  range: string;
  label: string;
  effect: string;
};

export type CombatSettings = {
  baseHpByRole: Record<RoleId, number>;
  hpPerLevel: number;
  attackDamage: number;
  damagePerLevel: number;
  healAmount: number;
  abilityCooldown: number;
  healCooldown: number;
  actionsPerTurn: number;
  abilities: Record<RoleId, AbilityConfig>;
  rollOutcomes: RollOutcome[];
};

// ── Adventure ───────────────────────────────────────────

export type BlocConfig = {
  early?: { min: number; max: number };
  core: { min: number; max: number };
  resolve: number;
};

export type AdventureSettings = {
  blocs: {
    first: BlocConfig;
    middle: BlocConfig;
    final: BlocConfig;
  };
  scaling: {
    baseLevelPerBloc: number;
    enemiesPerCombat: { min: number; max: number };
    bossLevelBonus: number;
    bossHpMultiplier: number;
    bossAttackMultiplier: number;
  };
  screenWeights: {
    core: {
      combat: number;
      narrative_choice: number;
      puzzle: number;
    };
  };
  rest: {
    hpRestorePercent: number;
  };
  totalBlocs: number;
};