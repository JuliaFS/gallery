import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/pictures";

export const getAll = async () => {
    const result = await request.get(baseUrl);

    return result;
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

export const edit = async (pictureId, pictureData) => {
    const result = await request.put(`${baseUrl}/${pictureId}`, pictureData);

    //const result = await response.json();

    return result;
};

