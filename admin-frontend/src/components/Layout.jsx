import { Layout as AntLayout, Menu, Button, Typography } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../auth/auth';

const { Header, Sider, Content } = AntLayout;

const items = [
  { key: '/', label: <Link to="/">Dashboard</Link> },
  { key: '/events', label: <Link to="/events">Events</Link> },
  { key: '/tickets', label: <Link to="/tickets">Tickets</Link> },
  { key: '/ticket-types', label: <Link to="/ticket-types">Ticket Types</Link> },
  { key: '/users', label: <Link to="/users">Users</Link> },
  { key: '/accounts', label: <Link to="/accounts">Accounts</Link> },
  { key: '/orders', label: <Link to="/orders">Orders</Link> },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider width={220} breakpoint="lg" collapsedWidth={64}>
        <div style={{ color: '#fff', padding: 16, fontWeight: 600, textAlign: 'center' }}>Ticket Admin</div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items} />
      </Sider>
      <AntLayout>
        <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <div style={{ flex: 1 }}>
            <Typography.Text strong>Quản trị</Typography.Text>
          </div>
          <Button onClick={onLogout}>Đăng xuất</Button>
        </Header>
        <Content style={{ padding: 16 }}>
          <div className="page-container">
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
}


