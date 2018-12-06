import axios from 'axios';
import {
    GET_PARTNERS,
    GET_PARTNERS_SUCCESS,
    GET_PARTNERS_FAIL } from '../constants';

export function getPartners() {
    return {
      type: GET_PARTNERS
    };
}

export function getPartnersSuccess(allPartners) {
    return {
        type: GET_PARTNERS_SUCCESS,
        payload: allPartners
    };
}

export function getPartnersFail(errorFetchingPartners) {
    return {
        type: GET_PARTNERS_FAIL,
        payload: errorFetchingPartners
    };
}

export const fetchPartners = () => async(dispatch) => {
    dispatch(getPartners());
    try {
        const response = await axios.get('/partners/list');
        dispatch(getPartnersSuccess(response.data.payload));
      } catch (error) {
        dispatch(getPartnersFail(error));
      }
}
