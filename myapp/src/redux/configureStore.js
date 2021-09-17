import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from'redux-thunk';
import logger from'redux-logger';
import {createForms} from 'react-redux-form';
import {InitialFeedback} from './forms';

export const ConfigureStore = () => {

    // creo la store, me traigo los reducers individuales, y los combino.
    // estos reducers, mantienen mi store actualizada mediante sus acciones definidas en ActionTypes y ejecutadas en cada reducer individual
    // Estas acciones se basan en un "Tipo de accion"(verbo) y un payload con la data necesaria para hacer operaciones ABM en la store 
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            leaders:Leaders,
            promotions:Promotions,
            comments:Comments,
            ...createForms({
                feedback:InitialFeedback
            })            
        }),
        applyMiddleware(thunk, logger)
        // +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )


    return store;
}