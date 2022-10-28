// import { LEADERS } from "../shared/leaders";
import * as ActionTypes from './ActionTypes'
export const Stationaries=(state={
    isLoading:true,
    errMess:null,
    leaders:[]
},action)=>{
    switch (action.type) {
        case(ActionTypes.ADD_STATIONARIES):
            return{...state,isLoading:false,errMess:null,leaders:action.payload}
        
        case(ActionTypes.STATIONARIES_LOADING):
            return{...state,isLoading:true,errMess:null,leaders:[]} //make some change to state
        case(ActionTypes.STATIONARIES_FAILED):
        return{...state,isLoading:false,errMess:action.payload,leaders:[]}
        default:return state;
    }
}