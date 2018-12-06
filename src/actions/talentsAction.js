import axios from 'axios';
import {
    GET_TALENT,
    GET_TALENT_SUCCESS,
    GET_TALENT_FAIL } from '../constants';

export function getTalents() {
    return {
      type: GET_TALENT
    };
}

export function getTalentsSuccess(allTalents) {
    return {
        type: GET_TALENT_SUCCESS,
        payload: allTalents
    };
}

export function getTalentsFail(errorFetchingTalents) {
    return {
        type: GET_TALENT_FAIL,
        payload: errorFetchingTalents
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
