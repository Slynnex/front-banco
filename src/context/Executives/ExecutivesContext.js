import executivesDataContext from "./executivesDataContext";
import server from '../../config/bdApi';
import { CallToActionSharp } from "@material-ui/icons";

const executivesReducer = (state, action) =>{
    switch(action.type){
        case "get_executives":
            return{executives: action.payload.executives, 
                   positions: action.payload.positions,
                   areas: action.payload.areas
                };
        case "refresh":
            return{...state, executives: action.payload.executives}
        default: 
            return state;
    }
}

const getExecutives = dispatch => async({setLoader}) => {
    try{
        setLoader('flex');
        const executives = await server.get('/executives')
        const positions = await server.get('/positions')
        const areas = await server.get('/areas')
        setLoader('none')
        dispatch({type: "get_executives", payload:{executives: executives.data.data,positions: positions.data.data, areas: areas.data.data}})
    }catch(err){
        console.log({err})
    }
}

const saveExecutives = dispatch => async({setLoader, id, form, handleReset}) => {
    try {
        setLoader('flex');
        let response = '';
        if(!id){
            response = await server.post('/executives',form)
        }else{
            response = await server.put(`/executives/${id}`,form)
        }

        const executives = refreshData();
        handleReset();
        executives.then(function(value){
            dispatch({type: "refresh", payload:{executives:value}})
        })
        setLoader('none')
    } catch (error) {
        console.log(error)
    }
}

const deleteExecutive = dispatch => async({id,setLoader,handleReset})=>{
    try{
        setLoader('flex');
        await server.delete(`/executives/${id}`);
        handleReset();
        const executives = refreshData();
        executives.then(function (value){
            dispatch({type: 'refresh', payload:{executives: value}})
        })
        setLoader('none')
    }catch(error){
        console.log(error);
    }
}

const refreshData = async ()=>{
    try{
        const response = await server.get('/executives')
        return  response.data.data;

    }catch(err){
        console.log({err})
    }
  }

export const {Provider, Context} = executivesDataContext(
    executivesReducer,{getExecutives,saveExecutives,deleteExecutive},{executives:[],areas:[],positions:[]}
)