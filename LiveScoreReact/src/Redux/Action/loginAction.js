import axios from "axios"
import { LoginFail, LoginStart, LoginSuccess } from "../Reducer/loginReducer"



export const loginApi = (values)=>async (dispatch)=>{
try{
    dispatch(LoginStart())
console.log(values)
    const {data} = await axios.post(`http://localhost:52038/api/Login/Login`,values,{
        headers: {
            "Content-Type": "application/json"
        }
    })
    dispatch(LoginSuccess(data))
}catch(error){
dispatch(LoginFail(error.response.data))
// console.log(e.response.data.msg)
}
}