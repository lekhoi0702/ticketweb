import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2 }} component={motion.div} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 0.5 }} component={RouterLink} to="/" color="inherit" style={{ textDecoration: 'none' }}>
              TicketWeb
            </Typography>
            <Button component={RouterLink} to="/login">Đăng nhập</Button>
            <Button component={RouterLink} to="/register" variant="contained" color="primary">Đăng ký</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 4, borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} TicketWeb</Typography>
      </Box>
    </Box>
  );
}


