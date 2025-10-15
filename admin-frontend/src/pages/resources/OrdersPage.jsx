import { useState } from 'react';
import CrudList from '../crud/CrudList';
import CrudForm from '../crud/CrudForm';
import OrdersItemsDrawer from './OrdersItemsDrawer';
import { AccountsApi, EventsApi, OrdersApi, PromotionsApi } from '../../api/resources';
import { Button } from 'antd';

export default function OrdersPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [itemsOpen, setItemsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fields = [
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
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'User', dataIndex: 'user' },
    { title: 'Event', dataIndex: 'event' },
    { title: 'Promotion', dataIndex: 'promotion' },
    { title: 'Status', dataIndex: 'status' },
  ];

  const extraActions = (record) => (
    <Button size="small" onClick={() => { setSelectedOrder(record); setItemsOpen(true); }}>Items</Button>
  );

  return (
    <div>
      <CrudList
        columns={columns}
        api={OrdersApi}
        reloadKey={reloadKey}
        onCreate={() => { setEditing(null); setOpen(true); }}
        onEdit={(rec) => { setEditing(rec); setOpen(true); }}
        extraActions={extraActions}
      />
      <CrudForm
        open={open}
        onClose={() => setOpen(false)}
        initialValues={editing}
        fields={fields}
        api={OrdersApi}
        onSaved={() => setReloadKey((k) => k + 1)}
      />
      <OrdersItemsDrawer open={itemsOpen} onClose={() => setItemsOpen(false)} order={selectedOrder} />
    </div>
  );
}


