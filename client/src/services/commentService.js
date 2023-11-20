import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = async (pictureId) => {
    const query = new URLSearchParams({
        where: `pictureId="${pictureId}"`
    });

    const result = await request.get(`${baseUrl}?${query}`);

    // TODO: temp solution until migration to collections service 
    //return result.filter(comment => comment.pictureId === pictureId);
    return result;
};

export const create = async (pictureId, username, text) => {
    const newComment = await request.post(baseUrl, {
        pictureId,
        username, 
        text,
    });
    return newComment;
};