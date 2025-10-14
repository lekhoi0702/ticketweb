import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminDashboard from './routes/AdminDashboard.jsx'
import EventsAdmin from './routes/EventsAdmin.jsx'
import TicketsAdmin from './routes/TicketsAdmin.jsx'
import AccountsAdmin from './routes/AccountsAdmin.jsx'
import UsersAdmin from './routes/UsersAdmin.jsx'
import OrdersAdmin from './routes/OrdersAdmin.jsx'
import Login from './routes/Login.jsx'
import RequireAuth from './components/RequireAuth.jsx'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'events', element: <EventsAdmin /> },
          { path: 'tickets', element: <TicketsAdmin /> },
          { path: 'accounts', element: <AccountsAdmin /> },
          { path: 'users', element: <UsersAdmin /> },
          { path: 'orders', element: <OrdersAdmin /> },
        ]
      }
    ]
  }
])


