import cutsDataContext from "./cutsDataContext";
import server from '../../config/bdApi';

let url = '/cuts/'

const cutsReducer = (state, action) => {
  switch (action.type) {
    case "get_cuts":
      return { cuts: action.payload.cuts, cashboxes: action.payload.cashboxes, total_system: action.payload.total_system, errors:[] };
    case "refresh":
      return { ...state, cuts: action.payload.cuts, errors:[] };
    case "errors":
      return {cuts: action.payload.cuts, cashboxes: action.payload.cashboxes, total_system: action.payload.total_system, errors: action.payload.errors};
    default:
      return state;
  }
}

const getCuts = dispatch => async ({ setLoader }) => {
  try {
    setLoader('flex');
    const cuts = await server.get(url);
    const cashboxes = await server.get('/cashboxes/')
    const total_system = await server.get('/cuts/search/cashboxes/')
    setLoader('none');
    dispatch({ type: "get_cuts", payload: { cuts: cuts.data.data, cashboxes: cashboxes.data.data, total_system: total_system.data.data, errors:[] } })
  } catch (error) {
    console.log({ error })
  }
}

const saveCuts = dispatch => async ({ setLoader, id, form, handleReset, action }) => {
  try {
    setLoader('flex');
    let response = '';
    // console.log(action);
    if (action === 'Create') {
      response = await server.post(url, form)
    } else {
      response = await server.put(`${url}${id}`, form)
    }
    const cuts = refreshData();
    handleReset();
    cuts.then(function (value) {
      dispatch({ type: "refresh", payload: { cuts: value }, errors:[] })
      setLoader('none');
    })
  } catch (error) {
    console.log(error.response.data);
    const cuts = await server.get(url);
    const cashboxes = await server.get('/cashboxes/')
    const total_system = await server.get('/cuts/search/cashboxes/')
    dispatch({type: "errors", payload:{cuts: cuts.data.data, cashboxes: cashboxes.data.data, total_system: total_system.data.data, errors: error.response.data}});
    setLoader('none');
  }
}

const deleteCuts = dispatch => async ({ id, setLoader, handleReset }) => {
  try {
    setLoader('flex');
    // console.log(id)
    await server.delete(`${url}${id}`);
    handleReset();
    const cuts = refreshData();
    cuts.then(function (value) {
      dispatch({ type: 'refresh', payload: { cuts: value } })
    })
    setLoader('none')
  } catch (error) {
    console.log(error);
  }
}

const refreshData = async () => {
  try {
    const response = await server.get(url)
    return response.data.data;
  } catch (error) {
    console.log({ error })
  }
}

export const { Provider, Context } = cutsDataContext(
  cutsReducer, { getCuts, saveCuts, deleteCuts }, { cuts: [], cashboxes:[], total_system:null, errors:[] }
)