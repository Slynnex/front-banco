import mortgagesDataContext from "./mortgagesDataContext";
import server from '../../config/bdApi';

let url = '/mortgages/'


const mortgagesReducer = (state, action) => {
  switch (action.type) {
    case "get_mortgages":
      return {
        mortgages: action.payload.mortgages,
      };
    case "refresh":
      return { ...state, mortgages: action.payload.mortgages }
    default:
      return state;
  }
}

const getMortgages = dispatch => async ({ setLoader }) => {
  try {
    setLoader('flex');
    const mortgages = await server.get(url)
    setLoader('none')
    dispatch({ type: "get_mortgages", payload: { mortgages: mortgages.data.data } })
  } catch (err) {
    console.log({ err })
  }
}

const saveMortgages = dispatch => async ({ setLoader, id, form, handleReset }) => {
  try {
    setLoader('flex');
    let newForm = {
      aproved_amount: form.aproved_amount
    }
    // console.log(newForm);
    let response = '';
    if (!id) {
      response = await server.post(url, form)
    } else {
      response = await server.put(`${url}${id}`, newForm)
    }

    const mortgages = refreshData();
    handleReset();
    mortgages.then(function (value) {
      dispatch({ type: "refresh", payload: { mortgages: value } })
    })
    setLoader('none')
  } catch (error) {
    console.log(error)
  }
}

const deleteMortgages = dispatch => async ({ id, setLoader, handleReset }) => {
  try {
    setLoader('flex');
    await server.delete(`${url}${id}`);
    handleReset();
    const mortgages = refreshData();
    mortgages.then(function (value) {
      dispatch({ type: 'refresh', payload: { mortgages: value } })
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

  } catch (err) {
    console.log({ err })
  }
}

export const { Provider, Context } = mortgagesDataContext(
  mortgagesReducer, { getMortgages, saveMortgages, deleteMortgages }, { mortgages: [] }
)