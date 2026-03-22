import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { HStack } from '@/components/ui/stack';
import type { ScreenEffect } from '@/types/content';

const EffectBadges = ({ effect }: { effect: ScreenEffect }) => {
  const { t } = useTranslation();

  return (
    <HStack className="gap-1 flex-wrap">
      {effect.hpDelta != null && effect.hpDelta !== 0 && (
        <Badge variant={effect.hpDelta > 0 ? 'default' : 'destructive'}>
          {effect.hpDelta > 0 ? '+' : ''}{effect.hpDelta} {t('common.hp')}
        </Badge>
      )}
      {effect.goldDelta != null && effect.goldDelta !== 0 && (
        <Badge variant={effect.goldDelta > 0 ? 'secondary' : 'destructive'}>
          {effect.goldDelta > 0 ? '+' : ''}{effect.goldDelta} {t('common.gold')}
        </Badge>
      )}
      {effect.expDelta != null && effect.expDelta !== 0 && (
        <Badge variant={effect.expDelta > 0 ? 'outline' : 'destructive'}>
          {effect.expDelta > 0 ? '+' : ''}{effect.expDelta} {t('common.xp')}
        </Badge>
      )}
    </HStack>
  );
};

export default EffectBadges;
