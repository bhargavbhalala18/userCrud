import * as types from "../Action/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USER_START:
    case types.CREATE_USER_START:
    case types.UPDATE_USER_START:
    case types.DELETE_USER_START:
      return {
        ...state,
        loading: true
      }
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    case types.CREATE_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((u) => u.id !== action.payload)
      }
    case types.LOAD_USER_ERROR:
    case types.CREATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default UserReducer;