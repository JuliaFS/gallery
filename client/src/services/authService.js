import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password
    });

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

// export const authServiceFactory = (token) => {
//     const request = requestFactory(token);

//     return {
//         login: (data) => request.post(`${baseUrl}/login`, data),
//         register: (data) => request.post(`${baseUrl}/register`, data),
//         logout: () => request.get(`${baseUrl}/logout`),
//     }
// };