import positionAreaDataContext from './positionAreaDataContext';
import server from '../../config/bdApi';
import { positions } from '@mui/system';

const positionAreaReducer = (state, action) =>{
    switch(action.type){
        case "get_positions":
            return{positions: action.payload.positions,areas: action.payload.areas};
        case "add_position":
            return{...state,positions: [...state.positions,action.payload]};
        case "edit_position":
            return{...state,positions: state.positions.map(p => p.id !== action.payload.id ? p : action.payload)}
        case "delete_position":
            return{...state,positions: state.positions.filter((p) => p.id !== action.payload)}
        case "refresh_area":
            return{...state,areas :action.payload};
        case "delete_area":
            return{...state,areas: state.areas.filter((a) => a.id !== action.payload)}
        default: 
            return state;
    }
}

const getPositionArea = dispatch => async({setLoader}) => {
    try{
        setLoader('flex');
        const positions = await server.get('/positions')
        const areas = await server.get('/areas')
        setLoader('none')
        dispatch({type: "get_positions", payload:{positions: positions.data.data, areas: areas.data.data}})
    }catch(error){
        console.log(error)
        setLoader('none')
    }
}

const addPosition = dispatch => async({setLoader,name,setOpenP}) => {
    try{
        setLoader('flex');
        const response = await server.post('/positions',{name});
        setLoader('none');
        setOpenP(false);
        dispatch({type: "add_position", payload:response.data.data})
    }catch(error){
        console.log(error)
        setLoader('none')
    }
}

const editPosition = dispatch => async({setLoader,name,id,setOpenP}) => {
    try{
        setLoader('flex');
        const response = await server.put(`/positions/${id}`,{name});
        setLoader('none');
        setOpenP(false);
        dispatch({type: "edit_position", payload:response.data.data})
    }catch(error){
        console.log(error)
        setLoader('none')
    }
}

const deletePosition = dispatch => async({setLoader,id}) => {
    try{
        setLoader('flex');
        await server.delete(`/positions/${id}`);
        setLoader('none');
        dispatch({type: "delete_position", payload:id})
    }catch(error){
        console.log(error)
        setLoader('none')
    }
}

const addArea = dispatch => async({name,PositionId,setLoader,setOpenA}) => {
    try{
        setLoader('flex');
        await server.post('/areas',{name,PositionId});
        setLoader('none')
        setOpenA(false);
        const areas = refreshDataArea();
        areas.then(function (value){
            dispatch({type: 'refresh_area', payload: value})
        })
    }catch(error){
        console.log(error)
        setLoader('none')
    }
}

const refreshDataArea = async ()=>{
    try{
        const response = await server.get('/areas')
        return  response.data.data;

    }catch(err){
        console.log({err})
    }
  }

const editArea = dispatch => async({name,PositionId,setLoader,setOpenA,id}) => {
    try{
        setLoader('flex');
        await server.put(`/areas/${id}`,{name,PositionId});
        setLoader('none')
        setOpenA(false);
        const areas = refreshDataArea();
        areas.then(function (value){
            dispatch({type: 'refresh_area', payload: value})
        })
    }catch(error){
        console.log(error)
        setLoader('none')
    }
}

const deleteArea = dispatch => async({setLoader,id}) => {
    try{
        setLoader('flex');
        await server.delete(`/areas/${id}`);
        setLoader('none');
        dispatch({type: "delete_area", payload:id})
    }catch(error){
        console.log(error)
        setLoader('none')
    }
}

export const {Provider, Context} = positionAreaDataContext(
    positionAreaReducer,{getPositionArea,addPosition,editPosition,deletePosition,addArea,editArea,deleteArea},{areas:[],positions:[]}
)