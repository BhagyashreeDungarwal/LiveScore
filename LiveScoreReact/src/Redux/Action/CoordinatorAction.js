import axios from "axios"
import {
    GetAtheleteStart, GetAtheleteSuccess, GetAtheleteFail, AtheletePostStart, AtheletePostSuccess, AtheletePostFail,
    GetAtheleteByIdStart, GetAtheleteByIdSuccess, GetAtheleteByIdFail, AtheletePutStart, AtheletePutSuccess, AtheletePutFail,
    CoordinatorPostStart, CoordinatorPostSuccess, CoordinatorPostFail, RefereePostStart, RefereePostSuccess, RefereePostFail,
    GetRefereeStart, GetRefereetSuccess, GetRefereeFail, GetCoachStart, GetCoachtSuccess, GetCoachFail, CoachPostStart, CoachPostSuccess, CoachPostFail,
    CoordinatorProfileStart,
    CoordinatorProfileSuccess,
    CoordinatorProfileFail,
    CoordinatorProfileUpdateStart,
    CoordinatorProfileUpdateSuccess,
    CoordinatorProfileUpdateFail,
    CoordinatorProfileUpdatePicStart,
    CoordinatorProfileUpdatePicSuccess,
    CoordinatorProfileUpdatePicFail,
    AtheletePutPicStart,
    AtheletePutPicSuccess,
    AtheletePutPicFail,
} from "../Reducer/CoordinatorReducer"

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
export const GetAtheleteByIdApi = (id) => async (dispatch) => {
    try {
        dispatch(GetAtheleteByIdStart())

        const { data } = await axios.get(`${url}/Athletes/GetAthelete/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetAtheleteByIdSuccess(data))
    } catch (error) {
        dispatch(GetAtheleteByIdFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}

export const AtheletePutApi = (values, id) => async (dispatch) => {
    try {
        dispatch(AtheletePutStart())
        console.log(values)
        const { data } = await axios.put(`${url}/Athletes/UpdateAthlete/${id}`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(AtheletePutSuccess(data))
    } catch (error) {
        dispatch(AtheletePutFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}
export const AtheletePutPicApi = (values, id) => async (dispatch) => {
    try {
        dispatch(AtheletePutPicStart())
        console.log(values)
        const { data } = await axios.put(`${url}/Athletes/UpdateAthleteImage/${id}`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch(AtheletePutPicSuccess(data))
    } catch (error) {
        dispatch(AtheletePutPicFail(error.response.data))
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
export const CoordinatorProfileApi = (id) => async (dispatch) => {
    try {
        dispatch(CoordinatorProfileStart())
        const { data } = await axios.get(`${url}/ACR/${id}`)
        dispatch(CoordinatorProfileSuccess(data))
    } catch (error) {
        dispatch(CoordinatorProfileFail(error.response.data))
    }
}
export const CoordinatorUpdateProfileApi = (id, values) => async (dispatch) => {
    try {
        dispatch(CoordinatorProfileUpdateStart())
        const { data } = await axios.put(`${url}/ACR/updateCoordinator/${id}`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(CoordinatorProfileUpdateSuccess(data))
    } catch (error) {
        dispatch(CoordinatorProfileUpdateFail(error.response.data))
    }
}
export const CoordinatorUpdateProfilePicApi = (id, values) => async (dispatch) => {
    try {
        dispatch(CoordinatorProfileUpdatePicStart())
        const { data } = await axios.put(`${url}/ACR/UpdateCoordinatorImage/${id}`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch(CoordinatorProfileUpdatePicSuccess(data))
    } catch (error) {
        dispatch(CoordinatorProfileUpdatePicFail(error.response.data))
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
export const GetCoachApi = () => async (dispatch) => {
    try {
        dispatch(GetCoachStart())

        const { data } = await axios.get(`${url}/Coaches/GetCoaches`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetCoachtSuccess(data))
    } catch (error) {
        dispatch(GetCoachFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}
export const CoachPostApi = (values) => async (dispatch) => {
    try {
        dispatch(CoachPostStart())
        console.log(values)
        const { data } = await axios.post(`${url}/Coaches/PostCoach`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch(CoachPostSuccess(data))
    } catch (error) {
        dispatch(CoachPostFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}