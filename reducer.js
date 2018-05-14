import { actionTypes } from './actions'

const initialState = {
  users: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SYNC_USERS:
      return {
        ...state,
        users: action.users,
      }

    case actionTypes.PERSIST_USER:
      return {
        ...state,
        currentUser: action.user,
      }

    default:
      return state
  }
}

export default reducer
