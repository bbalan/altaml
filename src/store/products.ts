import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '.'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

const productsAdapter = createEntityAdapter<Product>()

const initialState = productsAdapter.getInitialState({
  loadingStatus: null,
})

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/bbalan/altaml/master/assets/json/products.json',
    )
    return await response.json()
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loadingStatus = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload)
        state.loadingStatus = 'success'
      })
      .addCase(fetchProducts.rejected, state => {
        productsAdapter.removeAll(state)
        state.loadingStatus = 'error'
      })
  },
})

export const productsActions = productsSlice.actions
export default productsSlice.reducer
export const { selectAll } = productsAdapter.getSelectors<RootState>(
  state => state.products,
)

export const selectProducts = (state: RootState) => state.products

export const loadingStatusSelector = createSelector(
  selectProducts,
  products => products.loadingStatus,
)
