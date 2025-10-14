import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { api } from '../services/api.js'

export default function TicketsAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState([])
  const [ticketTypes, setTicketTypes] = useState([])
  const [form, setForm] = useState({ 
    event: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    status: true
  })
  const [editingId, setEditingId] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const [ticketTypesRes, eventsRes] = await Promise.all([
        api.get('/ticket-types/'),
        api.get('/events/')
      ])
      setRows(ticketTypesRes.data)
      setEvents(eventsRes.data)
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditingId(null)
    setForm({ 
      event: '',
      name: '',
      description: '',
      price: '',
      quantity: '',
      status: true
    })
    setOpen(true)
  }

  function openEdit(row) {
    setEditingId(row.id)
    setForm({
      event: row.event?.id || '',
      name: row.name || '',
      description: row.description || '',
      price: row.price || '',
      quantity: row.quantity || '',
      status: row.status !== false
    })
    setOpen(true)
  }

  async function save() {
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity)
      }
      
      if (editingId) {
        await api.patch(`/ticket-types/${editingId}/`, payload)
      } else {
        await api.post('/ticket-types/', payload)
      }
      
      setOpen(false)
      load()
    } catch (error) {
      console.error('Lỗi lưu loại vé:', error)
      alert('Lỗi: ' + (error.response?.data?.detail || error.message))
    }
  }

  async function remove(id) {
    if (!confirm('Bạn có chắc muốn xóa loại vé này?')) return
    try {
      await api.delete(`/ticket-types/${id}/`)
      load()
    } catch (error) {
      console.error('Lỗi xóa loại vé:', error)
      alert('Lỗi: ' + (error.response?.data?.detail || error.message))
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { 
      field: 'name', 
      headerName: 'Tên loại vé', 
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.description}
          </Typography>
        </Box>
      )
    },
    { 
      field: 'event', 
      headerName: 'Sự kiện', 
      width: 200,
      renderCell: (params) => params.value?.name || '-'
    },
    { 
      field: 'price', 
      headerName: 'Giá (VNĐ)', 
      width: 120,
      renderCell: (params) => params.value ? new Intl.NumberFormat('vi-VN').format(params.value) : '-'
    },
    { 
      field: 'quantity', 
      headerName: 'Tổng số', 
      width: 100,
      renderCell: (params) => params.value || 0
    },
    {
      field: 'sold',
      headerName: 'Đã bán',
      width: 100,
      renderCell: (params) => params.value || 0
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value ? 'Hoạt động' : 'Tạm dừng'} 
          color={params.value ? 'success' : 'warning'} 
          size="small" 
        />
      )
    },
    { 
      field: 'created_at', 
      headerName: 'Tạo lúc', 
      width: 180,
      renderCell: (params) => params.value ? new Date(params.value).toLocaleString('vi-VN') : '-'
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openEdit(params.row)}>Sửa</Button>
          <Button size="small" color="error" variant="outlined" onClick={() => remove(params.row.id)}>Xóa</Button>
        </Stack>
      )
    }
  ]

  // Thống kê
  const stats = {
    total: rows.length,
    active: rows.filter(r => r.status === true).length,
    inactive: rows.filter(r => r.status === false).length,
    totalRevenue: rows.reduce((sum, r) => sum + (parseFloat(r.price) * (r.sold || 0)), 0)
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Quản lý Loại Vé</Typography>
        <Button variant="contained" onClick={openCreate}>
          Tạo loại vé mới
        </Button>
      </Stack>

      {/* Thống kê */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Tổng vé</Typography>
              <Typography variant="h5">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Đang bán</Typography>
              <Typography variant="h5" color="success.main">{stats.active}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Tạm dừng</Typography>
              <Typography variant="h5" color="warning.main">{stats.inactive}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Doanh thu</Typography>
              <Typography variant="h5" color="primary.main">
                {new Intl.NumberFormat('vi-VN').format(stats.totalRevenue)} VNĐ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          sx={{
            border: 0,
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
          }}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Sửa loại vé' : 'Tạo loại vé mới'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Sự kiện</InputLabel>
              <Select
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
                label="Sự kiện"
              >
                {events.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Tên loại vé"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              required
              placeholder="Ví dụ: VIP, Standard, Early Bird"
            />

            <TextField
              label="Mô tả"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              fullWidth
              multiline
              minRows={2}
              placeholder="Mô tả chi tiết về loại vé..."
            />

            <TextField
              label="Giá vé (VNĐ)"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              fullWidth
              required
              placeholder="Nhập giá vé"
            />

            <TextField
              label="Số lượng"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              fullWidth
              required
              placeholder="Nhập số lượng vé"
            />

            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                label="Trạng thái"
              >
                <MenuItem value={true}>Hoạt động</MenuItem>
                <MenuItem value={false}>Tạm dừng</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button 
            onClick={save} 
            variant="contained" 
            disabled={!form.event || !form.name || !form.price || !form.quantity}
          >
            {editingId ? 'Cập nhật' : 'Tạo loại vé'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
