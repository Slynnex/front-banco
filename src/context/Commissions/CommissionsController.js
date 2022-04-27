import commissionsDataContext from "./commissionsDataContext";
import server from '../../config/bdApi';
// import { CallToActionSharp } from "@material-ui/icons";

const commissionsReducer = (state, action) => {
  switch (action.type) {
    case "get_commissions":
      return {
        commissions: action.payload.commissions,
      };
    case "refresh":
      return { ...state, commissions: action.payload.commissions }
    default:
      return state;
  }
}

const getCommissions = dispatch => async ({ setLoader }) => {
  try {
    setLoader('flex');
    const commissions = await server.get('/commissions')
    // console.log(commissions.data.data);
    setLoader('none');
    dispatch({ type: "get_commissions", payload: { commissions: commissions.data.data } })
  } catch (err) {
    console.log({ err })
  }
}

const saveCommissions = dispatch => async ({ setLoader, id, form, handleReset }) => {
  try {
    setLoader('flex');
    let response = '';
    if (!id) {
      response = await server.post('/commissions/', form)
    } else {
      console.log(form)
      response = await server.put(`/commissions/${id}`, form)
    }

    const commissions = refreshData();
    handleReset();
    commissions.then(function (value) {
      dispatch({ type: "refresh", payload: { commissions: value } })
      setLoader('none')
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteCommissions = dispatch => async ({ id, setLoader, handleReset }) => {
  try {
    setLoader('flex');
    await server.delete(`/commissions/${id}`);
    handleReset();
    const commissions = refreshData();
    commissions.then(function (value) {
      dispatch({ type: 'refresh', payload: { commissions: value } })
    })
    setLoader('none')
  } catch (error) {
    console.log(error);
  }
}

const refreshData = async () => {
  try {
    const response = await server.get('/commissions/')
    return response.data.data;

  } catch (err) {
    console.log({ err })
  }
}

export const { Provider, Context } = commissionsDataContext(
  commissionsReducer, { getCommissions, saveCommissions, deleteCommissions }, { commissions: [] }
)