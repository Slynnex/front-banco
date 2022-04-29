import dataContext from "../dataContext";
import server from '../../config/bdApi';

const clientsReducer = (state, action) =>{
    switch(action.type){
        case "get_clients":
            return{clients: action.payload};
        case "refresh":
            console.log(action.payload)
            return{clients: action.payload}
        default: 
            return state;
    }
}

const get = dispatch => async(search) => {
    try{
        const response = await server.get(`/clients/index/name/${search}`);
        dispatch({type: "get_clients", payload: response.data.data})
    }catch(error){
        console.log({error});
    }
}

const save = dispatch => async({form,setCreate,setDialog,setShow,type}) => {
    try{
       await server.post(`/clients/${type}`,form)
       const clients = refreshData();
       clients.then(function (value){
           dispatch({type: 'refresh', payload:value})
       })
       setCreate(false);
       setDialog(false);
       setShow(true);
    }catch(err){
        console.log({err})
    }
}

const refreshData = async ()=>{
    try{
        const response = await server.get('/clients')
        return  response.data.data;

    }catch(err){
        console.log({err})
    }
  }

export const {Provider, Context} = dataContext(
    clientsReducer,{save,get},{clients:[]}
)