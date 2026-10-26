import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProduct, getProducts } from '../../api/endpoints';

export const loadProducts = createAsyncThunk('products/load', async () => getProducts());
export const loadProductById = createAsyncThunk('products/loadOne', async (id) => getProduct(id));

const initialState = {
  items: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  current: null,
  currentStatus: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadProductById.pending, (state) => {
        state.currentStatus = 'loading';
        state.current = null;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.currentStatus = 'succeeded';
        state.current = action.payload;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.currentStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
