import axios from 'axios';
import store from "../redux/store"


const apiURL:string = "http://localhost:4200";
const mainAxios = axios.create({
    baseURL: `${apiURL}`
})

mainAxios.interceptors.request.use((config) => {
    const axiosState =  store.getState()
    config.headers["authorization"] = axiosState.session
    return config
})


export default mainAxios