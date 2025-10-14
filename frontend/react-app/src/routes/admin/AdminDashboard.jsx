import { Box, Grid, Paper, Typography } from '@mui/material';

function StatCard({ title, value }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
    </Paper>
  );
}

export default function AdminDashboard() {
  // Placeholder stats; can be wired to API later
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>Tổng quan</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}><StatCard title="Sự kiện" value="-" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Vé đã bán" value="-" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Doanh thu" value="-" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Đơn hàng" value="-" /></Grid>
      </Grid>
    </Box>
  );
}


