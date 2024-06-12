import axios from "axios"
const url = "http://localhost:5032/api"

export const GetMatchHistory = async () => {
    try {
        const data = await axios.get(`${url}/Matchs/GetMatchHistory`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export const GetTodayMatch = async () => {
    try {
        const { data } = await axios.get(`${url}/Matchs/today`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data
    } catch (error) {
        return error;
    }
}

export const GetRoundsByMatchId = async (id) => {
    try {
        const data = await axios.get(`${url}/Rounds/GetRoundsByMatchId/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export const GetScoresandRounds = async (id, rounds) => {
    try {
        const data = await axios.get(`${url}/Rounds/GetScoresandRounds/${id}/${rounds}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export const GetTotal = async () => {
    try {
        const { data } = await axios.get(`${url}/Common/totalcount`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data
    } catch (error) {
        return error;
    }
}
export const GetCategoryViseAthlete = async () => {
    try {
        const { data } = await axios.get(`${url}/Common/categoryViseAthlete`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data
    } catch (error) {
        return error;
    }
}