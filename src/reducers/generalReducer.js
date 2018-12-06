import {
  GET_GENERAL,
  GET_GENERAL_SUCCESS,
  GET_GENERAL_FAIL } from '../constants';

const initialState = {
  allGeneralRequests: [],
  meta: {},
  isFetchingGeneralRequests: false,
  errorFetchingGeneralRequests: {}
};

const generalReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch (type) {
      case GET_GENERAL:
        return {
          ...state,
          isFetchingGeneralRequests: true
        }
      case GET_GENERAL_SUCCESS:
        return {
          ...state,
          allGeneralRequests: payload.general_requests,
          meta: payload.meta,
          isFetchingGeneralRequests: false
        }
      case GET_GENERAL_FAIL:
        return {
          ...state,
          errorFetchingGeneralRequests: payload,
          isFetchingGeneralRequests: false
        }
     default:
      return state
    }
   }


export default generalReducer;
