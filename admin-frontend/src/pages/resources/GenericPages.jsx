import { useState } from 'react';
import CrudList from '../crud/CrudList';
import CrudForm from '../crud/CrudForm';

export function makeGenericPage({ api, fields, columns, enableCreate = true, enableDelete = true }) {
  return function GenericResourcePage() {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    return (
      <div>
        <CrudList
          columns={columns}
          api={api}
          reloadKey={reloadKey}
          enableCreate={enableCreate}
          enableDelete={enableDelete}
          onCreate={() => { setEditing(null); setOpen(true); }}
          onEdit={(rec) => { setEditing(rec); setOpen(true); }}
        />
        <CrudForm
          open={open}
          onClose={() => setOpen(false)}
          initialValues={editing}
          fields={fields}
          api={api}
          onSaved={() => setReloadKey((k) => k + 1)}
        />
      </div>
    );
  };
}


