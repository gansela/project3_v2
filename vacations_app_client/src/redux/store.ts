import { createStore, applyMiddleware, compose } from "redux"
import root from "./reducers"
import thunk from "redux-thunk"

// const persistedState = localStorage.getItem('vacation') ? JSON.parse(localStorage.getItem('vacation')) : {}

const composeA = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  as typeof compose || compose;
const store = createStore(root,  composeA(applyMiddleware(thunk)))
export default store;