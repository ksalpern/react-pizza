import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },
    removeProduct(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearProducts(state, action) {
      state.items = []
      state.totalPrice = 0
    },
    minusProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearProducts, minusProduct } = cartSlice.actions

export default cartSlice.reducer