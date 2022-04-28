import interestsDataContext from "./interestsDataContext";
import server from '../../config/bdApi';

let url = '/interests/'

const interestsReducer = (state, action) =>{
    switch(action.type){
        case "get_interests":
            return{interests: action.payload.interests,
                };
        case "refresh":
            return{...state, interests: action.payload.interests}
        default: 
            return state;
    }
}

const getInterests = dispatch => async({setLoader}) => {
    try{
        setLoader('flex');
        const interests = await server.get(url)
        setLoader('none')
        dispatch({type: "get_interests", payload:{interests: interests.data.data}})
    }catch(err){
        console.log({err})
    }
}

const saveInterests = dispatch => async({setLoader, id, form, handleReset}) => {
    try {
        setLoader('flex');
        let response = '';
        if(!id){
            response = await server.post(url,form)
        }else{
            response = await server.put(`${url}${id}`,form)
        }

        const interests = refreshData();
        handleReset();
        interests.then(function(value){
            dispatch({type: "refresh", payload:{interests:value}})
        })
        setLoader('none')
    } catch (error) {
        console.log(error)
    }
}

const deleteInterests = dispatch => async({id,setLoader,handleReset})=>{
    try{
        setLoader('flex');
        await server.delete(`${url}${id}`);
        handleReset();
        const interests = refreshData();
        interests.then(function (value){
            dispatch({type: 'refresh', payload:{interests: value}})
        })
        setLoader('none')
    }catch(error){
        console.log(error);
    }
}

const refreshData = async ()=>{
    try{
        const response = await server.get(url)
        return  response.data.data;

    }catch(err){
        console.log({err})
    }
  }

export const {Provider, Context} = interestsDataContext(
    interestsReducer,{getInterests,saveInterests,deleteInterests},{interests:[]}
)