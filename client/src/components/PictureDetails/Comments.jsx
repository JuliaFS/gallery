import { useEffect, useContext, useReducer, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import reducer from './commentReducer';
import useForm from "../../hooks/useForm";
import { Path } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import styles from "./PictureDetails.module.css";

import AuthContext from "../../contexts/AuthContext";
import * as commentService from '../../services/commentService';

export default function Comments() {

    const { email, userId } = useContext(AuthContext);
    const [comments, dispatch] = useReducer(reducer, []);
    const [error, setError] = useState({});
    console.log(userId);

    const { pictureId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        commentService.getAll(pictureId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result
                })
            })
            .catch((error) => setError(error));
    }, [pictureId]);

    // const addCommentHandler = async (values) => {
    //     const newComment = await commentService.create(
    //         pictureId,
    //         values.comment
    //     );
    //     newComment.owner = { email };

    //     //setComments(state => [...state, {...newComment, author: {email}}]);
    //     dispatch({
    //         type: 'ADD_COMMENT',
    //         payload: newComment
    //     });
    // }
    const addCommentHandler = async (values) => {
        const newComment = await commentService.create(
            pictureId,
            values.comment
        );
        newComment.owner = { email };

        //setComments(state => [...state, {...newComment, author: {email}}]);
        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment
        });
    }


    return (
        <>
         {/*{error  
                ? <p className={styles["error-msg"]}>{error.message}</p> 
                : <p className={styles["no-error"]}>{''}</p>
            }*/}
        <legend>Add new comment:</legend>
    { userId
            ? <form className="form" onSubmit={onSubmit}>
                <textarea
                    name="comment"
                    value={values.comment}
                    onChange={onChange}
                    placeholder="Comment......" >
                </textarea>
                <input type="submit" value="Add Comment" />
            </form>
            : <p>To can comments you have to login <Link to={Path.Login}>Login</Link> or <Link to={Path.Register}>Register</Link>first!!!</p>
    }

    <div className={styles["details-comments"]}>
        <h2>Comments:</h2>
        <ul>
            {comments.map(({ _id, text, owner: { email } }) => (
                <li key={_id}>{email}: {text}</li>
            ))}
        </ul>
        {comments.length === 0 &&
            <p className={styles["no-comment"]}>No comments.</p>
        }
    </div>
    </>
    )
}