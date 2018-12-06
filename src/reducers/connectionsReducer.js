import {
  GET_CONNECTIONS,
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL } from '../constants';

const initialState = {
  allConnections: [],
  meta: {},
  isFetchingConnections: false,
  errorFetchingConnections: {}
};

const connectionsReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch (type) {
      case GET_CONNECTIONS:
        return {
          ...state,
          isFetchingConnections: true
        }
      case GET_CONNECTIONS_SUCCESS:
        return {
          ...state,
          allConnections: payload.connections,
          meta: payload.meta,
          isFetchingConnections: false
        }
      case GET_CONNECTIONS_FAIL:
        return {
          ...state,
          errorFetchingConnections: payload,
          isFetchingConnections: false
        }
     default:
      return state
    }
   }


export default connectionsReducer;
