import creditDetailsDataContext from "./creditDetailsDataContext";
import server from '../../config/bdApi';

let url = '/creditdetails/'

const creditDetailsReducer = (state, action) =>{
    switch(action.type){
        case "get_creditdetails":
            return{creditDetails: action.payload.creditDetails,
                };
        case "refresh":
            return{...state, creditDetails: action.payload.creditDetails}
        default: 
            return state;
    }
}

const getCreditDetails = dispatch => async({setLoader}) => {
    try{
        setLoader('flex');
        const creditDetails = await server.get(url)
        setLoader('none')
        dispatch({type: "get_creditdetails", payload:{creditDetails: creditDetails.data.data}})
    }catch(err){
        console.log({err})
    }
}

const saveCreditDetails = dispatch => async({setLoader, id, form, handleReset}) => {
    try {
        setLoader('flex');
        let response = '';
        if(!id){
            response = await server.post(url,form)
        }else{
            response = await server.put(`${url}${id}`,form)
        }

        const creditDetails = refreshData();
        handleReset();
        creditDetails.then(function(value){
            dispatch({type: "refresh", payload:{creditDetails:value}})
        })
        setLoader('none')
    } catch (error) {
        console.log(error)
    }
}

const deleteCreditDetails = dispatch => async({id,setLoader,handleReset})=>{
    try{
        setLoader('flex');
        await server.delete(`${url}${id}`);
        handleReset();
        const creditDetails = refreshData();
        creditDetails.then(function (value){
            dispatch({type: 'refresh', payload:{creditDetails: value}})
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

export const {Provider, Context} = creditDetailsDataContext(
    creditDetailsReducer,{getCreditDetails,saveCreditDetails,deleteCreditDetails},{creditDetails:[]}
)