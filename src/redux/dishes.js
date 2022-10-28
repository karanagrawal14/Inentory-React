import {DISHES} from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

export const Electronics = (state = {isLoading:true,errMess:null,dishes:[]},action)=>{
    switch(action.type){
        case ActionTypes.ADD_ELECTRONICS:
            return {...state,isLoading:false,errMess:null,dishes:action.payload}
        case ActionTypes.ELECTRONICS_LOADING:
            return {...state,isLoading:true,errMess:false,dishes:[]};
        case ActionTypes.ELECTRONICS_FAILED:
            return {...state,isLoading:false,errMess:action.payload};
        default:
            return state;
    }
}