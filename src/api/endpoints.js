import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  });


// const register = await axiosInstance.get("/register")
//   .then(function (response) {
//     return response?.data;
//   })
const register = "";

export default{
    register,
};
