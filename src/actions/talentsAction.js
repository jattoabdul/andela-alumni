import axios from 'axios';
import {
    GET_TALENT,
    GET_TALENT_SUCCESS,
    GET_TALENT_FAIL } from '../constants';


export const getSelectedLocation = () => {
    return localStorage.getItem('location') || 'lagos';
}

export const setSelectedLocation = (location = 'lagos') => (dispatch) => {
    localStorage.setItem('location', location);
}

export function getTalents() {
    return {
      type: GET_TALENT
    };
}

export function getTalentsSuccess(allGuests) {
    return {
        type: GET_TALENT_SUCCESS,
        payload: allGuests
    };
}

export function getTalentsFail(errorFetchingGuest) {
    return {
        type: GET_TALENT_FAIL,
        payload: errorFetchingGuest
    };
}

export const fetchTalents = () => async(dispatch) => {
    dispatch(getTalents());
    try {
        const response = await axios.get('/talents/list');
        dispatch(getTalentsSuccess(response.data.payload));
      } catch (error) {
        dispatch(getTalentsFail(error));
      }
}
