import axios from 'axios';
import {
    GET_CONNECTIONS,
    GET_CONNECTIONS_SUCCESS,
    GET_CONNECTIONS_FAIL } from '../constants';

export function getConnections() {
    return {
      type: GET_CONNECTIONS
    };
}

export function getConnectionsSuccess(allConnections) {
    return {
        type: GET_CONNECTIONS_SUCCESS,
        payload: allConnections
    };
}

export function getConnectionsFail(errorFetchingConnections) {
    return {
        type: GET_CONNECTIONS_FAIL,
        payload: errorFetchingConnections
    };
}

export const fetchConnections = () => async(dispatch) => {
    dispatch(getConnections());
    try {
        const response = await axios.get('/connections/list');
        dispatch(getConnectionsSuccess(response.data.payload));
      } catch (error) {
        dispatch(getConnectionsFail(error));
      }
}
