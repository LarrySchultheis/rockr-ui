import axios from 'axios'
// import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  });

//   const { route, changeRoute } = useState()
//   useEffect(() => {
//     let navigate = useNavigate();
//     const routeChange = (path) => {
//       navigate(path);
//     }
//   },[route]);
  
// const register = await axiosInstance.get("/register")
//   .then(function (response) {
//     return response?.data;
//   })

const postRegistration = ( data ) => {
    axiosInstance.post("/register", {
        data: {
            email: data.email,
            password: data.password
        }
    })
    .then(function(response) {
            console.log(response);
        }
    )
    .catch( 
        (e) => console.log( e ) 
    );
};

export {
    postRegistration,
};
