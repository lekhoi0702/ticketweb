import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import HomePage from './routes/HomePage.jsx';
import EventDetailPage from './routes/EventDetailPage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import CheckoutPage from './routes/CheckoutPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events/:id', element: <EventDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
    ],
  },
]);


