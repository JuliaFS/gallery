import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data';

export const updateLikes = async (pictureId, text) => {
    // const query = new URLSearchParams({
    //     where: `pictureId="${pictureId}"`
    // })
    //console.log('print in likesService: ' + `${baseUrl}/pictures/${pictureId}`)
    // const result = await request.put(`${baseUrl}/pictures/${pictureId}`, {
    //     text
    // });
    console.log('local-storage: ' + localStorage.getItem('accessToken'))

    const response = await fetch(`${baseUrl}/pictures/${pictureId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(text),
    })

    const result = await response.json();
    console.log(result);

    return result;

    // await fetch(`${baseUrl}/pictures/${pictureId}`)
    // return result;
};

// export const getAll = async (pictureId) => {
//     const query = new URLSearchParams({
//         where: `pictureId="${pictureId}"`,
//         load: `owner=_ownerId:users`
//     });

//     const result = await request.get(`${baseUrl}?${query}`);
//     return result;
// };

// export const create = async (pictureId, text) => {
//     const newComment = await request.post(baseUrl, {
//         pictureId,
//         text,
//     });
//     return newComment;
// };