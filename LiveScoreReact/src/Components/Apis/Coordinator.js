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
    return data;
  } catch (error) {
    return error
  }
}
export const GetMatchByMatchGroup = async (matchGroup) => {
  try {
    const data = await axios.get(`${url}/Matchs/GetMatchByMatchGroup/${matchGroup}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data;
  } catch (error) {
    return error
  }
}


export const GetCoordinatorProfile = async (id) => {
  try {
    const data = await axios.get(`${url}/ACR/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }

}

export const OtpGenerateApi = async ({ matchGroup }) => {
  try {
    const { data } = await axios.get(`${url}/Matchs/GenerateOtp/${matchGroup}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const StoreOtpApi = async () => {
  try {
    const data = await axios.get(`${url}/Matchs/GetStoredOtps`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}


// this api is used to get match if coordinator and referee are assigned in match
export const GetAssignMatch = async (id) => {
  try {
    const { data } = await axios.get(`${url}/Matchs/GetAssignMatch/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }

}

export const GetTotalScore = async () => {
  try {
    const { data } = await axios.get(`${url}/Scores/getTotalScore`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}
export const ScoreTransfer = async (mid) => {
  try {
    const { data } = await axios.post(`${url}/Scores/transfer/${mid}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const GetTemporaryScores = async () => {
  try {
    const data = await axios.get(`${url}/Scores/GetTemporaryScores`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    return error
  }
}


export const GetTemporaryScoreById = async (id) => {
  try {
    const data = await axios.get(`${url}/Scores/getTemporaryScoreById/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data;
  } catch (error) {
    return error
  }
}
