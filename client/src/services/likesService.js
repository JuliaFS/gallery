import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/likes';

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

export const createLike = async (pictureId, data) => {
    const newLikes = await request.post(baseUrl, {
        pictureId,
        data
    });

    return newLikes;
};

export const editLikes = async (pictureId, pictureData) => {
    const result = await request.put(`${baseUrl}/${pictureId}`, pictureData);

    //const result = await response.json();

    return result;
};

export const getLikes = async () => {

   // GET /data/likes?distinct=6f740824-3620-46e2-a099-b87be7404601
   //http://localhost:3030/data/likes?distinct=6f740824-3620-46e2-a099-b87be7404601

    //const result = await request.get(`${baseUrl}/?distinct=${pictureId}&count`);
    const result = await request.get(`${baseUrl}`);
    return result;
}

