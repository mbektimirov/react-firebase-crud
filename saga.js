import firebase from 'firebase'
import { call, fork, spawn, takeLatest, all } from 'redux-saga/effects'
import { actionTypes, syncUsers } from './actions'
import rsf from './rsf'

function* createUser(action) {
  yield call(rsf.firestore.addDocument, 'users', action.user)
}

function* deleteUser(action) {
  yield call(rsf.firestore.deleteDocument, `users/${action.user.id}`)
}

function* updateUser(action) {
  yield call(
    rsf.firestore.updateDocument,
    `users/${action.user.id}`,
    action.user
  )
}

const transformer = (users) => {
  const transformed = []

  // no map method here
  users.forEach((user) => transformed.push({ id: user.id, ...user.data() }))

  return transformed
}

function* syncUsersSaga() {
  yield fork(
    rsf.firestore.syncCollection,
    firebase
      .firestore()
      .collection('users')
      .orderBy('created_at', 'desc'),
    {
      successActionCreator: syncUsers,
      transform: transformer,
    }
  )
}

export default function* rootSaga() {
  yield all([
    spawn(syncUsersSaga),
    takeLatest(actionTypes.CREATE_USER, createUser),
    takeLatest(actionTypes.DELETE_USER, deleteUser),
    takeLatest(actionTypes.UPDATE_USER, updateUser),
  ])
}
