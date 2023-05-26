import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getCartFromLS } from '../../utils/getCartFromLocalStorage'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}

// const initialState: CartSliceState = {
//   totalPrice: 0,
//   items: []
// }
const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct (state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeProduct (state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearProducts (state) {
      state.items = []
      state.totalPrice = 0
    },
    minusProduct (state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.items);
    }
  }
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find(obj => obj.id === id)

export const { addProduct, removeProduct, clearProducts, minusProduct } =
  cartSlice.actions

export default cartSlice.reducer
