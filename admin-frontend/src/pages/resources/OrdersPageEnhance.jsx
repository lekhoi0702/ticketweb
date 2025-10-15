import { useState, useEffect } from 'react';
import { Button, Drawer, Form, Input, Select, Space, Table, message } from 'antd';
import { AccountsApi, EventsApi, OrdersActionsApi, TicketTypesApi } from '../../api/resources';

export default function OrdersPageEnhance() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{ ticket_type_id: undefined, quantity: 1 }]);
  const [eventId, setEventId] = useState();
  const [ticketTypeOptions, setTicketTypeOptions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!eventId) { setTicketTypeOptions([]); return; }
    (async () => {
      const all = await TicketTypesApi.list();
      setTicketTypeOptions(all.filter(t => t.event_id === eventId).map(t => ({ label: `${t.name} (#${t.id})`, value: t.id })));
    })();
  }, [eventId]);

  const addRow = () => setItems(prev => [...prev, { ticket_type_id: undefined, quantity: 1 }]);
  const removeRow = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateRow = (idx, patch) => setItems(prev => prev.map((row, i) => i === idx ? { ...row, ...patch } : row));

  const submit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        user_id: values.user_id,
        event_id: values.event_id,
        items: items.map(i => ({ ticket_type_id: i.ticket_type_id, quantity: Number(i.quantity || 1) })),
        promotion_code: values.promotion_code || null,
      };
      await OrdersActionsApi.create(payload);
      message.success('Tạo đơn hàng thành công');
      setOpen(false);
      setItems([{ ticket_type_id: undefined, quantity: 1 }]);
      form.resetFields();
    } catch (e) {
      if (e?.errorFields) return; // validation error displayed
      message.error('Tạo đơn hàng thất bại');
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>Tạo đơn bằng items</Button>
      <Drawer open={open} onClose={() => setOpen(false)} width={720} title="Tạo đơn hàng">
        <Form form={form} layout="vertical">
          <Form.Item label="User" name="user_id" rules={[{ required: true }]}> 
            <Select showSearch optionFilterProp="label" options={[]}
              onFocus={async () => {
                const items = await AccountsApi.list();
                form.setFieldValue('__accounts', items);
              }}
              options={(form.getFieldValue('__accounts')||[]).map(a => ({ label: `${a.username} (#${a.id})`, value: a.id }))}
            />
          </Form.Item>
          <Form.Item label="Event" name="event_id" rules={[{ required: true }]}> 
            <Select showSearch optionFilterProp="label" onChange={setEventId}
              onFocus={async () => {
                const items = await EventsApi.list();
                form.setFieldValue('__events', items);
              }}
              options={(form.getFieldValue('__events')||[]).map(e => ({ label: e.name, value: e.id }))}
            />
          </Form.Item>
          <Form.Item label="Promotion code" name="promotion_code"> 
            <Input placeholder="Optional" />
          </Form.Item>

          <Space direction="vertical" style={{ width: '100%' }}>
            <Table
              dataSource={items}
              rowKey={(r, i) => i}
              pagination={false}
              columns={[
                {
                  title: 'Ticket Type',
                  render: (_, __, idx) => (
                    <Select style={{ width: '100%' }}
                      showSearch optionFilterProp="label"
                      options={ticketTypeOptions}
                      value={items[idx].ticket_type_id}
                      onChange={(v) => updateRow(idx, { ticket_type_id: v })}
                    />
                  )
                },
                {
                  title: 'Quantity',
                  render: (_, __, idx) => (
                    <Input type="number" min={1} value={items[idx].quantity} onChange={(e) => updateRow(idx, { quantity: e.target.value })} />
                  )
                },
                {
                  title: 'Actions',
                  render: (_, __, idx) => (
                    <Button danger onClick={() => removeRow(idx)}>Remove</Button>
                  )
                }
              ]}
            />
            <Button onClick={addRow}>Thêm dòng</Button>
          </Space>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, gap: 8 }}>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
            <Button type="primary" onClick={submit}>Tạo đơn</Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}


