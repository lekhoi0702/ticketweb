import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography, Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { api } from '../services/api.js'

export default function EventsAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ 
    name: '', 
    category: '', 
    location: '', 
    start_time: '', 
    end_time: '', 
    status: 'draft',
    description: ''
  })
  const [editingId, setEditingId] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/events/')
      setRows(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditingId(null)
    setForm({ 
      name: '', 
      category: '', 
      location: '', 
      start_time: '', 
      end_time: '', 
      status: 'draft',
      description: ''
    })
    setOpen(true)
  }

  function openEdit(row) {
    setEditingId(row.id)
    setForm({
      name: row.name ?? '',
      category: row.category ?? '',
      location: row.location ?? '',
      start_time: row.start_time ? new Date(row.start_time).toISOString().slice(0,16) : '',
      end_time: row.end_time ? new Date(row.end_time).toISOString().slice(0,16) : '',
      status: row.status ?? 'draft',
      description: row.description ?? ''
    })
    setOpen(true)
  }

  async function save() {
    try {
      const payload = { ...form }
      // Remove empty strings to avoid validation errors
      Object.keys(payload).forEach(key => {
        if (payload[key] === '') {
          delete payload[key]
        }
      })
      
      // Backend requires ISO 8601; ensure strings are in ISO if provided
      if (payload.start_time && !payload.start_time.endsWith('Z')) {
        payload.start_time = new Date(payload.start_time).toISOString()
      }
      if (payload.end_time && !payload.end_time.endsWith('Z')) {
        payload.end_time = new Date(payload.end_time).toISOString()
      }
      
      console.log('Sending payload:', payload)
      
      if (editingId) {
        // Use PATCH to avoid sending required fields like organizer
        await api.patch(`/events/${editingId}/`, payload)
      } else {
        await api.post('/events/', payload)
      }
      setOpen(false)
      await load()
    } catch (error) {
      console.error('Save event error:', error.response?.data || error.message)
      alert('Lỗi khi lưu: ' + (JSON.stringify(error.response?.data || error.message)))
    }
  }

  async function remove(id) {
    await api.delete(`/events/${id}/`)
    await load()
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name', 
      headerName: 'Tên sự kiện', 
      flex: 1, 
      minWidth: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.category} • {params.row.location}
          </Typography>
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: (params) => {
        const colors = {
          draft: { color: 'default', label: 'Nháp' },
          published: { color: 'primary', label: 'Xuất bản' },
          ongoing: { color: 'success', label: 'Đang diễn ra' },
          completed: { color: 'info', label: 'Hoàn thành' },
          cancelled: { color: 'error', label: 'Đã hủy' }
        }
        const config = colors[params.value] || { color: 'default', label: params.value }
        return <Chip label={config.label} color={config.color} size="small" />
      }
    },
    {
      field: 'start_time',
      headerName: 'Thời gian',
      width: 200,
      renderCell: (params) => {
        if (!params.value) return '-'
        const start = new Date(params.value)
        const end = params.row.end_time ? new Date(params.row.end_time) : null
        
        return (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {start.toLocaleDateString('vi-VN')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {start.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              {end && ` - ${end.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`}
            </Typography>
          </Box>
        )
      }
    },
    { 
      field: 'organizer', 
      headerName: 'Người tổ chức', 
      width: 140, 
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value?.username || '-'}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button 
            size="small" 
            variant="outlined" 
            onClick={() => openEdit(params.row)}
            sx={{ minWidth: 'auto', px: 1 }}
          >
            Sửa
          </Button>
          <Button 
            size="small" 
            color="error" 
            variant="outlined" 
            onClick={() => remove(params.row.id)}
            sx={{ minWidth: 'auto', px: 1 }}
          >
            Xóa
          </Button>
        </Stack>
      )
    }
  ]

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Sự kiện</Typography>
        <Button variant="contained" onClick={openCreate}>Tạo sự kiện</Button>
      </Stack>
      <Paper sx={{ height: 600 }}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          loading={loading} 
          disableRowSelectionOnClick 
          pageSizeOptions={[10, 25, 50]} 
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 600,
            },
          }}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Sửa sự kiện' : 'Tạo sự kiện mới'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField 
              label="Tên sự kiện" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              fullWidth 
              required
              placeholder="Nhập tên sự kiện"
            />
            <TextField 
              label="Danh mục" 
              value={form.category} 
              onChange={(e) => setForm({ ...form, category: e.target.value })} 
              fullWidth 
              required
              placeholder="Ví dụ: Âm nhạc, Thể thao, Hội nghị"
            />
            <TextField 
              label="Địa điểm" 
              value={form.location} 
              onChange={(e) => setForm({ ...form, location: e.target.value })} 
              fullWidth 
              required
              placeholder="Nhập địa điểm tổ chức"
            />
            <TextField 
              label="Thời gian bắt đầu" 
              type="datetime-local" 
              value={form.start_time} 
              onChange={(e) => setForm({ ...form, start_time: e.target.value })} 
              fullWidth 
              required
            />
            <TextField 
              label="Thời gian kết thúc" 
              type="datetime-local" 
              value={form.end_time} 
              onChange={(e) => setForm({ ...form, end_time: e.target.value })} 
              fullWidth 
              required
            />
            <TextField 
              label="Trạng thái" 
              value={form.status} 
              onChange={(e) => setForm({ ...form, status: e.target.value })} 
              fullWidth 
              select
              SelectProps={{ native: true }}
            >
              <option value="draft">Bản nháp</option>
              <option value="published">Đã xuất bản</option>
              <option value="ongoing">Đang diễn ra</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </TextField>
            <TextField 
              label="Mô tả" 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              fullWidth 
              multiline 
              minRows={3}
              placeholder="Mô tả chi tiết về sự kiện..."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={save} variant="contained" disabled={!form.name || !form.category || !form.location || !form.start_time || !form.end_time}>
            {editingId ? 'Cập nhật' : 'Tạo sự kiện'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}


