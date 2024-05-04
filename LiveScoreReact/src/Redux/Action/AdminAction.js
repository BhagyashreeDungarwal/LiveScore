import axios from "axios"
import {
    GetCategoryFail, GetCategoryStart, GetCategorySuccess, CategoryPostStart, CategoryPostSuccess, CategoryPostFail, GetCoordinatorStart,
    GetCategoryByIdStart, GetCategoryByIdSuccess, GetCategoryByIdFail, CategoryPutStart, CategoryPutSuccess, CategoryPutFail,
    GetCoordinatorSuccess, GetCoordinatorFail, GetTounamentStart, GetTounamentSuccess, GetTounamentFail, TounamentPostStart, TounamentPostSuccess,
    TounamentPostFail, VerifyCoordinatorFail, VerifyCoordinatorStart, VerifyCoordinatorSuccess,
} from "../Reducer/AdminReducer"

const url = "http://localhost:5032/api"

export const getCategoryApi = () => async (dispatch) => {
    try {
        dispatch(GetCategoryStart())

        const { data } = await axios.get(`${url}/Categories/GetCategories`, {
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

export const CategoryPostApi = (values) => async (dispatch) => {
    try {
        dispatch(CategoryPostStart())
        console.log(values)
        const { data } = await axios.post(`${url}/Categories/PostCategory`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(CategoryPostSuccess(data))
    } catch (error) {
        dispatch(CategoryPostFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}

export const GetCategoryByIdApi = (id) => async (dispatch) => {
    try {
        dispatch(GetCategoryByIdStart())

        const { data } = await axios.get(`${url}/Categories/GetCategoriesById/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetCategoryByIdSuccess(data))
    } catch (error) {
        dispatch(GetCategoryByIdFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}

export const CategoryPutApi = (values, id) => async (dispatch) => {
    try {
        dispatch(CategoryPutStart())
        console.log(values)
        const { data } = await axios.put(`${url}/Categories/PutCategory/${id}`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(CategoryPutSuccess(data))
    } catch (error) {
        dispatch(CategoryPutFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}
export const getCoordinatorApi = () => async (dispatch) => {
    try {
        dispatch(GetCoordinatorStart())

        const { data } = await axios.get(`${url}/ACR/Coordinator`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetCoordinatorSuccess(data))
    } catch (error) {
        dispatch(GetCoordinatorFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}

export const getTounamentApi = () => async (dispatch) => {
    try {
        dispatch(GetTounamentStart())

        const { data } = await axios.get(`${url}/Tournaments/GetTournaments`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(GetTounamentSuccess(data))
    } catch (error) {
        dispatch(GetTounamentFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}

export const TounamentPostApi = (values) => async (dispatch) => {
    try {
        dispatch(TounamentPostStart())
        console.log(values)
        const { data } = await axios.post(`${url}/Tournaments/PostTournament`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(TounamentPostSuccess(data))
    } catch (error) {
        dispatch(TounamentPostFail(error.response.data))
        // console.log(e.response.data.msg)
    }
}


export const VerifyCoordinatorApi = (id) => async (dispatch) => {
    try {
        dispatch(VerifyCoordinatorStart())

        const { data } = await axios.post(`${url}/ACR/VerifyCoordinator/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(VerifyCoordinatorSuccess(data))
    } catch (error) {
        dispatch(VerifyCoordinatorFail(error.response.data))
    }
}