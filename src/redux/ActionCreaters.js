import * as ActionTypes from './ActionTypes';
// import {DISHES} from '../shared/dishes';
import {baseUrl} from '../shared/baseUrl';


export const fetchElectronics=()=>(dispatch)=>{
    dispatch(electronicsLoading(true));
    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000);
    return fetch(baseUrl+'electronics')
    .then(response=>response.json())
    .then(dishes=>dispatch(addElectronics(dishes)))
}
export const electronicsLoading=()=>({
    type:ActionTypes.ELECTRONICS_LOADING,
    
})

export const electronicsFailed=(errmess)=>({
    type:ActionTypes.ELECTRONICS_FAILED,
    payload:errmess
})

export const addElectronics = (dishes)=>({
    type:ActionTypes.ADD_ELECTRONICS,
    payload:dishes
})


export const fetchStationaries = ()=>(dispatch)=>{
    dispatch(stationariesLoading());
    return fetch(baseUrl+'stationaries')
    .then(response=>response.json())
    .then(promos=>dispatch(addStationaries(promos)));
}

export const stationariesLoading = ()=>({
    type:ActionTypes.STATIONARIES_LOADING
})

export const stationariesFailed = (errmess)=>({
    type:ActionTypes.STATIONARIES_FAILED,
    payload:errmess
})

export const addStationaries = (promos)=>({
    type:ActionTypes.ADD_STATIONARIES,
    payload:promos
})


//Refreshments
export const fetchRefreshments = ()=>(dispatch)=>{
    dispatch(refreshmentsLoading());

    return fetch(baseUrl+'refreshments')
    .then(response=>{
        if(response.ok)
        {
            return response;
        }
        else{
            var error=new Error('Error'+response.status+': '+response.statusText)//ex 404 
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    })//when we do not get response from the server
     .then(response=>response.json())
     .then(leaders=>dispatch(addRefreshments(leaders)))
     .catch(error=>dispatch(refreshmentsFailed(error.message)))

}
export const refreshmentsLoading = ()=>({
    type:ActionTypes.REFRESHMENTS_LOADING
})
export const addRefreshments = (leaders)=>({
    type:ActionTypes.ADD_REFRESHMENTS,
    payload:leaders
})
export const refreshmentsFailed = (leaders)=>({
    type:ActionTypes.ADD_REFRESHMENTS,
    payload:leaders
})


//post feedback
export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message)=>(dispatch)=>{
    const feedback = {
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message

    };
    
    return fetch(baseUrl+'feedback',{
        method:"POST",
        body:JSON.stringify(feedback),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"same-origin"

    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error '+response.status+': '+response.statusText)
            error.response=response;
            throw error;
        }
    },error=>{
        throw error;
    })
    .then(response=>response.json())
    .then(response=>alert('Thanks for the response'+JSON.stringify(response)))
    .catch(error=>{console.log('Post Comments',error.message);alert('Your comment could not be posted\nError: '+error.message);})
};