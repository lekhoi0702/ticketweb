import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';

export default function EventCard({ ev }) {
  const isMeaningful = (v) => v && v !== 'string' && String(v).trim().length > 0;
  const title = isMeaningful(ev?.name) ? ev.name : 'Sự kiện';
  const category = isMeaningful(ev?.category) ? ev.category : '';
  const status = isMeaningful(ev?.status) ? ev.status : '';
  const location = isMeaningful(ev?.location) ? ev.location : 'Địa điểm cập nhật sau';
  const start = ev?.start_time ? dayjs(ev.start_time).format('DD/MM/YYYY HH:mm') : '';

  const pickImage = () => {
    const candidate = ev?.banner_url || ev?.logo_url;
    if (candidate && /^https?:\/\//i.test(candidate)) return candidate;
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop';
  };
  const imageUrl = pickImage();

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.06)' }}>
        <CardActionArea component={RouterLink} to={`/events/${ev.id}`}>
          <CardMedia component="img" height="200" image={imageUrl} alt={title} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop'; }} />
          <CardContent>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              {category && <Chip size="small" label={category} />}
              {status && <Chip size="small" label={status} />}
            </Stack>
            <Typography gutterBottom variant="h6" component="div" noWrap>{title}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>{location}</Typography>
            {start && <Typography variant="caption" color="text.secondary">{start}</Typography>}
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}


