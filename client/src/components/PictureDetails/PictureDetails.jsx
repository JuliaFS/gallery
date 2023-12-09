import { useEffect, useState, useContext, useReducer, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import * as pictureService from '../../services/pictureService';
import * as commentService from '../../services/commentService';
import AuthContext from "../../contexts/AuthContext";
import reducer from './commentReducer';
import useForm from "../../hooks/useForm";
import { Path, Notifications } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import styles from "./PictureDetails.module.css";
import Likes from "./Likes";

export default function PictureDetails() {
    const { email, userId } = useContext(AuthContext);
    const [picture, setPicture] = useState({});

    const [comments, dispatch] = useReducer(reducer, []);
    const { pictureId } = useParams();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const[createError, setCreateError ] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        pictureService.getOne(pictureId)
            .then(result => setPicture(result));

        commentService.getAll(pictureId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result
                })
            });
    }, [pictureId]);

    const addCommentHandler = async (values) => {

        if(values.comment === ''){
            setCreateError({message: Notifications.EmptyComment});
            setIsClicked(true);
            return;
        }

        try{
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

        } catch(err){
            setCreateError({message: Notifications.CommentNotPublished});
            setIsClicked(true);
        }
        
    }
    const deleteButtonClickHandler = async () => {
        const isConfirmed = confirm('Are you sure you want to delete this picture?');

        if (isConfirmed) {
            await pictureService.remove(pictureId);

            navigate(Path.Gallery);
        }
    }

    const { values, onChange, onSubmit } = useForm(addCommentHandler, {
        comment: '',
    });

    const isOwner = userId === picture._ownerId;

    function validate(value){
        const errors = {};
        if(!value.comment){
            errors.comment = 'Pls write comment...';
        } else if(value.comment.length < 10){
            errors.comment = 'Comment must be min 10 characters';
        }else if(value.comment.length > 200){
            errors.comment= 'Comment can be max 200 characters';
        }
        return errors;
    }

    return (
        <section className={styles["picture-details"]}>
            <h1>{picture.title}</h1>
            <div className={styles["info-section"]}>
                <div className={styles["info-details"]}>
                    <div>
                        <img src={picture.imageUrl} alt={picture.title} />
                    </div>
                    <div>
                        <p>Painter: {picture.painter} </p>
                        <p>Category: {picture.category}</p>
                        <p>Description: {picture.description}</p>
                        <p>Painter age: {picture.painterAge}</p>
                    </div>
                </div>
                {isOwner && (
                    <div className={styles["buttons"]}>
                        <Link to={pathToUrl(Path.PictureEdit, { pictureId })} className="button">Edit</Link>
                        <button onClick={deleteButtonClickHandler}>Delete</button>
                    </div>
                )}
            </div>

            <div>
                <Likes {...picture} />
            </div>

            <article className={styles["create-comment"]}>
                <legend>Add new comment:</legend>
                {userId
                    ? <form onSubmit={onSubmit}>
                        <div>
                            <textarea
                                name="comment"
                                value={values.comment}
                                onChange={onChange}
                                placeholder="Write comment here..." >
                            </textarea>
                            <p className={styles["error-msg"]}>{formErrors.comment}</p>
                        </div>
                        <div>
                            <input type="submit" value="Add Comment" />
                        </div>
                    </form>
                    : <p className={styles["comments-link"]}>To can comments you have to login <Link to={Path.Login}>Login</Link> or <Link to={Path.Register}>Register</Link>first!!!</p>
                }
                <div className={styles["details-comments"]}>
                    <h2>Comments:</h2>
                    <table>
                        <tbody>
                        {comments.map(({ _id, text, owner: { email } }) => (
                            <tr key={_id}><td><span>{email}: </span> {text}</td></tr>
                        ))}
                        </tbody>
                    </table>
                    {comments.length === 0 &&
                        <p className={styles["no-comment"]}>No comments yet.</p>
                    }
                </div>
            </article>
        </section>
    );
}