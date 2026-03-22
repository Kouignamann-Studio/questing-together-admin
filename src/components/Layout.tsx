import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box } from '@/components/ui/box';
import { HStack, Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import LangSwitch from '@/components/LangSwitch';
import {
  Sword,
  TreePine,
  Skull,
  HelpCircle,
  ShoppingBag,
  Swords,
  Users,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/biomes', labelKey: 'nav.biomes', icon: TreePine },
  { to: '/enemies', labelKey: 'nav.enemies', icon: Skull },
  { to: '/riddles', labelKey: 'nav.riddles', icon: HelpCircle },
  { to: '/shop', labelKey: 'nav.shop', icon: ShoppingBag },
  { to: '/combat', labelKey: 'nav.combat', icon: Swords },
  { to: '/rooms', labelKey: 'nav.rooms', icon: Users },
  { to: '/vfx', labelKey: 'nav.vfx', icon: Sparkles },
];

const Layout = () => {
  const { t } = useTranslation();

  return (
    <Box className="dark flex min-h-screen bg-background text-foreground">
      <Stack className="w-56 shrink-0 border-r border-border bg-sidebar p-4">
        <HStack className="gap-2 mb-4 px-3">
          <Sword className="size-5 text-primary" />
          <Text as="span" size="sm" className="font-semibold tracking-tight">
            {t('nav.title')}
          </Text>
        </HStack>
        <Stack className="gap-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                }`
              }
            >
              <item.icon className="size-4" />
              {t(item.labelKey)}
            </NavLink>
          ))}
        </Stack>
        <LangSwitch />
      </Stack>
      <Box className="flex-1 overflow-auto p-6">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
