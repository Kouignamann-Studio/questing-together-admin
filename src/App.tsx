import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { queryClient } from './api/queryClient';
import Layout from './components/Layout';
import BiomesPage from './pages/BiomesPage';
import CombatSettingsPage from './pages/CombatSettingsPage';
import DashboardPage from './pages/DashboardPage';
import EnemiesPage from './pages/EnemiesPage';
import RiddlesPage from './pages/RiddlesPage';
import RoomsPage from './pages/RoomsPage';
import ShopPage from './pages/ShopPage';
import VfxEditorPage from './pages/VfxEditorPage';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/biomes" element={<BiomesPage />} />
            <Route path="/enemies" element={<EnemiesPage />} />
            <Route path="/riddles" element={<RiddlesPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/combat" element={<CombatSettingsPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/vfx" element={<VfxEditorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
