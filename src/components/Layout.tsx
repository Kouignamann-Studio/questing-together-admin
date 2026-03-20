import { NavLink, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard' },
  { to: '/biomes', label: 'Biomes' },
  { to: '/enemies', label: 'Enemies' },
  { to: '/riddles', label: 'Riddles' },
  { to: '/shop', label: 'Shop' },
  { to: '/combat', label: 'Combat' },
  { to: '/rooms', label: 'Rooms' },
];

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav
        style={{
          width: 220,
          backgroundColor: '#1a1a2e',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <h2 style={{ color: '#f0d6a7', marginBottom: 20, fontSize: 18 }}>
          Questing Admin
        </h2>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              color: isActive ? '#f0d6a7' : '#a0a0a0',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: 6,
              backgroundColor: isActive ? '#2a2a4a' : 'transparent',
              fontSize: 14,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main style={{ flex: 1, padding: 24, backgroundColor: '#0f0f1a', color: '#e0e0e0' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
