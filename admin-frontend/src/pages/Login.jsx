import { useState } from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { auth } from '../auth/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await auth.login(values.username, values.password);
      message.success('Đăng nhập thành công');
      navigate('/');
    } catch (e) {
      message.error(e.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card title="Admin Login" style={{ width: 360 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Nhập username' }]}> 
            <Input autoFocus />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Nhập password' }]}> 
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Đăng nhập</Button>
        </Form>
      </Card>
    </div>
  );
}


