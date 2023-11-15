import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/jsonstore/pictures";

export const getAll = async () => {
    const result = await request.get(baseUrl);
    //object in object
    return Object.values(result);
};

export const getOne = async (pictureId) => {

    const result = await request.get(`${baseUrl}/${pictureId}`);

    return result;
}


export const create = async (pictureData) => {
    const result = await request.post(baseUrl, pictureData);

    //const result = await response.json();

    return result;
};

