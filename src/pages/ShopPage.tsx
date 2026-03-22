import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stack, HStack } from '@/components/ui/stack';
import { Box } from '@/components/ui/box';
import { Heading, Text } from '@/components/ui/text';
import EffectBadges from '@/components/EffectBadges';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SHOP_ITEMS } from '@/data/shop';

const ShopPage = () => {
  const { t } = useTranslation();

  return (
    <Stack className="gap-6">
      <Box>
        <Heading>{t('shop.title')}</Heading>
        <Text muted>{t('shop.subtitle', { count: SHOP_ITEMS.length })}</Text>
      </Box>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>{t('shop.name')}</TableHead>
                <TableHead>{t('shop.description')}</TableHead>
                <TableHead className="text-right">{t('shop.cost')}</TableHead>
                <TableHead>{t('shop.blocMin')}</TableHead>
                <TableHead>{t('shop.effect')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SHOP_ITEMS.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-lg">{item.icon}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.description}</TableCell>
                  <TableCell className="text-right font-mono">{item.cost}g</TableCell>
                  <TableCell>
                    <Badge variant="outline">{t('shop.blocPlus', { n: item.minBloc })}</Badge>
                  </TableCell>
                  <TableCell>
                    <EffectBadges effect={item.effect} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Box className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((bloc) => {
          const available = SHOP_ITEMS.filter((i) => i.minBloc <= bloc);
          return (
            <Card key={bloc}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t('shop.bloc', { n: bloc })}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" muted className="mb-2">
                  {t('shop.nItemsAvailable', { count: available.length })}
                </Text>
                <Stack className="gap-1">
                  {available.map((item) => (
                    <HStack
                      key={item.id}
                      className="justify-between rounded-md bg-muted/50 px-2 py-1"
                    >
                      <Text size="sm">
                        {item.icon} {item.name}
                      </Text>
                      <Text size="sm" mono muted>{item.cost}g</Text>
                    </HStack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ShopPage;
