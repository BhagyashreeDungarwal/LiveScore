import axios from "axios"
const url = "http://localhost:5032/api"


export const GetAthleteByCategoryAndGender = async (id, gender) => {
  try {
    const data = await axios.get(`${url}/Athletes/GetAthleteByCatAndGen/${id}/${gender}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const GetAthlete = async () => {
  try {
    const data = await axios.get(`${url}/Athletes/getAthelete`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}
export const GetAthleteById = async (id) => {
  try {
    const data = await axios.get(`${url}/Athletes/GetAthelete/${id}`, {
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

export const GetCoach = async () => {
  try {
    const data = await axios.get(`${url}/Coaches/GetCoaches`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }

}
export const GetCoachById = async (id) => {
  try {
    const data = await axios.get(`${url}/Coaches/GetCoachesById/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }

}
export const GetMatch = async () => {
  try {
    const data = await axios.get(`${url}/Matchs/GetMatchs`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const GetMatchById = async (id) => {
  try {
    const data = await axios.get(`${url}/Matchs/GetMatchById/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }

}

