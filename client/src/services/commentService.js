import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export const getAll = async (pictureId) => {
    const query = new URLSearchParams({
        where: `pictureId="${pictureId}"`
    });

    const result = await request.get(baseUrl);

    // TODO: temp solution until migration to collections service 
    return Object.values(result).filter(comment => comment.pictureId === pictureId);
};

export const create = async (pictureId, username, text) => {
    const newComment = await request.post(baseUrl, {
        pictureId,
        username, 
        text,
    });
    return newComment;
};