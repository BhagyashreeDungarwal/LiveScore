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

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const GetTodayMatch = async () => {
  try {
    const response = await axios.get(`${url}/Matchs/GetMatchs`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = response.data;
    const today = formatDate(new Date());

    // Filter matches for today's date and upcoming status
    const filteredMatches = data.filter(match =>
      formatDate(match.matchDate) === today && match.matchStatus === "Upcoming" || match.matchStatus === "Live"
    );

    return filteredMatches;
  } catch (error) {
    return error;
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
