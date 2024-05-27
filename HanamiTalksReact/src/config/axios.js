import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost",
    // headers: {
    //     'Accept' : 'application/json',
    //     'X-Requested-With' : 'XMLHttpRequest'
    // },
    // withCredentials: true
})

export default axiosClient;