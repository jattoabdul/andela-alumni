import {
  GET_TALENT,
  GET_TALENT_SUCCESS,
  GET_TALENT_FAIL } from '../constants';

const initialState = {
  allTalents: [],
  meta: {},
  isFetchingTalents: false,
  errorFetchingTalents: {}
};

const talentsReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch (type) {
      case GET_TALENT:
        return {
          ...state,
          isFetchingTalents: true
        }
      case GET_TALENT_SUCCESS:
        return {
          ...state,
          allTalents: payload.talents,
          meta: payload.meta,
          isFetchingTalents: false
        }
      case GET_TALENT_FAIL:
        return {
          ...state,
          errorFetchingTalents: payload,
          isFetchingTalents: false
        }
     default:
      return state
    }
   }


export default talentsReducer;