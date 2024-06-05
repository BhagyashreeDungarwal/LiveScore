import axios from "axios"
const url = "http://localhost:5032/api"

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


