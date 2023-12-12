import { useState } from "react";
import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    try{
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
    });

    return result;
    } catch(error){
        throw new Error('Login is unsuccesfull. Email or password do not match.');
        console.log(error.message)
    }
};

// export const login = async (email, password) => {
//     const [error, setError] = useState({});
//     try{
//         const result = await request.post(`${baseUrl}/login`, {
//             email,
//             password
//         });
//         // console.log(result);
//         // if(result.code === 403){
//         //     console.log('result: ' + result)
//         // }

//         return result;
//     } catch(err){
//         setError(err);
//         console.log(err);
//     }

// }

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