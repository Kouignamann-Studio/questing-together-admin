import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/stack';

const LangSwitch = () => {
  const { i18n } = useTranslation();

  const toggle = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <HStack className="gap-1">
      <Button
        variant={i18n.language === 'fr' ? 'default' : 'ghost'}
        size="xs"
        onClick={() => toggle('fr')}
      >
        FR
      </Button>
      <Button
        variant={i18n.language === 'en' ? 'default' : 'ghost'}
        size="xs"
        onClick={() => toggle('en')}
      >
        EN
      </Button>
    </HStack>
  );
};

export default LangSwitch;
