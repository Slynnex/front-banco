import dataContext from "../dataContext";
import server from '../../config/bdApi';

const creditDetailsReducer = (state, action) =>{
    switch(action.type){
        case "get_credit":
            return{creditDetails: action.payload};
        case "refresh":
            console.log(action.payload)
            return{clients: action.payload}
        default: 
            return state;
    }
}

const get = dispatch => async() => {
    try{
        const response = await server.get('/creditdetails');
        dispatch({type: "get_credit", payload: response.data.data})
    }catch(error){
        console.log({error});
    }
}


export const {Provider, Context} = dataContext(
    creditDetailsReducer,{get},{creditDetails:[]}
)