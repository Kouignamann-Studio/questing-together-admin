import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { Stack, HStack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import EffectBadges from '@/components/EffectBadges';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { BiomePhase } from '@/types/content';

const PhaseSection = ({ phase, phaseKey }: { phase: BiomePhase; phaseKey: string }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Box className="rounded-lg border border-border">
      <Button
        variant="ghost"
        className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors rounded-lg h-auto"
        onClick={() => setOpen(!open)}
      >
        <HStack className="gap-2">
          {open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          <Badge variant="outline">{t(`phase.${phaseKey}`)}</Badge>
          <Text as="span" size="sm" className="font-medium">{phase.theme}</Text>
        </HStack>
        <Text as="span" size="xs" muted>
          {t('phase.nNarratives', { count: phase.narratives.length })}
        </Text>
      </Button>

      {open && (
        <Stack className="gap-3 border-t border-border p-3">
          <Text size="sm" italic muted>{phase.ambiance}</Text>

          <Stack className="gap-1">
            <Text size="sm">
              <Text as="span" muted>{t('phase.combatIntro')} </Text>
              {phase.combatIntro}
            </Text>
            {phase.bossIntro && (
              <Text size="sm">
                <Text as="span" muted>{t('phase.bossIntro')} </Text>
                {phase.bossIntro}
              </Text>
            )}
          </Stack>

          {phase.narratives.length > 0 && (
            <Stack className="gap-3">
              <Text size="xs" className="font-medium uppercase tracking-wide" muted>
                {t('phase.narratives')}
              </Text>
              {phase.narratives.map((narrative) => (
                <Box key={narrative.id} className="rounded-md bg-muted/50 p-3">
                  <Stack className="gap-2">
                    <Text size="sm">{narrative.prompt}</Text>
                    <Stack className="gap-1">
                      {narrative.options.map((opt) => (
                        <HStack
                          key={opt.id}
                          className="items-start justify-between rounded-md bg-background p-2"
                        >
                          <Box>
                            <Text size="sm" className="font-medium">{opt.text}</Text>
                            <Text size="xs" muted italic>{opt.flavor}</Text>
                          </Box>
                          <EffectBadges effect={opt.effect} />
                        </HStack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default PhaseSection;
