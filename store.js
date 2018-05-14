import { createStore, applyMiddleware } from 'redux'
import withRedux from 'next-redux-wrapper'
import nextReduxSaga from 'next-redux-saga'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

export function configureStore(initialState) {
  let userState = {}

  if (typeof localStorage !== 'undefined') {
    userState = {
      currentUser: JSON.parse(localStorage.getItem('currentUser')),
    }
  }

  const store = createStore(
    rootReducer,
    { ...initialState, ...userState },
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  if (typeof localStorage !== 'undefined') {
    store.subscribe(() => {
      const { currentUser } = store.getState()

      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
      }
    })
  }

  return store
}

export function withReduxSaga(
  BaseComponent,
  mapStateToProps,
  mapDispatchToProps
) {
  return withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
    nextReduxSaga(BaseComponent)
  )
}
