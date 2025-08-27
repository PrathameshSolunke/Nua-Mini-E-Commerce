import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchCategories, fetchProductById } from '../api/api'

const LS_PRODUCTS = 'cached_products_v2'

const initialState = {
  list: [],
  categories: [],
  status: 'idle',
  error: null,
  byId: {}
}

export const loadProducts = createAsyncThunk('products/load', async (_, { rejectWithValue }) => {
  try{
    const raw = localStorage.getItem(LS_PRODUCTS)
    if(raw){
      return JSON.parse(raw)
    }
    const data = await fetchProducts()
    const payload = { list: data, ts: Date.now() }
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(payload))
    return payload
  }catch(e){
    return rejectWithValue(e.toString())
  }
})

export const loadCategories = createAsyncThunk('products/loadCategories', async (_, { rejectWithValue }) => {
  try{
    const data = await fetchCategories()
    return data
  }catch(e){
    return rejectWithValue(e.toString())
  }
})

export const loadProductDetail = createAsyncThunk('products/loadDetail', async (id, { getState, rejectWithValue }) => {
  try{
    const cached = getState().products.byId[id]
    if(cached) return cached
    const data = await fetchProductById(id)
    return data
  }catch(e){
    return rejectWithValue(e.toString())
  }
})

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (b)=>{
    b
      .addCase(loadProducts.pending, (s)=>{ s.status = 'loading'; s.error = null })
      .addCase(loadProducts.fulfilled, (s, a)=>{ s.status = 'succeeded'; s.list = a.payload.list || [] })
      .addCase(loadProducts.rejected, (s, a)=>{ s.status = 'failed'; s.error = a.payload || a.error.message })
      .addCase(loadCategories.fulfilled, (s, a)=>{ s.categories = a.payload })
      .addCase(loadProductDetail.fulfilled, (s, a)=>{ s.byId[a.payload.id] = a.payload })
  }
})

export default slice.reducer
