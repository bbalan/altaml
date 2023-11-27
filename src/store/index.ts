import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productsReducer from './products'

export const rootReducer = combineReducers({
  products: productsReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

export type AppStore = typeof store

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof rootReducer>
