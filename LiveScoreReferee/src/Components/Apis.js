import axios from "axios"
const url = "http://localhost:5032/api"

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


