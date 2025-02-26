// store.ts
import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./slides/reducer"
import rootSaga from "./slides/sagas"
import { Middleware } from "redux"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware as Middleware),
})

sagaMiddleware.run(rootSaga)

// ✅ Exportando o tipo RootState corretamente
export type RootState = ReturnType<typeof store.getState>

export default store
