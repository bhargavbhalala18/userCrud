import * as types from "./actionTypes";

export const loadUsersStart = () => {
  return {
    type: types.LOAD_USER_START,
  }
};

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USER_SUCCESS,
    payload: users
  }
};

export const loadUsersError = (error) => {
  return {
    type: types.LOAD_USER_ERROR,
    payload: error
  }
};

export const createUsersStart = (user) => {
  return {
    type: types.CREATE_USER_START,
    payload: user
  }
};

export const createUsersSuccess = () => {
  return {
    type: types.CREATE_USER_SUCCESS,
  }
};

export const createUsersError = (error) => {
  return {
    type: types.CREATE_USER_ERROR,
    payload: error
  }
};

export const updateUsersStart = (userInfo) => {
  return {
    type: types.UPDATE_USER_START,
    payload: userInfo
  }
};

export const updateUsersSuccess = () => {
  return {
    type: types.UPDATE_USER_SUCCESS,
  }
};

export const updateUsersError = (error) => {
  return {
    type: types.UPDATE_USER_ERROR,
    payload: error
  }
};

export const deleteUsersStart = (userId) => {
  return {
    type: types.DELETE_USER_START,
    payload: userId
  }
};

export const deleteUsersSuccess = (userId) => {
  return {
    type: types.DELETE_USER_SUCCESS,
    payload: userId
  }
};

export const deleteUsersError = (error) => {
  return {
    type: types.DELETE_USER_ERROR,
    payload: error
  }
};