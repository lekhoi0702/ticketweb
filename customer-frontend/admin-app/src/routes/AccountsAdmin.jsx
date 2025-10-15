import { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { api } from '../services/api.js'

export default function AccountsAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/accounts/')
      setRows(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'username', headerName: 'Tên đăng nhập', flex: 1, minWidth: 150 },
    { 
      field: 'role', 
      headerName: 'Vai trò', 
      width: 120,
      renderCell: (params) => (
        <Button size="small" variant="outlined" color={params.value === 'admin' ? 'error' : 'primary'}>
          {params.value}
        </Button>
      )
    },
    { 
      field: 'status', 
      headerName: 'Trạng thái', 
      width: 120,
      renderCell: (params) => (
        <Button size="small" variant="outlined" color={params.value ? 'success' : 'error'}>
          {params.value ? 'Hoạt động' : 'Bị khóa'}
        </Button>
      )
    },
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
          <Button size="small" variant="outlined" color="warning">Sửa</Button>
          <Button size="small" color="error" variant="outlined">Khóa</Button>
        </Stack>
      )
    }
  ]

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Tài khoản</Typography>
      <Paper sx={{ height: 560 }}>
        <DataGrid rows={rows} columns={columns} loading={loading} disableRowSelectionOnClick pageSizeOptions={[10, 25, 50]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
      </Paper>
    </Box>
  )
}


