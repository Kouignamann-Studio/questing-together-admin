const fr = {
  translation: {
    // ── Nav ──────────────────────────────────────────────
    nav: {
      title: 'Questing Admin',
      dashboard: 'Tableau de bord',
      biomes: 'Biomes',
      enemies: 'Ennemis',
      riddles: 'Enigmes',
      shop: 'Boutique',
      combat: 'Combat',
      rooms: 'Rooms',
      vfx: 'Editeur VFX',
    },

    // ── Dashboard ───────────────────────────────────────
    dashboard: {
      title: 'Tableau de bord',
      subtitle: 'Vue d\'ensemble du contenu de Questing Together',
      stats: {
        biomes: 'Biomes',
        biomesDesc: 'Environnements de jeu',
        enemies: 'Ennemis',
        enemiesDesc: 'Monstres & boss',
        riddles: 'Enigmes',
        riddlesDesc: 'Enigmes disponibles',
        shopItems: 'Boutique',
        shopItemsDesc: 'Objets en boutique',
      },
      biomesCard: 'Biomes',
      shopByBloc: 'Items par Bloc',
      bloc: 'Bloc {{n}}',
      nEnemies: '{{count}} ennemis',
      nNarratives: '{{count}} narratives',
      noItemsForBloc: 'Aucun item specifique a ce bloc',
    },

    // ── Biomes ──────────────────────────────────────────
    biomes: {
      title: 'Biomes',
      subtitle: 'Environnements, phases et narratives du jeu',
    },

    // ── Phase Section ───────────────────────────────────
    phase: {
      early: 'Early',
      core: 'Core',
      resolve: 'Resolve',
      nNarratives: '{{count}} narratives',
      combatIntro: 'Intro combat :',
      bossIntro: 'Intro boss :',
      narratives: 'Narratives',
    },

    // ── Enemies ─────────────────────────────────────────
    enemies: {
      title: 'Ennemis',
      subtitle: 'Monstres et boss par biome',
      earlyPhase: 'Phase Early',
      corePhase: 'Phase Core',
      nEnemies: '{{count}} ennemis',
      bosses: 'Boss',
      nBosses: '{{count}} boss',
      name: 'Nom',
      hpMultiplier: 'HP x',
      atkMultiplier: 'ATK x',
      type: 'Type',
      intro: 'Intro',
      boss: 'Boss',
      finalBoss: 'Boss final',
    },

    // ── Riddles ─────────────────────────────────────────
    riddles: {
      title: 'Enigmes',
      subtitle: 'Puzzles — {{count}} au total',
      allBiomes: 'Tous les biomes',
      reward: 'Recompense :',
      penalty: 'Penalite :',
    },

    // ── Shop ────────────────────────────────────────────
    shop: {
      title: 'Boutique',
      subtitle: 'Items disponibles — {{count}} items',
      name: 'Nom',
      description: 'Description',
      cost: 'Cout',
      blocMin: 'Bloc min',
      effect: 'Effet',
      bloc: 'Bloc {{n}}',
      blocPlus: 'Bloc {{n}}+',
      nItemsAvailable: '{{count}} items disponibles',
    },

    // ── Combat & Adventure ──────────────────────────────
    combat: {
      title: 'Combat & Aventure',
      subtitle: 'Parametres de combat et structure de l\'aventure',
      baseHp: 'HP de base : {{value}}',
      damage: 'Degats : {{value}}',
      aoe: 'AoE : {{value}}',
      yes: 'Oui',
      no: 'Non',
      settings: 'Parametres de combat',
      attackDamage: 'Degats d\'attaque',
      damagePerLevel: 'Degats par niveau',
      hpPerLevel: 'HP par niveau',
      healAmount: 'Soin',
      abilityCooldown: 'Cooldown competence',
      healCooldown: 'Cooldown soin',
      nTurns: '{{count}} tours',
      enemyScaling: 'Scaling ennemis',
      baseLevelPerBloc: 'Niveau de base par bloc',
      enemiesPerCombat: 'Ennemis par combat',
      bossLevelBonus: 'Bonus niveau boss',
      bossHpMultiplier: 'Multiplicateur HP boss',
      bossAtkMultiplier: 'Multiplicateur ATK boss',
      adventureStructure: 'Structure de l\'aventure',
      adventureDesc: '{{blocs}} blocs — Poids : Combat {{combat}}, Narratif {{narrative}}, Puzzle {{puzzle}}',
      firstBloc: 'Premier Bloc',
      middleBloc: 'Bloc Central',
      finalBloc: 'Bloc Final',
      early: 'Early',
      core: 'Core',
      resolve: 'Resolve',
      nScreens: '{{count}} ecrans',
      rangeScreens: '{{min}}–{{max}} ecrans',
      rest: 'Repos',
      restDesc: 'Restaure {{percent}}% des HP max',
    },

    // ── Rooms ───────────────────────────────────────────
    rooms: {
      title: 'Rooms',
      subtitle: 'Suivi des parties en temps reel',
      total: 'Total',
      lobby: 'Lobby',
      inProgress: 'En cours',
      finished: 'Terminee',
      recentRooms: 'Derniers rooms',
      loadError: 'Erreur de chargement : {{message}}',
      noRooms: 'Aucune room pour le moment',
      code: 'Code',
      status: 'Statut',
      players: 'Joueurs',
      bloc: 'Bloc',
      screen: 'Ecran',
      createdAt: 'Cree le',
    },

    // ── Shared ──────────────────────────────────────────
    common: {
      hp: 'HP',
      gold: 'Or',
      xp: 'XP',
    },
  },
};

export default fr;
