import denominationsDataContext from "./denominationsDataContext";
import server from '../../config/bdApi';

const denominationsReducer = (state, action) => {
  switch (action.type) {
    case "get_denominations":
      return { denominations: action.payload.denominations };
    case "refresh":
      return { ...state, denominations: action.payload.denominations }

    default:
      return state;
  }
}


const getDenominations = dispatch => async ({ setLoader }) => {
  try {
    setLoader('flex');
    const denominations = await server.get('/denominations');
    // console.log(denominations);
    setLoader('none');
    dispatch({ type: "get_denominations", payload: { denominations: denominations.data } })
  } catch (error) {
    console.log({ error })
  }
}

const saveDenominations = dispatch => async ({ setLoader, id, form, handleReset, action }) => {
  try {
    setLoader('flex');
    let response = '';
    // console.log(action);
    if (action === 'Create') {
      response = await server.post('/denominations', form)
    } else {
      response = await server.put(`/denominations/${id}`, form)
    }
    const denominations = refreshData();
    handleReset();
    denominations.then(function (value) {
      dispatch({ type: "refresh", payload: { denominations: value } })
      setLoader('none');
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteDenomination = dispatch => async ({ id, setLoader, handleReset }) => {
  try {
    setLoader('flex');
    // console.log(id)
    await server.delete(`/denominations/${id}`);
    handleReset();
    const denominations = refreshData();
    denominations.then(function (value) {
      dispatch({ type: 'refresh', payload: { denominations: value } })
    })
    setLoader('none')
  } catch (error) {
    console.log(error);
  }
}

const refreshData = async () => {
  try {
    const response = await server.get('/denominations')
    return response.data;
  } catch (error) {
    console.log({ error })
  }
}

export const { Provider, Context } = denominationsDataContext(
  denominationsReducer, { getDenominations, saveDenominations, deleteDenomination }, { denominations: [] }
)
