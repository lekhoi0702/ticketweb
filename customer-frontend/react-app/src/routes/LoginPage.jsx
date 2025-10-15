import { useState } from 'react';
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { loginUser } from '../api/client.js';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem('accessToken', res.access);
      window.location.href = '/';
    } catch (err) {
      setError('Đăng nhập thất bại');
    }
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: '70vh' }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 800 }}>Chào mừng trở lại</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Đăng nhập để tiếp tục đặt vé</Typography>
          <Paper sx={{ p: 3, maxWidth: 420 }}>
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <TextField label="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth />
                <TextField label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Button type="submit" variant="contained" size="large">Đăng nhập</Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop" alt="login" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
        </Box>
      </Grid>
    </Grid>
  );
}


