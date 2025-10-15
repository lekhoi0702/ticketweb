import { useState } from 'react';
import CrudList from '../crud/CrudList';
import CrudForm from '../crud/CrudForm';
import { EventsApi } from '../../api/resources';

export default function EventsPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const fields = [
    { name: 'name', label: 'Name', rules: [{ required: true }] },
    { name: 'category', label: 'Category', rules: [{ required: true }] },
    { name: 'description', label: 'Description' },
    { name: 'content', label: 'Content' },
    { name: 'conditions', label: 'Conditions' },
    { name: 'logo_url', label: 'Logo URL' },
    { name: 'banner_url', label: 'Banner URL' },
    { name: 'location', label: 'Location', rules: [{ required: true }] },
    { name: 'start_time', label: 'Start Time', type: 'date', rules: [{ required: true }] },
    { name: 'end_time', label: 'End Time', type: 'date', rules: [{ required: true }] },
    { name: 'status', label: 'Status', type: 'select', options: [
      { label: 'draft', value: 'draft' },
      { label: 'published', value: 'published' },
      { label: 'ongoing', value: 'ongoing' },
      { label: 'completed', value: 'completed' },
      { label: 'cancelled', value: 'cancelled' },
    ] },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Logo', dataIndex: 'logo_url' },
    { title: 'Banner', dataIndex: 'banner_url' },
    { title: 'Start', dataIndex: 'start_time' },
    { title: 'End', dataIndex: 'end_time' },
    { title: 'Status', dataIndex: 'status' },
  ];

  return (
    <div>
      <CrudList
        columns={columns}
        api={EventsApi}
        reloadKey={reloadKey}
        onCreate={() => { setEditing(null); setOpen(true); }}
        onEdit={(rec) => { setEditing(rec); setOpen(true); }}
      />
      <CrudForm
        open={open}
        onClose={() => setOpen(false)}
        initialValues={editing}
        fields={fields}
        api={EventsApi}
        onSaved={() => setReloadKey((k) => k + 1)}
      />
    </div>
  );
}


