import * as request from '../lib/request';

const baseUrl = "http://localhost:3030/jsonstore/comments";

export const create = async (pictureId, username, text) => {
    // console.log('in create commentService');
    // console.log('pictureId: ' + pictureId);
    // console.log('username: ' + username);
    // console.log('text: ' + text);
    const newComment = await request.post(baseUrl, { 
        pictureId, 
        username, 
        text 
    });
    console.log('CommentService: ' + newComment)
    //console.log('result: ' + result);
    return newComment;
};



// const response = await request('POST', baseUrl, pictureData);

// const result = await response.json();

// return result;