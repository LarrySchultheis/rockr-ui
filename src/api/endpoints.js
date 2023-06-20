import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  });


const getBands = await axiosInstance.get("/get_bands")
  .then(function (response) {
    return response?.data;
  })


export default{
    getBands,
};
