import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/Login';
import EventsPage from './pages/resources/EventsPage';
import { makeGenericPage } from './pages/resources/GenericPages';
import { AccountsApi, OrdersApi, TicketTypesApi, TicketsApi, UsersApi, EventsApi, PromotionsApi } from './api/resources';
import api from './api/client';
import OrdersPageEnhance from './pages/resources/OrdersPageEnhance';
import OrdersPage from './pages/resources/OrdersPage';

const RequireAuth = ({ children }) => {
  const token = sessionStorage.getItem('authToken');
  const location = useLocation();
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

const TicketsPage = makeGenericPage({
  api: TicketsApi,
  fields: [
    { name: 'event_id', label: 'Event', type: 'select', rules: [{ required: true }], fetchOptions: async () => {
      const items = await EventsApi.list();
      return items.map((e) => ({ label: e.name, value: e.id }));
    } },
    { name: 'ticket_type_id', label: 'Ticket Type', type: 'select', rules: [{ required: true }], fetchOptions: async () => {
      const items = await TicketTypesApi.list();
      return items.map((t) => ({ label: `${t.name} (#${t.id})`, value: t.id }));
    } },
    { name: 'code', label: 'Code' },
    { name: 'holder_name', label: 'Holder Name' },
    { name: 'holder_email', label: 'Holder Email' },
    { name: 'holder_phone', label: 'Holder Phone' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { label: 'unused', value: 'unused' },
      { label: 'used', value: 'used' },
      { label: 'cancelled', value: 'cancelled' },
    ] },
  ],
  columns: [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Event', dataIndex: 'event_id' },
    { title: 'Ticket Type', dataIndex: 'ticket_type_id' },
    { title: 'Code', dataIndex: 'code' },
    { title: 'Holder', dataIndex: 'holder_name' },
    { title: 'Email', dataIndex: 'holder_email' },
    { title: 'Phone', dataIndex: 'holder_phone' },
    { title: 'Status', dataIndex: 'status' },
  ],
  // disable create/delete for Tickets; allow edit only
  enableCreate: false,
  enableDelete: false,
});

const TicketTypesPage = makeGenericPage({
  api: TicketTypesApi,
  fields: [
    { name: 'event_id', label: 'Event', type: 'select', rules: [{ required: true }], fetchOptions: async () => {
      const items = await EventsApi.list();
      return items.map((e) => ({ label: e.name, value: e.id }));
    } },
    { name: 'name', label: 'Name', rules: [{ required: true }] },
    { name: 'price', label: 'Price', type: 'number', rules: [{ required: true }] },
    { name: 'quantity', label: 'Quantity', type: 'number' },
  ],
  columns: [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Quantity', dataIndex: 'quantity' },
  ],
});

const UsersPage = makeGenericPage({
  api: UsersApi,
  fields: [
    { name: 'account_id', label: 'Account', type: 'select', rules: [{ required: true }], fetchOptions: async () => {
      const items = await AccountsApi.list();
      return items.map((a) => ({ label: `${a.username} (#${a.id})`, value: a.id }));
    } },
    { name: 'fullname', label: 'Fullname', rules: [{ required: true }] },
    { name: 'email', label: 'Email', rules: [{ required: true }] },
    { name: 'phone', label: 'Phone' },
  ],
  columns: [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Fullname', dataIndex: 'fullname' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
  ],
});

const AccountsPage = makeGenericPage({
  api: AccountsApi,
  fields: [
    { name: 'username', label: 'Username', rules: [{ required: true }] },
    { name: 'role', label: 'Role', type: 'select', options: [
      { label: 'admin', value: 'admin' },
      { label: 'customer', value: 'customer' },
    ] },
  ],
  columns: [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Username', dataIndex: 'username' },
    { title: 'Role', dataIndex: 'role' },
  ],
});

const OrdersCrudPage = makeGenericPage({
  api: OrdersApi,
  fields: [
    { name: 'user_id', label: 'User', type: 'select', fetchOptions: async () => {
      const items = await AccountsApi.list();
      return items.map((u) => ({ label: `${u.username} (#${u.id})`, value: u.id }));
    } },
    { name: 'event_id', label: 'Event', type: 'select', fetchOptions: async () => {
      const items = await EventsApi.list();
      return items.map((e) => ({ label: e.name, value: e.id }));
    } },
    { name: 'promotion_id', label: 'Promotion', type: 'select', fetchOptions: async () => {
      const items = await PromotionsApi.list();
      return items.map((p) => ({ label: `${p.code} - ${p.name}`, value: p.id }));
    } },
    { name: 'status', label: 'Status', type: 'select', options: [
      { label: 'pending', value: 'pending' },
      { label: 'paid', value: 'paid' },
      { label: 'cancelled', value: 'cancelled' },
      { label: 'refunded', value: 'refunded' },
    ] },
  ],
  columns: [
    { title: 'ID', dataIndex: 'id' },
    { title: 'User', dataIndex: 'user_id' },
    { title: 'Event', dataIndex: 'event_id' },
    { title: 'Promotion', dataIndex: 'promotion_id' },
    { title: 'Status', dataIndex: 'status' },
  ],
});

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<div>Dashboard</div>} />
        <Route path="events" element={<EventsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="ticket-types" element={<TicketTypesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="orders" element={<><OrdersPageEnhance /><OrdersCrudPage /></>} />
      </Route>
    </Routes>
  );
}

