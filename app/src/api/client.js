import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

/** Абсолютный адрес картинки: бэкенд отдаёт пути вида /product_img/1.jpeg */
export function imageUrl(path) {
  if (!path) return '';
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

export default api;
