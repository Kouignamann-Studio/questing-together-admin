import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Stack, HStack } from '@/components/ui/stack';
import { Box } from '@/components/ui/box';
import { Heading, Text } from '@/components/ui/text';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatRow from '@/components/StatRow';
import { COMBAT, ADVENTURE } from '@/data/combat';
import type { RoleId } from '@/types/content';

const ROLE_COLORS: Record<RoleId, string> = {
  warrior: 'bg-red-500/10 text-red-400',
  sage: 'bg-blue-500/10 text-blue-400',
  ranger: 'bg-green-500/10 text-green-400',
};

const ROLL_COLORS: Record<string, string> = {
  'Critical Fail': 'text-muted-foreground',
  Weak: 'text-red-400',
  Normal: 'text-foreground',
  Strong: 'text-amber-400',
  Critical: 'text-yellow-300',
};

const CombatSettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Stack className="gap-6">
      <Box>
        <Heading>{t('combat.title')}</Heading>
        <Text muted>{t('combat.subtitle')}</Text>
      </Box>

      {/* Turn system overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Turn-Based Combat</CardTitle>
          <CardDescription>
            Each turn: Player Phase (simultaneous, {COMBAT.actionsPerTurn} actions each) → Enemy Phase (auto, front 3 attack all players)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="rounded-lg border border-border p-3 bg-muted/20 font-mono text-xs leading-relaxed">
            <Text size="xs" mono>TURN N</Text>
            <Text size="xs" mono className="ml-2">├── Player Phase (simultaneous)</Text>
            <Text size="xs" mono className="ml-4">├── {COMBAT.actionsPerTurn} actions per player (attack / ability / heal)</Text>
            <Text size="xs" mono className="ml-4">├── Actions apply damage immediately</Text>
            <Text size="xs" mono className="ml-4">├── D20 roll on each action (see table below)</Text>
            <Text size="xs" mono className="ml-4">└── "End Turn" when done → wait for all players</Text>
            <Text size="xs" mono className="ml-2">├── Enemy Phase (automatic)</Text>
            <Text size="xs" mono className="ml-4">├── Front 3 enemies attack all alive players</Text>
            <Text size="xs" mono className="ml-4">├── Taunt redirects all damage (-60%)</Text>
            <Text size="xs" mono className="ml-4">└── Cooldowns decrement by 1</Text>
            <Text size="xs" mono className="ml-2">└── TURN N+1 (reset actions)</Text>
          </Box>
        </CardContent>
      </Card>

      {/* Roles */}
      <Box className="grid gap-4 lg:grid-cols-3">
        {(Object.entries(COMBAT.abilities) as [RoleId, typeof COMBAT.abilities.warrior][]).map(
          ([roleId, ability]) => (
            <Card key={roleId}>
              <CardHeader className="pb-3">
                <HStack className="justify-between">
                  <CardTitle className="text-base capitalize">{roleId}</CardTitle>
                  <Text as="span" className="text-lg">{ability.icon}</Text>
                </HStack>
                <CardDescription>
                  {t('combat.baseHp', { value: COMBAT.baseHpByRole[roleId] })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack className="gap-2">
                  <Box className={`rounded-md p-2.5 ${ROLE_COLORS[roleId]}`}>
                    <Text className="font-medium">{ability.label}</Text>
                    <Text size="xs" className="opacity-80">{ability.subtitle}</Text>
                  </Box>
                  <Stack className="gap-0">
                    <Text size="xs" muted>
                      {t('combat.damage', { value: ability.damage })}
                    </Text>
                    <Text size="xs" muted>
                      {t('combat.aoe', { value: ability.aoe ? t('combat.yes') : t('combat.no') })}
                    </Text>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ),
        )}
      </Box>

      <Box className="grid gap-4 lg:grid-cols-2">
        {/* Combat stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('combat.settings')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack className="gap-0">
              <StatRow label="Actions per turn" value={COMBAT.actionsPerTurn} />
              <StatRow label={t('combat.attackDamage')} value={`${COMBAT.attackDamage} + (level - 1)`} />
              <StatRow label={t('combat.hpPerLevel')} value={`+${COMBAT.hpPerLevel}`} />
              <StatRow label={t('combat.healAmount')} value={COMBAT.healAmount} />
              <Separator className="my-2" />
              <StatRow
                label={t('combat.abilityCooldown')}
                value={`${COMBAT.abilityCooldown} turns`}
              />
              <StatRow
                label={t('combat.healCooldown')}
                value={`${COMBAT.healCooldown} turns`}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* D20 Roll table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">D20 Roll System</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Effect</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMBAT.rollOutcomes.map((outcome) => (
                  <TableRow key={outcome.label}>
                    <TableCell className="font-mono">{outcome.range}</TableCell>
                    <TableCell className={ROLL_COLORS[outcome.label] ?? ''}>{outcome.label}</TableCell>
                    <TableCell>{outcome.effect}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      {/* Enemy scaling */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('combat.enemyScaling')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack className="gap-0">
            <StatRow label={t('combat.baseLevelPerBloc')} value={ADVENTURE.scaling.baseLevelPerBloc} />
            <StatRow label={t('combat.enemiesPerCombat')} value={`${ADVENTURE.scaling.enemiesPerCombat.min}–${ADVENTURE.scaling.enemiesPerCombat.max}`} />
            <StatRow label="Front row (active)" value="3 max" />
            <Separator className="my-2" />
            <StatRow label={t('combat.bossLevelBonus')} value={`+${ADVENTURE.scaling.bossLevelBonus}`} />
            <StatRow label={t('combat.bossHpMultiplier')} value={`×${ADVENTURE.scaling.bossHpMultiplier}`} />
            <StatRow label={t('combat.bossAtkMultiplier')} value={`×${ADVENTURE.scaling.bossAttackMultiplier}`} />
          </Stack>
        </CardContent>
      </Card>

      {/* Adventure structure */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('combat.adventureStructure')}</CardTitle>
          <CardDescription>
            {t('combat.adventureDesc', {
              blocs: ADVENTURE.totalBlocs,
              combat: ADVENTURE.screenWeights.core.combat,
              narrative: ADVENTURE.screenWeights.core.narrative_choice,
              puzzle: ADVENTURE.screenWeights.core.puzzle,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Stack className="gap-3">
            <Box className="grid gap-3 sm:grid-cols-3">
              {(['first', 'middle', 'final'] as const).map((blocKey) => {
                const bloc = ADVENTURE.blocs[blocKey];
                return (
                  <Box key={blocKey} className="rounded-lg border border-border p-3">
                    <Stack className="gap-2">
                      <Text className="font-medium">{t(`combat.${blocKey}Bloc`)}</Text>
                      {bloc.early ? (
                        <HStack className="justify-between">
                          <Text size="sm" muted>{t('combat.early')}</Text>
                          <Text size="sm" mono>{t('combat.rangeScreens', { min: bloc.early.min, max: bloc.early.max })}</Text>
                        </HStack>
                      ) : null}
                      <HStack className="justify-between">
                        <Text size="sm" muted>{t('combat.core')}</Text>
                        <Text size="sm" mono>{t('combat.rangeScreens', { min: bloc.core.min, max: bloc.core.max })}</Text>
                      </HStack>
                      <HStack className="justify-between">
                        <Text size="sm" muted>{t('combat.resolve')}</Text>
                        <Text size="sm" mono>{t('combat.nScreens', { count: bloc.resolve })}</Text>
                      </HStack>
                    </Stack>
                  </Box>
                );
              })}
            </Box>
            <HStack className="gap-2">
              <Badge variant="outline">{t('combat.rest')}</Badge>
              <Text size="sm" muted>{t('combat.restDesc', { percent: ADVENTURE.rest.hpRestorePercent })}</Text>
            </HStack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CombatSettingsPage;
