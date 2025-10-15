import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useAuth } from '../context/AuthProvider.jsx'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(form)
    } catch (err) {
      if (err?.message === 'NOT_ADMIN') setError('Tài khoản không có quyền quản trị')
      else setError('Đăng nhập thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper variant="outlined" sx={{ p: 3, width: 400, maxWidth: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>Đăng nhập quản trị</Typography>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField label="Tài khoản" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} fullWidth />
            <TextField type="password" label="Mật khẩu" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth />
            {error ? <Typography variant="body2" color="error">{error}</Typography> : null}
            <Button type="submit" variant="contained" disabled={submitting}>Đăng nhập</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}


