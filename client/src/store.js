import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import { history } from './'

// Create Store
export default onCompletion => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk))
  const store = createStore(reducers, enhancer)

  return store
}
