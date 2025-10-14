import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { api } from '../../src/api/client.js';

export default function EventsAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', location: '', start_time: '', end_time: '' });
  const [editingId, setEditingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get('/events/');
      setRows(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditingId(null);
    setForm({ name: '', category: '', location: '', start_time: '', end_time: '' });
    setOpen(true);
  }

  function openEdit(row) {
    setEditingId(row.id);
    setForm({
      name: row.name ?? '',
      category: row.category ?? '',
      location: row.location ?? '',
      start_time: row.start_time?.slice(0, 16) ?? '',
      end_time: row.end_time?.slice(0, 16) ?? '',
    });
    setOpen(true);
  }

  async function save() {
    const payload = { ...form };
    if (editingId) {
      await api.put(`/events/${editingId}/`, payload);
    } else {
      await api.post('/events/', payload);
    }
    setOpen(false);
    await load();
  }

  async function remove(id) {
    await api.delete(`/events/${id}/`);
    await load();
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Tên', flex: 1 },
    { field: 'category', headerName: 'Danh mục', width: 160 },
    { field: 'location', headerName: 'Địa điểm', width: 220 },
    { field: 'status', headerName: 'Trạng thái', width: 140 },
    { field: 'start_time', headerName: 'Bắt đầu', width: 180 },
    { field: 'end_time', headerName: 'Kết thúc', width: 180 },
    {
      field: 'actions', headerName: 'Hành động', width: 200, sortable: false, renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openEdit(params.row)}>Sửa</Button>
          <Button size="small" color="error" variant="outlined" onClick={() => remove(params.row.id)}>Xóa</Button>
        </Stack>
      )
    }
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Sự kiện</Typography>
        <Button variant="contained" onClick={openCreate}>Tạo sự kiện</Button>
      </Stack>
      <Paper sx={{ height: 560 }}>
        <DataGrid rows={rows} columns={columns} loading={loading} disableRowSelectionOnClick pageSizeOptions={[10, 25, 50]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Sửa sự kiện' : 'Tạo sự kiện'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField label="Tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
            <TextField label="Danh mục" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth />
            <TextField label="Địa điểm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} fullWidth />
            <TextField label="Bắt đầu" type="datetime-local" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} fullWidth />
            <TextField label="Kết thúc" type="datetime-local" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={save} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


