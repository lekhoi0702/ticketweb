import { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { api } from '../services/api.js'

export default function UsersAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/users/')
      setRows(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'account_id', headerName: 'Account ID', width: 120 },
    { field: 'fullname', headerName: 'Họ tên', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Số điện thoại', width: 140 },
    { field: 'birthday', headerName: 'Ngày sinh', width: 140, renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString('vi-VN') : '-' },
    { field: 'gender', headerName: 'Giới tính', width: 100 },
    { field: 'address', headerName: 'Địa chỉ', width: 200 },
    { 
      field: 'created_at', 
      headerName: 'Ngày tạo', 
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
          <Button size="small" variant="outlined" color="warning">Sửa</Button>
        </Stack>
      )
    }
  ]

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Người dùng</Typography>
      <Paper sx={{ height: 560 }}>
        <DataGrid rows={rows} columns={columns} loading={loading} disableRowSelectionOnClick pageSizeOptions={[10, 25, 50]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
      </Paper>
    </Box>
  )
}


