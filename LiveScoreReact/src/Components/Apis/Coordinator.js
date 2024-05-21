import axios from "axios"
const url = "http://localhost:5032/api"


export const GetAthleteByCategoryAndGender = async (id,gender) => {
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