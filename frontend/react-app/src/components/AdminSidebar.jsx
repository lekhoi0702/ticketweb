import { Box, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function AdminSidebar({ onNavigate }) {
  const location = useLocation();
  const navItems = [
    { to: '/admin', label: 'Tổng quan', icon: <DashboardIcon /> },
    { to: '/admin/events', label: 'Sự kiện', icon: <EventIcon /> },
    { to: '/admin/tickets', label: 'Vé', icon: <ConfirmationNumberIcon /> },
    { to: '/admin/orders', label: 'Đơn hàng', icon: <ReceiptLongIcon /> },
    { to: '/admin/promotions', label: 'Khuyến mãi', icon: <LocalOfferIcon /> },
    { to: '/admin/ticket-types', label: 'Loại vé', icon: <CategoryIcon /> },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Quản trị</Typography>
      </Toolbar>
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const selected = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));
          return (
            <ListItemButton key={item.to} component={RouterLink} to={item.to} selected={selected} onClick={onNavigate}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}


