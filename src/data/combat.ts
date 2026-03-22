import type { CombatSettings, AdventureSettings } from '@/types/content';

export const COMBAT: CombatSettings = {
  baseHpByRole: { warrior: 60, ranger: 50, sage: 40 },
  hpPerLevel: 10,
  attackDamage: 3,
  damagePerLevel: 1,
  healAmount: 10,
  abilityCooldown: 3,
  healCooldown: 2,
  actionsPerTurn: 3,
  abilities: {
    warrior: { label: 'Taunt', icon: '🛡️', subtitle: 'Taunt 5t · -60% dmg', damage: 0, aoe: false },
    sage: { label: 'Fireball', icon: '🔥', subtitle: '6 Damage', damage: 6, aoe: false },
    ranger: { label: 'Arrows', icon: '🏹', subtitle: '3 Damage AoE', damage: 3, aoe: true },
  },
  rollOutcomes: [
    { range: '0', label: 'Critical Fail', effect: '0 damage (MISS)' },
    { range: '1–4', label: 'Weak', effect: 'Damage ÷ 2' },
    { range: '5–15', label: 'Normal', effect: 'Normal damage' },
    { range: '16–19', label: 'Strong', effect: 'Damage × 1.5' },
    { range: '20', label: 'Critical', effect: 'Damage × 3' },
  ],
};

export const ADVENTURE: AdventureSettings = {
  blocs: {
    first: { early: { min: 1, max: 2 }, core: { min: 5, max: 6 }, resolve: 3 },
    middle: { core: { min: 5, max: 6 }, resolve: 3 },
    final: { core: { min: 5, max: 6 }, resolve: 1 },
  },
  scaling: {
    baseLevelPerBloc: 3,
    enemiesPerCombat: { min: 2, max: 4 },
    bossLevelBonus: 4,
    bossHpMultiplier: 3,
    bossAttackMultiplier: 1.5,
  },
  screenWeights: {
    core: { combat: 3, narrative_choice: 2, puzzle: 1 },
  },
  rest: { hpRestorePercent: 50 },
  totalBlocs: 3,
};
