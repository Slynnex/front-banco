import transactionsAreaDataContext from "./transactionsAreaDataContext";
import server from '../../config/bdApi';

const transactionsReducer = (state, action) =>{
    switch(action.type){
        case "get_transactions":
            return{transactions: action.payload.transactions, errors: []
                };
        case "refresh":
            return{...state, transactions: action.payload.transactions, errors: []}
        case "error":
            return {transactions: action.payload.transactions, errors: action.payload.errors}
        default: 
            return state;
    }
}

const getTransactions = dispatch => async({setLoader},search,page) => {
    try{
        if(search==='inicial'){
            setLoader('flex');
        }
        if(search===''){
            search='inicial'
        }
        const transactions = await server.get(`/transactions/${search}/page=${page}`)
        setLoader('none');
        dispatch({type: "get_transactions", payload:{transactions: transactions.data.data, errors: []}})
    }catch(err){
        setLoader('none');
        console.log({err});
    }
}

const saveTransactions = dispatch => async({setLoader, id, form, handleReset}) => {
    try {
        setLoader('flex');
        let response = '';
        response = await server.post('/transactions/',form)
        const transactions = refreshData();
        handleReset();
        transactions.then(function(value){
            dispatch({type: "refresh", payload:{transactions:value, errors: []}})
        })
        setLoader('none')
    } catch (err) {
        const transactions = await server.get('/transactions/initial/page=1')
        console.log(transactions)
        dispatch({type: "error", payload:{transactions: transactions.data.data, errors: err.response.data}});
        setLoader('none');
    }
}

const refreshData = async ()=>{
    try{
        const response = await server.get('/transactions/inicial/page=1')
        return  response.data.data;

    }catch(err){
        console.log({err})
    }
  }

export const {Provider, Context} = transactionsAreaDataContext(
    transactionsReducer,{getTransactions,saveTransactions},{transactions:[], errors:[]}
)