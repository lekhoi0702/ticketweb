import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e5e7eb' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component={RouterLink as any} to="/" color="inherit" style={{ textDecoration: 'none' }}>
            TicketWeb
          </Typography>
          <Button component={RouterLink as any} to="/login">Đăng nhập</Button>
          <Button component={RouterLink as any} to="/register" variant="contained">Đăng ký</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4, flex: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 4, borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} TicketWeb</Typography>
      </Box>
    </Box>
  );
}


