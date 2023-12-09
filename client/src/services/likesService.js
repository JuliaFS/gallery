import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/likes";

export const createLike = (pictureId, userId, token) => {
    return fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ userId, pictureId})
    }).then(result => result.json());
}

export const getLikes = async (pictureId) => {
    const query = encodeURIComponent(`pictureId="${pictureId}"`);

    const result = await request.get(`${baseUrl}?select=userId&where=${query}`);
    //const result = await request .get(`${baseUrl}?distinct=_pictureId&count`);
    
     return result;
};


