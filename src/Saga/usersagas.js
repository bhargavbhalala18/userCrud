import {
  take, takeEvery, takeLatest, put, all, delay, fork, call
} from "redux-saga/effects"
import * as types from '../Action/actionTypes';
import {
  loadUsersSuccess, loadUsersError, createUsersSuccess, createUsersError, deleteUsersSuccess, deleteUsersError,
  updateUsersSuccess, updateUsersError
} from '../Action/action';
import { loadUsersApi, createUserApi, deleteUserApi, updateUserApi } from "../api";

//generator for load all users
function* onLoadUserStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(400)
      yield put(loadUsersSuccess(response.data))
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data))
  }
}

//generator for add user
function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    const users = yield call(loadUsersApi);
    if (response.status === 200) {
      yield put(createUsersSuccess(response.data))
      yield delay(200)
      yield put(loadUsersSuccess(users.data))
    }
  } catch (error) {
    yield put(createUsersError(error.response.data))
  }
}

//generator for update user
function* onUpdateUserStartAsync({ payload }) {
  try {
    const response = yield call(updateUserApi, payload.user.id, payload.user);
    const users = yield call(loadUsersApi);
    if (response.status === 200) {
      yield put(updateUsersSuccess(payload.user.id, payload.user));
      yield delay(200)
      yield put(loadUsersSuccess(users.data))
    }
  } catch (error) {
    yield put(updateUsersError(error.response.data))
  }
}

//generator for delete user
function* onDeleteUserAsync(payload) {
  try {
    const response = yield call(deleteUserApi, payload);
    if (response.status === 200) {
      yield delay(400)
      yield put(deleteUsersSuccess(payload))
    }
  } catch (error) {
    yield put(deleteUsersError(error.response.data))
  }
}

//delete User
function* onDeleteUser() {
  while (true) {
    const { payload } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserAsync, payload)
  }
}

//Load all users
function* onLoadUsers() {
  yield takeLatest(types.LOAD_USER_START, onLoadUserStartAsync)
}

//add user
function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync)
}

//update user
function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync)
}

//manage concurrency between different sagas
const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser)
];

export default function* rootSaga() {
  yield all([...userSagas]) //combine difffent all saga
}