import axios from "axios"
import { GetCategoryFail, GetCategoryStart, GetCategorySuccess } from "../Reducer/AdminReducer"

const url = "http://localhost:5032/api"

export const getCategoryApi = () => async (dispatch) => {
    try {
        dispatch(GetCategoryStart())
        
        const { data } = await axios.get(`${url}/Categories/GetCategories`,  {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetCategorySuccess(data))
    } catch (error) {
        dispatch(GetCategoryFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}