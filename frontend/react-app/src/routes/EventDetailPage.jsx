import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEvent } from '../api/client.js';
import { Box, Button, Chip, Divider, Grid, Stack, TextField, Typography } from '@mui/material';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    (async () => {
      const data = await fetchEvent(Number(id));
      setEvent(data);
    })();
  }, [id]);

  const handleQuantityChange = (ticketTypeId, value) => {
    setQuantities((prev) => ({ ...prev, [ticketTypeId]: Number(value) }));
  };

  const selectedItems = useMemo(() => {
    return Object.entries(quantities)
      .filter(([, q]) => q > 0)
      .map(([ticket_type_id, quantity]) => ({ ticket_type_id: Number(ticket_type_id), quantity }));
  }, [quantities]);

  if (!event) return <Typography>Đang tải...</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>{event.name}</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={event.category} />
        <Chip label={event.status} />
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 2 }}>{event.location}</Typography>
      {event.banner_url && (
        <Box sx={{ mb: 2 }}>
          <img src={event.banner_url} alt={event.name} style={{ width: '100%', borderRadius: 8 }} />
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>Chọn vé</Typography>

      {/* Giả định sẽ hiển thị các loại vé nếu backend trả kèm, ở đây đặt input tổng quát */}
      <Grid container spacing={2}>
        {[1,2,3].map((fakeId) => (
          <Grid item xs={12} sm={6} md={4} key={fakeId}>
            <Stack spacing={1}>
              <Typography>Loại vé #{fakeId}</Typography>
              <TextField
                type="number"
                size="small"
                inputProps={{ min: 0 }}
                value={quantities[fakeId] ?? 0}
                onChange={(e) => handleQuantityChange(fakeId, e.target.value)}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" disabled={selectedItems.length === 0} onClick={() => navigate('/checkout', { state: { eventId: event.id, items: selectedItems } })}>
          Tiếp tục thanh toán
        </Button>
      </Stack>
    </Box>
  );
}


