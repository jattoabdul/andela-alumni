import {
  GET_PARTNERS,
  GET_PARTNERS_SUCCESS,
  GET_PARTNERS_FAIL } from '../constants';

const initialState = {
  allPartners: [],
  meta: {},
  isFetchingPartners: false,
  errorFetchingPartners: {}
};

const partnersReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch (type) {
      case GET_PARTNERS:
        return {
          ...state,
          isFetchingPartners: true
        }
      case GET_PARTNERS_SUCCESS:
        return {
          ...state,
          allPartners: payload.partners,
          meta: payload.meta,
          isFetchingPartners: false
        }
      case GET_PARTNERS_FAIL:
        return {
          ...state,
          errorFetchingPartners: payload,
          isFetchingPartners: false
        }
     default:
      return state
    }
   }


export default partnersReducer;
