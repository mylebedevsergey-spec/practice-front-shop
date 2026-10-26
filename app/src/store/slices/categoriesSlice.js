import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategories, getCategoryProducts } from '../../api/endpoints';

export const loadCategories = createAsyncThunk('categories/load', async () => getCategories());
export const loadCategoryProducts = createAsyncThunk('categories/products', async (id) => getCategoryProducts(id));

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: [], status: 'idle', error: null, products: [], productsStatus: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => { state.status = 'loading'; })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadCategoryProducts.pending, (state) => { state.productsStatus = 'loading'; })
      .addCase(loadCategoryProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.products = action.payload;
      })
      .addCase(loadCategoryProducts.rejected, (state) => { state.productsStatus = 'failed'; });
  },
});

export default categoriesSlice.reducer;
