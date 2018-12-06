import axios from 'axios';
import {
    GET_GENERAL,
    GET_GENERAL_SUCCESS,
    GET_GENERAL_FAIL  } from '../constants';

export function getGeneral() {
    return {
      type: GET_GENERAL
    };
}

export function getGeneralSuccess(allRequests) {
    return {
        type: GET_GENERAL_SUCCESS,
        payload: allRequests
    };
}

export function getGeneralFail(errorFetchingRequests) {
    return {
        type: GET_GENERAL_FAIL,
        payload: errorFetchingRequests
    };
}

export const fetchGeneralRequests = () => async(dispatch) => {
    dispatch(getGeneral());
    try {
        const response = await axios.get('/general/list');
        dispatch(getGeneralSuccess(response.data.payload));
      } catch (error) {
        dispatch(getGeneralFail(error));
      }
}
