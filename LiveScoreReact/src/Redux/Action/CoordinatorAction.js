import axios from "axios"
import { GetAtheleteStart, GetAtheleteSuccess, GetAtheleteFail, AtheletePostStart, AtheletePostSuccess, AtheletePostFail, CoordinatorPostStart, CoordinatorPostSuccess, CoordinatorPostFail, RefereePostStart, RefereePostSuccess, RefereePostFail, GetRefereeStart, GetRefereetSuccess, GetRefereeFail } from "../Reducer/CoordinatorReducer"

const url = "http://localhost:5032/api"

export const getAtheleteApi = () => async (dispatch) => {
    try {
        dispatch(GetAtheleteStart())

        const { data } = await axios.get(`${url}/Athletes/getAthelete`, {
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

export const AtheletePostApi = (values) => async (dispatch) => {
    try {
        dispatch(AtheletePostStart())
        console.log(values)
        const { data } = await axios.post(`${url}/Athletes/PostAthelete`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch(AtheletePostSuccess(data))
    } catch (error) {
        dispatch(AtheletePostFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}
export const CoordinatorPostApi = (values) => async (dispatch) => {
    try {
        dispatch(CoordinatorPostStart())
        console.log(values)
        const { data } = await axios.post(`${url}/ACR/AddCoordinator`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch(CoordinatorPostSuccess(data))
    } catch (error) {
        dispatch(CoordinatorPostFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}
export const RefereePostApi = (values) => async (dispatch) => {
    try {
        dispatch(RefereePostStart())
        console.log(values)
        const { data } = await axios.post(`${url}/ACR/AddReferee`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch(RefereePostSuccess(data))
    } catch (error) {
        dispatch(RefereePostFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}

export const GetRefereeApi = () => async (dispatch) => {
    try {
        dispatch(GetRefereeStart())

        const { data } = await axios.get(`${url}/ACR/Referee`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetRefereetSuccess(data))
    } catch (error) {
        dispatch(GetRefereeFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}