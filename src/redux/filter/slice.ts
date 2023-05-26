import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price'
}

export type Sort = {
  name: string
  sort: SortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  sort: Sort
}
const initialState: FilterSliceState = {
  categoryId: 0,
  sort: { name: 'популярності', sort: SortPropertyEnum.RATING },
  searchValue: ''
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId (state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort (state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setFilters (state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    },
    setSearchValue (state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    }
  }
})

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSort, setFilters, setSearchValue } =
  filterSlice.actions

export default filterSlice.reducer
