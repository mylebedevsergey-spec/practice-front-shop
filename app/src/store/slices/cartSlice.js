import { createSlice } from '@reduxjs/toolkit';

/** Корзина: товары + количество, итоговая сумма. Сохраняется в localStorage. */
const STORAGE_KEY = 'practice-cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadCart() },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.discont_price ?? product.price,
          image: product.image,
          count: 1,
        });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    changeCount(state, action) {
      const { id, count } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (item) {
        item.count = Math.max(1, count);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, changeCount, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, item) => sum + item.count, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((sum, item) => sum + item.price * item.count, 0);

export default cartSlice.reducer;
