import { useEffect, useState, useContext, useReducer, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as pictureService from '../../services/pictureService';
import * as commentService from '../../services/commentService';
import AuthContext from "../../contexts/AuthContext";
import reducer from './commentReducer';
import useForm from "../../hooks/useForm";
import { Path } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import styles from "./PictureDetails.module.css";

export default function PictureDetails() {
    const { email, userId } = useContext(AuthContext);
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

    //TO DO temp solution
    const initialValues = useMemo(() => ({
        comment: '',
    }), []);

    const { values, onChange, onSubmit } = useForm(addCommentHandler, initialValues);

    const isOwner = userId === picture._ownerId;

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
                    </div>
                </div>
                {isOwner && (
                    <div className="buttons">
                        <Link to={pathToUrl(Path.PictureEdit, { pictureId })} className="button">Edit</Link>
                        <Link to={pathToUrl(Path.PictureDelete, { pictureId })} className="button">Delete</Link>
                    </div>
                )}
            </div>

            <article className={styles["create-comment"]}>
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmit}>
                    <textarea
                        name="comment"
                        value={values.comment}
                        onChange={onChange}
                        placeholder="Comment......" >
                    </textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>

                <div className={styles["details-comments"]}>
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(({ _id, text, owner: { email } }) => (
                            <li key={_id}>{email}: {text}</li>
                        ))}
                    </ul>
                    {comments.length === 0 &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>

            </article>

        </section>
    );
}