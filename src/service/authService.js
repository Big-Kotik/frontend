import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/users";

const register = async registerForm => {
    const response = await axios.post(baseUrl, registerForm);
    return response.data;
}

const login = async loginForm => {
    const response = await axios.post(`${baseUrl}/auth`, loginForm);
    return response.data;
}

const saveSockedId = async socketData => {
    const response = await axios.post(`${baseUrl}/connect`, socketData);
    return response.data;
}


export default {register, login, saveSockedId}