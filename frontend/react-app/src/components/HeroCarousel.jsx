import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const slides = [
  {
    title: 'Mua vé sự kiện cực nhanh',
    subtitle: 'Âm nhạc, thể thao, hội thảo và nhiều hơn nữa',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Khám phá lễ hội cuối tuần',
    subtitle: 'Trải nghiệm hấp dẫn cùng bạn bè',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function HeroCarousel() {
  return (
    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', mb: 4 }}>
      <Box sx={{ position: 'relative', height: 320 }}>
        <motion.img
          key={slides[0].image}
          src={slides[0].image}
          alt={slides[0].title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
        <Container maxWidth="lg" sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <Stack spacing={1} component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h3">{slides[0].title}</Typography>
            <Typography color="text.secondary">{slides[0].subtitle}</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Button variant="contained">Khám phá ngay</Button>
              <Button variant="outlined" color="inherit">Tạo sự kiện</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}


