import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stack, HStack } from '@/components/ui/stack';
import { Box } from '@/components/ui/box';
import { Heading, Text } from '@/components/ui/text';
import { BIOMES } from '@/data/biomes';
import { ENEMIES_BY_BIOME } from '@/data/enemies';
import { RIDDLES } from '@/data/riddles';
import { SHOP_ITEMS } from '@/data/shop';
import { TreePine, Skull, HelpCircle, ShoppingBag } from 'lucide-react';

const DashboardPage = () => {
  const { t } = useTranslation();

  const stats = [
    {
      label: t('dashboard.stats.biomes'),
      value: BIOMES.length,
      icon: TreePine,
      description: t('dashboard.stats.biomesDesc'),
    },
    {
      label: t('dashboard.stats.enemies'),
      value: Object.values(ENEMIES_BY_BIOME).reduce(
        (sum, b) => sum + b.early.length + b.core.length + b.bosses.length + 1,
        0,
      ),
      icon: Skull,
      description: t('dashboard.stats.enemiesDesc'),
    },
    {
      label: t('dashboard.stats.riddles'),
      value: RIDDLES.length,
      icon: HelpCircle,
      description: t('dashboard.stats.riddlesDesc'),
    },
    {
      label: t('dashboard.stats.shopItems'),
      value: SHOP_ITEMS.length,
      icon: ShoppingBag,
      description: t('dashboard.stats.shopItemsDesc'),
    },
  ];

  return (
    <Stack className="gap-6">
      <Box>
        <Heading>{t('dashboard.title')}</Heading>
        <Text muted>{t('dashboard.subtitle')}</Text>
      </Box>

      <Box className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Text className="text-3xl font-bold">{stat.value}</Text>
              <Text size="xs" muted>{stat.description}</Text>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('dashboard.biomesCard')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack className="gap-3">
              {BIOMES.map((biome) => {
                const enemies = ENEMIES_BY_BIOME[biome.id];
                const totalEnemies = enemies
                  ? enemies.early.length + enemies.core.length + enemies.bosses.length + 1
                  : 0;
                const totalNarratives =
                  biome.phases.early.narratives.length +
                  biome.phases.core.narratives.length +
                  biome.phases.resolve.narratives.length;
                return (
                  <HStack
                    key={biome.id}
                    className="justify-between rounded-lg border border-border p-3"
                  >
                    <Box>
                      <Text className="font-medium">{biome.name}</Text>
                      <Text size="xs" muted>{biome.description}</Text>
                    </Box>
                    <HStack className="gap-3">
                      <Text size="xs" muted>
                        {t('dashboard.nEnemies', { count: totalEnemies })}
                      </Text>
                      <Text size="xs" muted>
                        {t('dashboard.nNarratives', { count: totalNarratives })}
                      </Text>
                    </HStack>
                  </HStack>
                );
              })}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('dashboard.shopByBloc')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack className="gap-3">
              {[1, 2, 3].map((bloc) => {
                const items = SHOP_ITEMS.filter((i) => i.minBloc === bloc);
                return (
                  <Box key={bloc} className="rounded-lg border border-border p-3">
                    <Text size="sm" className="mb-1 font-medium">
                      {t('dashboard.bloc', { n: bloc })}
                    </Text>
                    <HStack className="gap-2 flex-wrap">
                      {items.map((item) => (
                        <Text
                          key={item.id}
                          as="span"
                          size="xs"
                          className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1"
                        >
                          {item.icon} {item.name} — {item.cost}g
                        </Text>
                      ))}
                      {items.length === 0 && (
                        <Text size="xs" muted>{t('dashboard.noItemsForBloc')}</Text>
                      )}
                    </HStack>
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default DashboardPage;
