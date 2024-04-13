import axios from "axios"
import { GetAtheleteStart, GetAtheleteSuccess, GetAtheleteFail } from "../Reducer/CoordinatorReducer"

const url = "http://localhost:5032/api"

export const getAtheleteApi = (values) => async (dispatch) => {
    try {
        dispatch(GetAtheleteStart())
        console.log(values)
        const { data } = await axios.get(`${url}/Athletes/getAthelete`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetAtheleteSuccess(data))
    } catch (error) {
        dispatch(GetAtheleteFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}