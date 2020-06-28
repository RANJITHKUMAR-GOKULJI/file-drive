import action from './action';
import getReducer from './reducer'
import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
    {
        sessionUser : getReducer(action.sessionUser)
    }
)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

export default store;