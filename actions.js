export const actionTypes = {
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SYNC_USERS: 'SYNC_USERS',
  PERSIST_USER: 'PERSIST_USER',
}

export const createUser = (user) => ({
  type: actionTypes.CREATE_USER,
  user,
})

export const deleteUser = (user) => ({
  type: actionTypes.DELETE_USER,
  user,
})

export const updateUser = (user) => ({
  type: actionTypes.UPDATE_USER,
  user,
})

export const syncUsers = (users) => ({
  type: actionTypes.SYNC_USERS,
  users,
})

export const persistUser = (user) => ({
  type: actionTypes.PERSIST_USER,
  user,
})
