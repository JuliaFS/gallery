import { useEffect, useState, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as pictureService from '../../services/pictureService';
import * as commentService from '../../services/commentService';
import AuthContext from "../../contexts/AuthContext";

const reducer = (state, action) => {
    switch(action?.type){
        case 'GET_ALL_COMMENTS':
            return [...action.payload];
        case 'ADD_COMMENT':
            return [...state, action.payload];
        default: 
        return state;
    }
}

export default function PictureDetails() {
    const { email } = useContext(AuthContext);
    const [picture, setPicture] = useState({});
    //const [comments, setComments] = useState([]);
    const [comments, dispatch] = useReducer(reducer, []);


    const { pictureId } = useParams();

    useEffect(() => {
        pictureService.getOne(pictureId)
            .then(setPicture);

        commentService.getAll(pictureId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result
                })
            });
    }, [pictureId]);

    const addCommentHandler = async (e) => {
        e.preventDefault();

        //uncontrolled form
        const formData = new FormData(e.currentTarget);

        const newComment = await commentService.create(
            pictureId,
            formData.get('comment')
        );
        newComment.owner = { email };
        //setComments(state => [...state, {...newComment, author: {email}}]);
        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment
        });
    }

    return (
        <section id="picture-details">
            <h1>Picture Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={picture.imageUrl} alt={picture.title} />
                    <h1>{picture.title}</h1>
                    <span className="levels">Painter: {picture.painter} </span>
                    <p className="type">Category: {picture.category}</p>
                </div>

                <p className="text">{picture.description}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        { comments.map(({_id, text, owner: {email}}) => (
                            <li className="comment" key={_id}>
                            <p>{email}: {text}</p>
                        </li>
                        ))}
                    </ul>
                    {comments.length === 0 && 
                        <p className="no-comment">No comments.</p>
                    }
                </div>

                <div className="buttons">
                    <Link to="" className="button">Edit</Link>
                    <button className="button">Delete</button>
                </div>
            </div>
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea name="comment" placeholder="Comment......" ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    );
}