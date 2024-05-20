import axios from "axios"
const url = "http://localhost:5032/api"


export const GetCategory = async () => {
  try {
    const data = await axios.get(`${url}/Categories/GetCategories`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}
export const GetTournament = async () => {
  try {
    const data = await axios.get(`${url}/Tournaments/GetTournaments`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}
