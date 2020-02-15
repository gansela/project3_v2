import { createStore, applyMiddleware, compose } from "redux"
import root, {initialState} from "./reducers"
import thunk from "redux-thunk"



const persistedState = localStorage.getItem('vacations') ? JSON.parse(saveRedux()) : initialState

const composeA = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;
const store = createStore(root, persistedState, composeA(applyMiddleware(thunk)))

function saveRedux(): any {
  return localStorage.getItem('vacations')
}

store.subscribe(() => {
  try {
    const stateOBJ = { ...store.getState() }
    const serializedState = JSON.stringify(stateOBJ);
    localStorage.setItem('vacations', serializedState);
  } catch {
    // ignore write errors
  }
})
export default store;