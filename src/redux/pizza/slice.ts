import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error'
}

export type SearchPizzaParams = {
  sortByParam: string
  // order: string;
  // sortByParam: string
  // search: string
  categoryId: number
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { sortByParam, categoryId } = params
    const { data } = await axios.get(
      `https://64664e24ba7110b6639d5185.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortByParam}&order=desc`
    )
    return data
  }
)

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING // loading | success | error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems (state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    }
  },
  // extraReducers: {
  //   [fetchPizzas.pending] (state) {
  //     state.status = 'loading'
  //     state.items = []
  //   },
  //   [fetchPizzas.fulfilled] (state, action) {
  //     state.items = action.payload
  //     state.status = 'success'
  //   },
  //   [fetchPizzas.rejected] (state, action) {
  //     state.status = 'error'
  //     state.items = []
  //   }
  // }
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
