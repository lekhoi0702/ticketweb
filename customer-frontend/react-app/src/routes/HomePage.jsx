import { useEffect, useState } from 'react';
import { Box, Button, Chip, Container, Grid, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchEvents } from '../api/client.js';
import EventCard from '../components/EventCard.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEvents();
        const list = Array.isArray(data) ? data : (data && Array.isArray(data.results) ? data.results : []);
        setEvents(list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const safeEvents = Array.isArray(events) ? events : [];

  return (
    <Box>
      {/* Hero */}
      <HeroCarousel />

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Sự kiện nổi bật</Typography>
      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rounded" height={260} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {safeEvents.length === 0 && (
            <Box sx={{ p: 4 }}>
              <Typography>Chưa có sự kiện nào.</Typography>
            </Box>
          )}
          {safeEvents.map((ev) => (
            <Grid item key={ev.id} xs={12} sm={6} md={4}>
              <EventCard ev={ev} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}


