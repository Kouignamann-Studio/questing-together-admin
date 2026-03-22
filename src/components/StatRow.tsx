import { HStack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

const StatRow = ({ label, value }: { label: string; value: string | number }) => (
  <HStack className="justify-between py-1.5">
    <Text size="sm" muted>{label}</Text>
    <Text size="sm" mono className="font-medium">{value}</Text>
  </HStack>
);

export default StatRow;
