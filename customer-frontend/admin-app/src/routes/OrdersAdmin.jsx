import { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { api } from '../services/api.js'

export default function OrdersAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/orders/')
      setRows(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'code', headerName: 'Mã đơn hàng', width: 160 },
    { field: 'user_id', headerName: 'User ID', width: 120 },
    { field: 'event_id', headerName: 'Event ID', width: 120 },
    { field: 'subtotal', headerName: 'Tạm tính', width: 120, renderCell: (params) => params.value ? `$${params.value}` : '-' },
    { field: 'discount', headerName: 'Giảm giá', width: 120, renderCell: (params) => params.value ? `$${params.value}` : '-' },
    { field: 'total', headerName: 'Tổng tiền', width: 120, renderCell: (params) => params.value ? `$${params.value}` : '-' },
    { field: 'payment_method', headerName: 'Phương thức', width: 140 },
    { 
      field: 'status', 
      headerName: 'Trạng thái', 
      width: 140,
      renderCell: (params) => {
        const colors = {
          pending: 'warning',
          paid: 'success',
          cancelled: 'error',
          refunded: 'info'
        }
        return <Button size="small" variant="outlined" color={colors[params.value] || 'default'}>{params.value}</Button>
      }
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
      width: 180, 
      sortable: false, 
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" color="primary">Xem</Button>
          <Button size="small" variant="outlined" color="success">Xác nhận</Button>
          <Button size="small" color="error" variant="outlined">Hủy</Button>
        </Stack>
      )
    }
  ]

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Đơn hàng</Typography>
      <Paper sx={{ height: 560 }}>
        <DataGrid rows={rows} columns={columns} loading={loading} disableRowSelectionOnClick pageSizeOptions={[10, 25, 50]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
      </Paper>
    </Box>
  )
}


