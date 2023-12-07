import * as request from '../lib/request';

//const baseUrl = 'http://localhost:3030/data/pictures';

const baseUrl = "http://localhost:3030/data";

export const likes = (articleId, userId, token) => {
    return fetch(`${baseUrl}/likes`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ userId, articleId})
    }).then(result => result.json());
}

export const getLikes = (articleId,) => {
    const search = encodeURIComponent(`articleId="${articleId}"`);

    return fetch(`${baseUrl}/likes?select=userId&where=${search}`)
        .then(result => result.map(x => x.userId));
};

export const dislike = (userId, token) => {
    return fetch(`${baseUrl}/dislike/${userId}`, {
        method: 'DELETE',
        headers: { 
            'X-Authorization': token
        },
    });
}

// export const getLikes = async (pictureId) => {
//     const query = new URLSearchParams({
//         where: `pictureId="${pictureId}"`,
//         load: `owner=_ownerId:users`
//     });

//     let test = `${baseUrl}?${query}`;
//     //http://localhost:3030/data/likes?where=pictureId%3D%2248f13c81-9aa1-4096-9a4a-4f622e03c2b5%22&load=owner%3D_ownerId%3Ausers
//     console.log('test il likesService: ' + test)

//     const result = await request.get(`${baseUrl}?${query}`);
//     return result;
// };

// export const createLike = async (pictureId, data) => {
//     const newLikes = await request.post(baseUrl, {
//         pictureId,
//         data
//     });

//     return newLikes;
// };

// export const editLikes = async (pictureId, pictureData) => {
//     const result = await request.put(`${baseUrl}/${pictureId}`, pictureData);

//     //const result = await response.json();

//     return result;
// };

// export const getLikes = async (pictureId) => {

//    // GET /data/likes?distinct=6f740824-3620-46e2-a099-b87be7404601
//    //http://localhost:3030/data/likes?distinct=6f740824-3620-46e2-a099-b87be7404601

//        const query = new URLSearchParams({
//         where: `pictureId="${pictureId}"`,
//         load: `owner=_ownerId:users`
//         });

//     ///data/comments?where=recipeId="8f414b4f-ab39-4d36-bedb-2ad69da9c830"
//     //console.log(`${baseUrl}/?distinct=${query}`)
//     //const result = await request.get(`${baseUrl}/?${query}`);
//     console.log(`${baseUrl}/?${query}`)
//     const result = await request.get(`${baseUrl}/${query}`);

//     console.log("result in LikeService")
//     console.log(result)
//     //const result = await request.get(`${baseUrl}`);
//     return result;
// }

