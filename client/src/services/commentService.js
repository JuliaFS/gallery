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


export const create = async (pictureId, text) => {
    const newComment = await request.post(baseUrl, {
        pictureId,
        text,
    });
    return newComment;
};
