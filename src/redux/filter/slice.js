import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: { name: 'популярності', sort: 'rating' },
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId)
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    }
  },
})

export const selectFilter = state => state.filter
export const selectSort = state => state.filter.sort

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer