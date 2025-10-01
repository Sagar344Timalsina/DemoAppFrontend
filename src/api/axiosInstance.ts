import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getToken ,removeToken} from "@/utils/token";



const BASE_API=import.meta.env.NEXT_PUBLIC_BACKURL||"https://localhost:7255/api/";

const axiosInstance:AxiosInstance=axios.create({baseURL:BASE_API,
    // headers:{
    //     "Content-Type":"application/json"
    // },
    withCredentials:true});

const handleUnauthorized=()=>{
    removeToken();
    window.location.href="/login";
}

axiosInstance.interceptors.request.use(
(config:InternalAxiosRequestConfig)=>{
    const token=getToken();
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
},(error:AxiosError)=>Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
// (response:AxiosResponse)=>{
//     return response;
// },
// (error:AxiosError)=>{
//     const status=error.response?.status;


//     if(status===401){
//         handleUnauthorized();
//         //alert
//     };
//     return Promise.reject(error.response?.data);
// }
// );

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // unwrap response.data automatically
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      handleUnauthorized();
    }

    // If API returned structured error (your {isSuccess, error} envelope)
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    // fallback
    return Promise.reject({
      isSuccess: false,
      isFailure: true,
      error: { code: "", description: error.message, type: 0 },
    });
  }
);


export default axiosInstance;