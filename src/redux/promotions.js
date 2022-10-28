import { PROMOTIONS } from "../shared/promotions";
import * as ActionTypes from './ActionTypes';
export const Refreshments = (state={isLoading:true,errMess:null,promotions:[]},action)=>
{
    switch(action.type){
        case ActionTypes.ADD_REFRESHMENTS:
            return {...state,isLoading:false,errMess:null,promotions:action.payload}
        case ActionTypes.REFRESHMENTS_LOADING:
            return {...state,isLoading:true,errMess:null,promotions:[]}
        case ActionTypes.REFRESHMENTS_FAILED:
            return {...state,isLoading:false,errMess:action.payload};
        
        default:
            return state;
    }
}