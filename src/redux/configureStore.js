import {createStore,combineReducers,applyMiddleware} from 'redux';
// import { Reducer,initialState } from './reducer';
import { Electronics } from './dishes';
// import {Comments} from './comments';
import {Refreshments} from './promotions';
import { Stationaries } from './leaders';
// import { DISHES } from '../shared/dishes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = ()=>{
    const store = createStore(
        combineReducers({
            dishes:Electronics,
            // comments:Comments,
            promotions:Refreshments,
            leaders:Stationaries,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    )
    return store;
}