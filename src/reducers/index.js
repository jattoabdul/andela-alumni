import { combineReducers } from 'redux';
import talentsReducer from './talentsReducer';
import partnersReducer from './partnersReducer';
import generalReducer from './generalReducer';
import connectionsReducer from './connectionsReducer';

const rootReducer = combineReducers({
    talentsReducer,
    partnersReducer,
    generalReducer,
    connectionsReducer
});

export default rootReducer;