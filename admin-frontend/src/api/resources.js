import api from './client';

// Generic CRUD helpers
export const createResourceApi = (resourcePath) => ({
  list: (params) => api.get(`${resourcePath}/`, { params }).then((r) => r.data),
  retrieve: (id) => api.get(`${resourcePath}/${id}/`).then((r) => r.data),
  create: (data) => api.post(`${resourcePath}/`, data).then((r) => r.data),
  update: (id, data) => api.patch(`${resourcePath}/${id}/`, data).then((r) => r.data),
  partialUpdate: (id, data) => api.patch(`${resourcePath}/${id}/`, data).then((r) => r.data),
  destroy: (id) => api.delete(`${resourcePath}/${id}/`).then((r) => r.data),
});

export const EventsApi = createResourceApi('events');
export const TicketsApi = createResourceApi('tickets');
export const TicketTypesApi = createResourceApi('ticket-types');
export const AccountsApi = createResourceApi('accounts');
export const UsersApi = createResourceApi('users');
export const OrdersApi = createResourceApi('orders');
export const PromotionsApi = createResourceApi('promotions');

// Custom endpoints
export const OrdersActionsApi = {
  create: (data) => api.post('orders/create/', data).then((r) => r.data),
  processPayment: (orderId, data) =>
    api.post(`orders/${orderId}/process_payment/`, data).then((r) => r.data),
  cancel: (orderId, data) => api.post(`orders/${orderId}/cancel/`, data).then((r) => r.data),
};

export const TicketsActionsApi = {
  checkin: (data) => api.post('tickets/checkin/', data).then((r) => r.data),
};


