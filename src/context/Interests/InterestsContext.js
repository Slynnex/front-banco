import dataContext from "../dataContext";
import server from '../../config/bdApi';

const interestsReducer = (state, action) =>{
    switch(action.type){
        case "get_interests":
            return{interests: action.payload};
        case "refresh":
            console.log(action.payload)
            return{clients: action.payload}
        default: 
            return state;
    }
}

const get = dispatch => async() => {
    try{
        const response = await server.get('/interests');
        dispatch({type: "get_interests", payload: response.data.data})
    }catch(error){
        console.log({error});
    }
}


export const {Provider, Context} = dataContext(
    interestsReducer,{get},{interests:[]}
)