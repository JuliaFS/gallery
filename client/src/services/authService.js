import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password
    });

    console.log('result: ' + result + 'in login ');
    return result;
}

export const register = async (email, password, confirmPassword) => {
    if(password !== confirmPassword){
        //to do -> add user message
        throw new Error('Passwords do not match! Pls try again...');
      }
    const result = await request.post(`${baseUrl}/register`, {
        email,
        password
    });

    return result;
}

export const logout = () => request.get(`${baseUrl}/logout`);