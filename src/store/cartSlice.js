import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const LS_CART = 'cart_v2'

const initialState = {
  items: JSON.parse(localStorage.getItem(LS_CART) || '[]')
}

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action){
      const { product, qty } = action.payload
      const existing = state.items.find(i => i.product.id === product.id)
      if(existing){
        existing.qty = Math.min(10, existing.qty + qty)
      } else {
        state.items.push({ product, qty })
      }
      localStorage.setItem(LS_CART, JSON.stringify(state.items))
      toast.success('Added to cart')
    },
    updateQty(state, action){
      const { id, qty } = action.payload
      const item = state.items.find(i => i.product.id === id)
      if(item){
        item.qty = qty
      }
      localStorage.setItem(LS_CART, JSON.stringify(state.items))
    },
    removeFromCart(state, action){
      state.items = state.items.filter(i => i.product.id !== action.payload)
      localStorage.setItem(LS_CART, JSON.stringify(state.items))
    },
    clearCart(state){
      state.items = []
      localStorage.removeItem(LS_CART)
    }
  }
})

export const { addToCart, updateQty, removeFromCart, clearCart } = slice.actions
export default slice.reducer
