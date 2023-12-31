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


export const getLatest = async () => {
    const query = {
        sortBy: `_createdOn desc`,
        offset: 5,
        pageSize:1
    }
    const result = await request.get(`${baseUrl}?${query}`);

    return result;
}


export const create = async (pictureData) => {
    const result = await request.post(baseUrl, pictureData);

    return result;
};

export const edit = async (pictureId, pictureData) => {
    const result = await request.put(`${baseUrl}/${pictureId}`, pictureData);

    return result;
};

export const editLikes = async (pictureId, pictureData) => {
    const result = await request.patch(`${baseUrl}/${pictureId}`, pictureData);

    return result;
};

export const remove = async (pictureId) => request.remove(`${baseUrl}/${pictureId}`);

