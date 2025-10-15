import { useEffect, useState } from 'react';
import { Button, Table, Space, Popconfirm, message } from 'antd';

export default function CrudList({ columns, api, onCreate, onEdit, reloadKey, enableCreate = true, enableDelete = true, extraActions }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const list = await api.list();
      setData(list);
    } catch (e) {
      message.error('Tải dữ liệu thất bại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // re-fetch when parent asks to reload
  }, [reloadKey]);

  const handleDelete = async (record) => {
    try {
      await api.destroy(record.id);
      message.success('Đã xóa');
      fetchData();
    } catch (e) {
      message.error('Xóa thất bại');
    }
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        {enableCreate && <Button type="primary" onClick={onCreate}>Thêm mới</Button>}
        <Button onClick={fetchData}>Tải lại</Button>
      </Space>
      <Table
        rowKey="id"
        dataSource={data}
        loading={loading}
        columns={[
          ...columns,
          {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
              <Space>
                <Button size="small" onClick={() => onEdit(record)}>Sửa</Button>
                {enableDelete && (
                  <Popconfirm title="Xóa bản ghi?" onConfirm={() => handleDelete(record)}>
                    <Button size="small" danger>
                      Xóa
                    </Button>
                  </Popconfirm>
                )}
                {extraActions?.(record)}
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}


