import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stack, HStack } from '@/components/ui/stack';
import { Box } from '@/components/ui/box';
import { Heading, Text } from '@/components/ui/text';
import EffectBadges from '@/components/EffectBadges';
import { RIDDLES } from '@/data/riddles';
import { BIOMES } from '@/data/biomes';

const RiddlesPage = () => {
  const { t } = useTranslation();

  const biomeName = (id: string | null) => {
    if (!id) return t('riddles.allBiomes');
    return BIOMES.find((b) => b.id === id)?.name ?? id;
  };

  return (
    <Stack className="gap-6">
      <Box>
        <Heading>{t('riddles.title')}</Heading>
        <Text muted>{t('riddles.subtitle', { count: RIDDLES.length })}</Text>
      </Box>

      <Box className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {RIDDLES.map((riddle) => (
          <Card key={riddle.id}>
            <CardHeader className="pb-3">
              <HStack className="justify-between">
                <Badge variant="outline">{biomeName(riddle.biome)}</Badge>
                <Text as="span" size="xs" muted>{riddle.timeLimit}s</Text>
              </HStack>
              <CardTitle className="text-sm leading-relaxed">{riddle.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack className="gap-3">
                <Stack className="gap-1">
                  {riddle.choices.map((choice) => (
                    <Box
                      key={choice.id}
                      className={`rounded-md px-2.5 py-1.5 ${
                        choice.correct
                          ? 'bg-green-500/10 text-green-400 font-medium'
                          : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      <Text size="sm">{choice.text}</Text>
                    </Box>
                  ))}
                </Stack>

                <Stack className="gap-1 border-t border-border pt-2">
                  <HStack className="gap-1">
                    <Text size="xs" muted>{t('riddles.reward')}</Text>
                    <EffectBadges effect={riddle.reward} />
                  </HStack>
                  <HStack className="gap-1">
                    <Text size="xs" muted>{t('riddles.penalty')}</Text>
                    <EffectBadges effect={riddle.penalty} />
                  </HStack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};

export default RiddlesPage;
