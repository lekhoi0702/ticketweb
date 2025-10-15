import { Drawer, Form, Input, InputNumber, DatePicker, Select, Button, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

export default function CrudForm({ open, onClose, initialValues, fields, api, onSaved }) {
  const [form] = Form.useForm();
  const [dynamicOptions, setDynamicOptions] = useState({});

  // load remote options for select fields
  const remoteSelectFields = useMemo(() => fields.filter((f) => f.type === 'select' && !f.options && f.fetchOptions), [fields]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const entries = await Promise.all(
        remoteSelectFields.map(async (f) => {
          try {
            const opts = await f.fetchOptions();
            return [f.name, opts];
          } catch (_) {
            return [f.name, []];
          }
        })
      );
      if (isMounted) setDynamicOptions(Object.fromEntries(entries));
    })();
    return () => { isMounted = false };
  }, [remoteSelectFields]);

  // Ensure date fields use Dayjs instances for AntD DatePicker
  useEffect(() => {
    if (!open) return;
    const values = {};
    fields.forEach((f) => {
      if (!initialValues) return;
      if (f.type === 'date' && initialValues[f.name]) {
        values[f.name] = dayjs(initialValues[f.name]);
      } else {
        values[f.name] = initialValues[f.name];
      }
    });
    form.setFieldsValue(values);
  }, [open, initialValues, fields, form]);

  const handleFinish = async (values) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [k, dayjs.isDayjs(v) ? v.toISOString() : v])
      );
    
      if (initialValues && initialValues.id) {
        await api.update(initialValues.id, payload);
        message.success('Đã cập nhật');
      } else {
        await api.create(payload);
        message.success('Đã tạo');
      }
      onSaved?.();
      onClose();
      form.resetFields();
    } catch (e) {
      message.error('Lưu thất bại');
    }
  };

  return (
    <Drawer open={open} onClose={onClose} width={520} destroyOnClose title={initialValues?.id ? 'Sửa' : 'Thêm mới'}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        {fields.map((f) => {
          const common = { name: f.name, label: f.label, rules: f.rules };
          if (f.type === 'number') return (
            <Form.Item key={f.name} {...common}><InputNumber style={{ width: '100%' }} /></Form.Item>
          );
          if (f.type === 'date') return (
            <Form.Item key={f.name} {...common}><DatePicker showTime style={{ width: '100%' }} /></Form.Item>
          );
          if (f.type === 'select') return (
            <Form.Item key={f.name} {...common}><Select options={f.options || dynamicOptions[f.name] || []} showSearch optionFilterProp="label" /></Form.Item>
          );
          return (
            <Form.Item key={f.name} {...common}><Input /></Form.Item>
          );
        })}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" htmlType="submit">Lưu</Button>
        </div>
      </Form>
    </Drawer>
  );
}


