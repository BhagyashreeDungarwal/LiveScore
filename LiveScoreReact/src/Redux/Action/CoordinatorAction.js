import axios from "axios"
import {
    GetAtheleteStart, GetAtheleteSuccess, GetAtheleteFail, AtheletePostStart, AtheletePostSuccess, AtheletePostFail,
    GetAtheleteByIdStart, GetAtheleteByIdSuccess, GetAtheleteByIdFail, AtheletePutStart, AtheletePutSuccess, AtheletePutFail, BlockAthleteStart, BlockAthleteSuccess, BlockAthleteFail,
    CoordinatorPostStart, CoordinatorPostSuccess, CoordinatorPostFail, RefereePostStart, RefereePostSuccess, RefereePostFail,
    GetRefereeStart, GetRefereeSuccess, GetRefereeFail, BlockRefereeStart, BlockRefereeSuccess, BlockRefereeFail, GetCoachStart, GetCoachSuccess, GetCoachFail, CoachPostStart, CoachPostSuccess, CoachPostFail,
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
    GetCoachByIdStart, GetCoachByIdSuccess, GetCoachByIdFail, CoachPutStart, CoachPutSuccess, CoachPutFail, BlockCoachStart, BlockCoachSuccess, BlockCoachFail,
    CoachPutPicStart,
    CoachPutPicSuccess,
    CoachPutPicFail,
    GetMatchStart,
    GetMatchSuccess,
    GetMatchFail,
    GetAtheleteByCategoryStart,
    GetAtheleteByCategorySuccess,
    GetAtheleteByCategoryFail,
    AddMatchStart,
    AddMatchSuccess,
    AddMatchFail,
} from "../Reducer/CoordinatorReducer"

const url = "http://localhost:5032/api"



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
export const BlockAthleteApi = (id) => async (dispatch) => {
    try {
        dispatch(BlockAthleteStart())

        const { data } = await axios.post(`${url}/Athletes/BlockAthlete/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(BlockAthleteSuccess(data))
    } catch (error) {
        dispatch(BlockAthleteFail(error.response.data))
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
        dispatch(GetRefereeSuccess(data))
    } catch (error) {
        dispatch(GetRefereeFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}
export const BlockRefereeApi = (id) => async (dispatch) => {
    try {
        dispatch(BlockRefereeStart())

        const { data } = await axios.post(`${url}/ACR/BlockReferee/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(BlockRefereeSuccess(data))
    } catch (error) {
        dispatch(BlockRefereeFail(error.response.data))
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
        dispatch(GetCoachSuccess(data))
    } catch (error) {
        dispatch(GetCoachFail(error.response.data))
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
    }
}
export const GetCoachByIdApi = (id) => async (dispatch) => {
    try {
        dispatch(GetCoachByIdStart())

        const { data } = await axios.get(`${url}/Coaches/GetCoachesById/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetCoachByIdSuccess(data))
    } catch (error) {
        dispatch(GetCoachByIdFail(error.response.data))
    }
}

export const CoachPutApi = (values, id) => async (dispatch) => {
    try {
        dispatch(CoachPutStart())
        console.log(values)
        const { data } = await axios.put(`${url}/Coaches/UpdateCoach/${id}`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(CoachPutSuccess(data))
    } catch (error) {
        dispatch(CoachPutFail(error.response.data))
    }
}
export const BlockCoachApi = (id) => async (dispatch) => {
    try {
        dispatch(BlockCoachStart())

        const { data } = await axios.post(`${url}/Coaches/BlockCoach/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(BlockCoachSuccess(data))
    } catch (error) {
        dispatch(BlockCoachFail(error.response.data))
    }
}

export const CoachPutPicApi = (id, values) => async (dispatch) => {
    try {
        dispatch(CoachPutPicStart())
        console.log(values)
        const { data } = await axios.put(`${url}/Coaches/UpdateCoachImage/${id}`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch(CoachPutPicSuccess(data))
    } catch (error) {
        dispatch(CoachPutPicFail(error.response.data))
    }
}


export const GetMatchApi = () => async (dispatch) => {
    try {
        dispatch(GetMatchStart())

        const { data } = await axios.get(`${url}/Matchs/GetMatchs`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetMatchSuccess(data))
    } catch (error) {
        dispatch(GetMatchFail(error.response.data))
    }
}
export const GetAthleteByCatApi = (categoryId) => async (dispatch) => {
    try {
        dispatch(GetAtheleteByCategoryStart())

        const { data } = await axios.get(`${url}/Categories/GetAthleteByCategory/${categoryId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetAtheleteByCategorySuccess(data))
    } catch (error) {
        dispatch(GetAtheleteByCategoryFail(error.response.data))
    }
}

export const AddMatchApi = (values) => async (dispatch) => {
    try {
        dispatch(AddMatchStart())

        const { data } = await axios.post(`${url}/Matchs/PostMatch`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(AddMatchSuccess(data))
    } catch (error) {
        dispatch(AddMatchFail(error.response.data))
    }
}