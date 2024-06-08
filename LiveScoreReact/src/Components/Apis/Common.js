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

export const GetScoresandRounds = async (id) => {
    try {
        const data = await axios.get(`${url}/Rounds/GetScoresandRounds/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        return error
    }
}
