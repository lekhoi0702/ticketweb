import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventIcon from '@mui/icons-material/Event'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { useState } from 'react'
import { useAuth } from '../context/AuthProvider.jsx'

const drawerWidth = 260

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const navItems = [
    { to: '/', label: 'Tổng quan', icon: <DashboardIcon /> },
    { to: '/events', label: 'Sự kiện', icon: <EventIcon /> },
    { to: '/tickets', label: 'Vé', icon: <ConfirmationNumberIcon /> },
    { to: '/accounts', label: 'Tài khoản', icon: <PersonIcon /> },
    { to: '/users', label: 'Người dùng', icon: <PeopleIcon /> },
    { to: '/orders', label: 'Đơn hàng', icon: <ReceiptLongIcon /> },
  ]

  const drawer = (
    <Box sx={{ height: '100%' }}>
      <Toolbar>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Quản trị</Typography>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.to} component={RouterLink} to={item.to} onClick={() => setMobileOpen(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: '1px solid #e5e7eb', zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>Admin · TicketWeb</Typography>
          <Button onClick={() => navigate(0)}>Làm mới</Button>
          <Button color="error" onClick={logout}>Đăng xuất</Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}


