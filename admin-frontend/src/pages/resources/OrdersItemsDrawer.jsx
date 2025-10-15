import { Drawer, Table } from 'antd';

export default function OrdersItemsDrawer({ open, onClose, order }) {
  const columns = [
    { title: 'Ticket Type', dataIndex: 'ticket_type_id' },
    { title: 'Quantity', dataIndex: 'quantity' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Subtotal', dataIndex: 'subtotal' },
  ];

  return (
    <Drawer open={open} onClose={onClose} width={640} title={`Order #${order?.id} Items`}>
      <Table rowKey={(r, i) => i} dataSource={order?.items || []} columns={columns} pagination={false} />
    </Drawer>
  );
}


