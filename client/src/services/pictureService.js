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


//where={match}
//wait request.get(`${baseUrl}?select=userId&where=${query}`);
///data/recipes?offset=10&pageSize=5
export const getLatest = async () => {
    const query = {
        sortBy: `_createdOn desc`,
        offset: 5,
        pageSize:1
    }
    //const query = 'offset=10&pageSize=5';

//     const result = await request.get(${baseUrl}?sortBy=_createdOn desc&offset=0&pageSize=3);
//   return result;
//console.log(`${baseUrl}?${query}`)
//console.log(`${baseUrl}?offset=10&pageSize=5`)
    const result = await request.get(`${baseUrl}?${query}`);

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

export const editLikes = async (pictureId, pictureData) => {
    // console.log(`${baseUrl}/${pictureId}`);
    // console.log(baseUrl)
    // console.log(pictureId)
    const result = await request.patch(`${baseUrl}/${pictureId}`, pictureData);

    //const result = await response.json();

    return result;
};

export const remove = async (pictureId) => request.remove(`${baseUrl}/${pictureId}`);

