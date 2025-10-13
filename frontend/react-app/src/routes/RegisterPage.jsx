import { useState } from 'react';
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { registerUser } from '../api/client.js';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '', fullname: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onChange = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await registerUser(form);
      if (res && res.message) {
        setMessage('Đăng ký thành công. Vui lòng đăng nhập.');
      } else {
        setMessage('Đăng ký thành công.');
      }
    } catch (err) {
      setError('Đăng ký thất bại');
    }
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: '70vh' }}>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop" alt="register" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 800 }}>Tạo tài khoản</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Chỉ mất vài giây để bắt đầu</Typography>
          <Paper sx={{ p: 3, maxWidth: 520 }}>
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <TextField label="Tên đăng nhập" value={form.username} onChange={(e) => onChange('username', e.target.value)} required fullWidth />
                <TextField label="Mật khẩu" type="password" value={form.password} onChange={(e) => onChange('password', e.target.value)} required fullWidth />
                <TextField label="Họ và tên" value={form.fullname} onChange={(e) => onChange('fullname', e.target.value)} required fullWidth />
                <TextField label="Email" type="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} required fullWidth />
                <TextField label="Số điện thoại" value={form.phone} onChange={(e) => onChange('phone', e.target.value)} fullWidth />
                {message && <Typography color="primary" variant="body2">{message}</Typography>}
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Button type="submit" variant="contained" size="large">Đăng ký</Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}


