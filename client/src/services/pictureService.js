import { request } from "../lib/request";
const baseUrl = "http://localhost:3030/jsonstore/pictures";

export const getAll = async () => {
    const result = await request('GET', baseUrl);

    console.log(result);//object in object
    return Object.values(result);
};


export const create = async (data) => {
    const response = await request('POST', baseUrl, data);

    const result = await response.json();

    return result;
};

