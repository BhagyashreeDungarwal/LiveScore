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
export const GetCategoryById = async (id) => {
  try {
    const data = await axios.get(`${url}/Categories/GetCategoriesById/${id}`, {
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
    const data = await axios.get(`${url}/Tournaments/GetTournaments`)
    return data
  } catch (error) {
    return error
  }
}

export const GetTournamentById = async (id) => {
  try {
    const data = await axios.get(`${url}/Tournaments/GetTournamentById/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}
export const GetCoordinator = async () => {
  try {
    const data = await axios.get(`${url}/ACR/Coordinator`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const GetReferee = async () => {
  try {
    const data = await axios.get(`${url}/ACR/Referee`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}
