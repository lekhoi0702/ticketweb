import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material'

function Stat({ label, value, color = 'primary' }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{label}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: `${color}.main` }}>{value}</Typography>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>Tổng quan hệ thống</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Tổng sự kiện" value="12" color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Vé đã bán" value="1,234" color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Doanh thu" value="$45,678" color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Đơn hàng" value="89" color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Người dùng" value="567" color="secondary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Tài khoản" value="234" color="error" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Sự kiện đang diễn ra" value="3" color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stat label="Đơn hàng chờ xử lý" value="12" color="warning" />
        </Grid>
      </Grid>
    </Box>
  )
}


