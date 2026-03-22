import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { Box } from '@/components/ui/box';
import { Heading, Text } from '@/components/ui/text';
import PhaseSection from '@/components/PhaseSection';
import { BIOMES } from '@/data/biomes';
import { ChevronDown, ChevronRight } from 'lucide-react';

const BiomesPage = () => {
  const [expandedBiome, setExpandedBiome] = useState<string | null>(BIOMES[0]?.id ?? null);
  const { t } = useTranslation();

  return (
    <Stack className="gap-6">
      <Box>
        <Heading>{t('biomes.title')}</Heading>
        <Text muted>{t('biomes.subtitle')}</Text>
      </Box>

      <Stack className="gap-4">
        {BIOMES.map((biome) => {
          const isExpanded = expandedBiome === biome.id;
          return (
            <Card key={biome.id}>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandedBiome(isExpanded ? null : biome.id)}
              >
                <Stack className="flex-row items-center justify-between">
                  <Box>
                    <CardTitle>{biome.name}</CardTitle>
                    <CardDescription>{biome.description}</CardDescription>
                  </Box>
                  <Button variant="ghost" size="icon">
                    {isExpanded ? (
                      <ChevronDown className="size-4" />
                    ) : (
                      <ChevronRight className="size-4" />
                    )}
                  </Button>
                </Stack>
              </CardHeader>

              {isExpanded && (
                <CardContent>
                  <Stack className="gap-3">
                    {(['early', 'core', 'resolve'] as const).map((phaseKey) => (
                      <PhaseSection
                        key={phaseKey}
                        phaseKey={phaseKey}
                        phase={biome.phases[phaseKey]}
                      />
                    ))}
                  </Stack>
                </CardContent>
              )}
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default BiomesPage;
