import conceptsDataContext from "./conceptsDataContext";
import server from '../../config/bdApi';

const conceptReducer = (state, action) => {
    switch (action.type){
        case "add_concept":
            return {
                concepts: action.payload
            }
        case "refresh":
            return{
                concepts: action.payload.concepts
            }
        default: return state;
    }
}

const getConcepts = dispatch => async({setLoader}) => {
    try {
        setLoader('flex');
        const concepts = await server.get('/concepts');
        setLoader('none');
        console.log(concepts.data.data);
        dispatch({type:"add_concept", payload:concepts.data.data});
    } catch (error) {
        console.log(error);
    }
}

const saveConcepts = dispatch => async({setLoader, id, form, handleReset}) => {
    try {
        setLoader('flex');
        let response = '';
        if(!id){
            response = await server.post('/concepts',form)
        }else{
            response = await server.put(`/concepts/${id}`,form)
        }

        const concepts = refreshData();
        handleReset();
        concepts.then(function(value){
            dispatch({type: "refresh", payload:{concepts:value}})
        })
        setLoader('none')
    } catch (error) {
        console.log(error)
    }
}

const deleteConcept = dispatch => async({id,setLoader,handleReset})=>{
    try{
        setLoader('flex');
        await server.delete(`/concepts/${id}`);
        handleReset();
        const concepts = refreshData();
        concepts.then(function (value){
            dispatch({type: 'refresh', payload:{concepts: value}})
        })
        setLoader('none')
    }catch(error){
        console.log(error);
    }
}

const refreshData = async ()=>{
    try{
        const response = await server.get('/concepts')
        return  response.data.data;

    }catch(err){
        console.log({err})
    }
  }

export const {Provider, Context} = conceptsDataContext(
    conceptReducer,{getConcepts, saveConcepts, deleteConcept},{concepts:[]}
)