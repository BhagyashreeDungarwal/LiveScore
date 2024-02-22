import axios from "axios"
import { LoginFail, LoginStart, LoginSuccess } from "../Reducer/loginReducer"

export const loginApi = ()=>async (dispatch)=>{
try{
    dispatch(LoginStart())
    const {data} = await axios.post('http://localhost:52038/api/Login/Login')
    dispatch(LoginSuccess(data))
}catch(e){
dispatch(LoginFail(e.message))
}
}