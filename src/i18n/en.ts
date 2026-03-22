const en = {
  translation: {
    // ── Nav ──────────────────────────────────────────────
    nav: {
      title: 'Questing Admin',
      dashboard: 'Dashboard',
      biomes: 'Biomes',
      enemies: 'Enemies',
      riddles: 'Riddles',
      shop: 'Shop',
      combat: 'Combat',
      rooms: 'Rooms',
      vfx: 'VFX Editor',
    },

    // ── Dashboard ───────────────────────────────────────
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of Questing Together content',
      stats: {
        biomes: 'Biomes',
        biomesDesc: 'Game environments',
        enemies: 'Enemies',
        enemiesDesc: 'Monsters & bosses',
        riddles: 'Riddles',
        riddlesDesc: 'Available puzzles',
        shopItems: 'Shop Items',
        shopItemsDesc: 'Items in shop',
      },
      biomesCard: 'Biomes',
      shopByBloc: 'Shop Items by Bloc',
      bloc: 'Bloc {{n}}',
      nEnemies: '{{count}} enemies',
      nNarratives: '{{count}} narratives',
      noItemsForBloc: 'No items specific to this bloc',
    },

    // ── Biomes ──────────────────────────────────────────
    biomes: {
      title: 'Biomes',
      subtitle: 'Game environments, phases and narratives',
    },

    // ── Phase Section ───────────────────────────────────
    phase: {
      early: 'Early',
      core: 'Core',
      resolve: 'Resolve',
      nNarratives: '{{count}} narratives',
      combatIntro: 'Combat intro:',
      bossIntro: 'Boss intro:',
      narratives: 'Narratives',
    },

    // ── Enemies ─────────────────────────────────────────
    enemies: {
      title: 'Enemies',
      subtitle: 'Monsters and bosses by biome',
      earlyPhase: 'Early Phase',
      corePhase: 'Core Phase',
      nEnemies: '{{count}} enemies',
      bosses: 'Bosses',
      nBosses: '{{count}} boss(es)',
      name: 'Name',
      hpMultiplier: 'HP x',
      atkMultiplier: 'ATK x',
      type: 'Type',
      intro: 'Intro',
      boss: 'Boss',
      finalBoss: 'Final Boss',
    },

    // ── Riddles ─────────────────────────────────────────
    riddles: {
      title: 'Riddles',
      subtitle: 'Puzzles — {{count}} total',
      allBiomes: 'All biomes',
      reward: 'Reward:',
      penalty: 'Penalty:',
    },

    // ── Shop ────────────────────────────────────────────
    shop: {
      title: 'Shop',
      subtitle: 'Available items — {{count}} items',
      name: 'Name',
      description: 'Description',
      cost: 'Cost',
      blocMin: 'Min Bloc',
      effect: 'Effect',
      bloc: 'Bloc {{n}}',
      blocPlus: 'Bloc {{n}}+',
      nItemsAvailable: '{{count}} items available',
    },

    // ── Combat & Adventure ──────────────────────────────
    combat: {
      title: 'Combat & Adventure',
      subtitle: 'Combat parameters and adventure structure',
      baseHp: 'Base HP: {{value}}',
      damage: 'Damage: {{value}}',
      aoe: 'AoE: {{value}}',
      yes: 'Yes',
      no: 'No',
      settings: 'Combat Settings',
      attackDamage: 'Attack Damage',
      damagePerLevel: 'Damage per Level',
      hpPerLevel: 'HP per Level',
      healAmount: 'Heal Amount',
      abilityCooldown: 'Ability Cooldown',
      healCooldown: 'Heal Cooldown',
      nTurns: '{{count}} turns',
      enemyScaling: 'Enemy Scaling',
      baseLevelPerBloc: 'Base Level per Bloc',
      enemiesPerCombat: 'Enemies per Combat',
      bossLevelBonus: 'Boss Level Bonus',
      bossHpMultiplier: 'Boss HP Multiplier',
      bossAtkMultiplier: 'Boss ATK Multiplier',
      adventureStructure: 'Adventure Structure',
      adventureDesc: '{{blocs}} blocs — Screen weights: Combat {{combat}}, Narrative {{narrative}}, Puzzle {{puzzle}}',
      firstBloc: 'First Bloc',
      middleBloc: 'Middle Bloc',
      finalBloc: 'Final Bloc',
      early: 'Early',
      core: 'Core',
      resolve: 'Resolve',
      nScreens: '{{count}} screens',
      rangeScreens: '{{min}}–{{max}} screens',
      rest: 'Rest',
      restDesc: 'Restores {{percent}}% of max HP',
    },

    // ── Rooms ───────────────────────────────────────────
    rooms: {
      title: 'Rooms',
      subtitle: 'Live game session tracking',
      total: 'Total',
      lobby: 'Lobby',
      inProgress: 'In progress',
      finished: 'Finished',
      recentRooms: 'Recent rooms',
      loadError: 'Loading error: {{message}}',
      noRooms: 'No rooms yet',
      code: 'Code',
      status: 'Status',
      players: 'Players',
      bloc: 'Bloc',
      screen: 'Screen',
      createdAt: 'Created',
    },

    // ── Shared ──────────────────────────────────────────
    common: {
      hp: 'HP',
      gold: 'Gold',
      xp: 'XP',
    },
  },
};

export default en;
