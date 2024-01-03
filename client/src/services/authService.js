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
        console.log(error.message)
        throw new Error('Login is unsuccesfull. Email or password do not match.');
        
    }
};

export const register = async (username, email, password, confirmPassword) => {
    if(password !== confirmPassword){
        //to do -> add user message
        throw new Error('Passwords do not match! Pls try again...');
      }
      
    const result = await request.post(`${baseUrl}/register`, {
        username,
        email,
        password
    });

    return result;
}

export const logout = () => request.get(`${baseUrl}/logout`);