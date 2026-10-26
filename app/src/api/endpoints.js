import api from './client';

export const getCategories = () => api.get('/categories/all').then((r) => r.data);
export const getProducts = () => api.get('/products/all').then((r) => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then((r) => r.data);
export const getCategoryProducts = (id) => api.get(`/categories/${id}`).then((r) => r.data);

export const sendOrder = (payload) => api.post('/order/send', payload).then((r) => r.data);
export const sendSaleRequest = (payload) => api.post('/sale/send', payload).then((r) => r.data);
