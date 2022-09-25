import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "504d49d4c83fe9d25d590d042442e586",
    language: "ko-KR",
  },
});

export default instance;