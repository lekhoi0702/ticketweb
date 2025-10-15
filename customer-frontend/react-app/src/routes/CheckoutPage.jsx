import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { createOrder, processPayment } from '../api/client.js';

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const eventId = state?.eventId;
  const items = state?.items ?? [];

  const onSubmit = async (e) => {
    e.preventDefault();
    // In a real app, user_id should come from auth profile
    const userId = 1;
    try {
      const order = await createOrder({ user_id: userId, event_id: eventId, items });
      await processPayment(order.id ?? order.order_id ?? 1, { payment_method: 'cash' });
      navigate('/')
    } catch (err) {
      alert('Thanh toán thất bại');
    }
  };

  if (!eventId || items.length === 0) return <Typography>Không có dữ liệu đặt vé.</Typography>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 3, width: 520 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Thanh toán</Typography>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField label="Mã khuyến mãi" placeholder="Nhập nếu có" />
            <Button type="submit" variant="contained">Thanh toán</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}


