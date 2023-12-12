import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = async (pictureId) => {
    const query = new URLSearchParams({
        where: `pictureId="${pictureId}"`,
        load: `owner=_ownerId:users`
    });

    const result = await request.get(`${baseUrl}?${query}`);
    return result;

};

// export const getAll = async (pictureId) => {
//     const query = encodeURIComponent(`pictureId="${pictureId}"`);
   
    // return fetch(`${baseUrl}`, {
    //     method: 'POST',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'X-Authorization': token,
    //     },
    //     body: JSON.stringify({ userId, pictureId})
    // }).then(result => result.json());
    // console.log(`${baseUrl}?select=userId&where=${query}`);

    // return fetch(`${baseUrl}?select=userId&where=${query}`), {
    //     method: 'GET',
    //     body: JSON.stringify({userId, pictureId})
    // }.then(result => result.json());
    //const result = await request .get(`${baseUrl}?distinct=_pictureId&count`);
    
     //return result;
//};

export const create = async (pictureId, text) => {
    const newComment = await request.post(baseUrl, {
        pictureId,
        text,
    });
    return newComment;
};

// export const createComment = (pictureId, text, token) => {
//     return fetch(`${baseUrl}`, {
//         method: 'POST',
//         headers: { 
//             'Content-Type': 'application/json',
//             'X-Authorization': token,
//         },
//         body: JSON.stringify({ userId, pictureId})
//     }).then(result => result.json());
// }