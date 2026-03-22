import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stack, HStack } from '@/components/ui/stack';
import { Box } from '@/components/ui/box';
import { Heading, Text } from '@/components/ui/text';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BiomeTab from '@/components/BiomeTab';
import { BIOMES } from '@/data/biomes';
import { ENEMIES_BY_BIOME } from '@/data/enemies';

const EnemiesPage = () => {
  const [activeBiome, setActiveBiome] = useState(BIOMES[0]?.id ?? '');
  const { t } = useTranslation();
  const enemies = ENEMIES_BY_BIOME[activeBiome];

  if (!enemies) return null;

  return (
    <Stack className="gap-6">
      <Box>
        <Heading>{t('enemies.title')}</Heading>
        <Text muted>{t('enemies.subtitle')}</Text>
      </Box>

      <HStack className="gap-1 rounded-lg bg-muted p-1">
        {BIOMES.map((biome) => (
          <BiomeTab
            key={biome.id}
            active={activeBiome === biome.id}
            onClick={() => setActiveBiome(biome.id)}
            label={biome.name}
          />
        ))}
      </HStack>

      <Box className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <Text as="span">{t('enemies.earlyPhase')}</Text>
              <Badge variant="outline">
                {t('enemies.nEnemies', { count: enemies.early.length })}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('enemies.name')}</TableHead>
                  <TableHead className="text-right">{t('enemies.hpMultiplier')}</TableHead>
                  <TableHead className="text-right">{t('enemies.atkMultiplier')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enemies.early.map((e) => (
                  <TableRow key={e.name}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell className="text-right">{e.hpMultiplier}</TableCell>
                    <TableCell className="text-right">{e.attackMultiplier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <Text as="span">{t('enemies.corePhase')}</Text>
              <Badge variant="outline">
                {t('enemies.nEnemies', { count: enemies.core.length })}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('enemies.name')}</TableHead>
                  <TableHead className="text-right">{t('enemies.hpMultiplier')}</TableHead>
                  <TableHead className="text-right">{t('enemies.atkMultiplier')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enemies.core.map((e) => (
                  <TableRow key={e.name}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell className="text-right">{e.hpMultiplier}</TableCell>
                    <TableCell className="text-right">{e.attackMultiplier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <Text as="span">{t('enemies.bosses')}</Text>
            <Badge variant="destructive">
              {t('enemies.nBosses', { count: enemies.bosses.length + 1 })}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('enemies.name')}</TableHead>
                <TableHead>{t('enemies.type')}</TableHead>
                <TableHead>{t('enemies.intro')}</TableHead>
                <TableHead className="text-right">{t('enemies.hpMultiplier')}</TableHead>
                <TableHead className="text-right">{t('enemies.atkMultiplier')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enemies.bosses.map((b) => (
                <TableRow key={b.name}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{t('enemies.boss')}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {b.intro}
                  </TableCell>
                  <TableCell className="text-right">{b.hpMultiplier}</TableCell>
                  <TableCell className="text-right">{b.attackMultiplier}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">{enemies.finalBoss.name}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{t('enemies.finalBoss')}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                  {enemies.finalBoss.intro}
                </TableCell>
                <TableCell className="text-right">{enemies.finalBoss.hpMultiplier}</TableCell>
                <TableCell className="text-right">{enemies.finalBoss.attackMultiplier}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default EnemiesPage;
