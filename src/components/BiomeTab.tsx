import { Button } from '@/components/ui/button';

const BiomeTab = ({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) => (
  <Button
    variant={active ? 'default' : 'outline'}
    size="sm"
    onClick={onClick}
    className={active ? '' : 'hover:bg-accent hover:text-accent-foreground'}
  >
    {label}
  </Button>
);

export default BiomeTab;
