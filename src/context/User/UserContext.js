import dataContext from "../dataContext";
import server from '../../config/bdApi';
import jwt_decode from "jwt-decode";

const userReducer = (state, action) =>{
    switch(action.type){
        case "get_user":
            console.log(action.payload)
            return {name: action.payload.name, rol: action.payload.rol,token: action.payload.token};
        default: 
            return state;
    }
}

const login = dispatch => async({loginInfo,setLoader,setErrorS}) => {
   try{
    const response = await server.post('/login',loginInfo);
    localStorage.setItem("token", response.data.token);
    const decode = jwt_decode(response.data.token);
    dispatch({type: "get_user", payload: {name: decode.session.name, rol: decode.session.rol, token: response.data.token}});
    setLoader('none')
   }catch(error){
       console.log(error.response)
       setErrorS({message:"User or Password Invalid",display:'block'})
       setLoader('none')
   }
}

const tryLocalSignin = dispatch => async () => {
    const token = localStorage.getItem('token');
    if(token){
        const decode = jwt_decode(token);
        console.log(token)
        dispatch({type: "get_user", payload: {name: decode.session.name, rol: decode.session.rol, token: token}});
    }
}


export const {Provider, Context} = dataContext(userReducer,{login,tryLocalSignin},{token:null,errors:'',name:'',rol:''})