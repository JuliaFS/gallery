import { useEffect, useState, useContext, useReducer } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import * as pictureService from '../../services/pictureService';
import * as commentService from '../../services/commentService';
import AuthContext from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import { Path, Notifications } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import reducer from './commentReducer';
import styles from "./PictureDetails.module.css";
import Modal from "../404/ModalErrors/ModalErrors";
import Likes from "./Likes";
import DeleteModal from "./ModalDelete/DeleteModal";
import ImageMagnifier from "./ImageMagnifier/ImageMagnifier";

export default function PictureDetails() {
    const { email, userId } = useContext(AuthContext);
    const [picture, setPicture] = useState({});

    const [comments, dispatch] = useReducer(reducer, []);
    const { pictureId } = useParams();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const[msg, setMsg ] = useState({});
    const[error, setError ] = useState({});
    // const [isClicked, setIsClicked] = useState(false);
    // const [isDeleteClicked, setIsDeleteClicked] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {
        pictureService.getOne(pictureId)
            .then(result => setPicture(result))
            .catch(err => setError(err));

        commentService.getAll(pictureId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result,
                });
            });
    }, [pictureId]);

    const addCommentHandler = async (values) => {
        const newComment = await commentService.create(
            pictureId,
            values.comment
        );

        newComment.owner = { email };

        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment
        })
    }
    const closeButtonClickHandler = async (e) => {
        //const isConfirmed = confirm('Are you sure you want to delete this picture?');
        setOpenModal(true);
        //e.stopPropagation();

        //pedro tech 12:40 min
        setMsg({message: Notifications.ConfirmDelete});
    }

    const { values, onChange, onSubmit } = useForm(addCommentHandler, {
        comment: '',
    });

    const isOwner = userId === picture._ownerId;


    return (
        <section className={styles["picture-details"]}>
            <h1>{picture.title}</h1>
            <div className={styles["info-section"]}>
            {Object.keys(error).length > 0 &&  
                <p className={styles["error-msg"]}>{error.message}</p> 
            }
            {openModal && 
                <DeleteModal msg={msg} closeModal={setOpenModal}/>
            }
                <div className={styles["info-details"]}>
                    {/*<div>
                        <img src={picture.imageUrl} alt={picture.title} />
        </div>*/}
                    <div>
                        <ImageMagnifier {...picture} />
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
                        <button className="button">
                            <Link to={pathToUrl(Path.PictureEdit, { pictureId })}>Edit</Link>
                        </button>
                        <button className="button" onClick={closeButtonClickHandler}>Delete</button>
                    </div>
                )}
            </div>

            <div>
                <Likes />
            </div>

            <article className={styles["create-comment"]}>
             <legend>Add new comment:</legend>
                
        {userId
            ? <form method="POST" onSubmit={onSubmit}>
                {Object.keys(error).length > 0 &&
                    <p className={styles["error-msg"]}>{error.message}</p>
                }
                <div>
                    <textarea
                        id="comment"
                        name="comment"
                        value={values.comment}
                        onChange={onChange}
                        placeholder="Write comment here..." >
                    </textarea>
                    <p className={styles["error-msg"]}>{formErrors.comment}</p>
                </div>
                <div>
                <input className="btn submit" type="submit" value="Add Comment" />

                </div>
            </form>
            : <p className={styles["comments-link"]}>To can comments you have to login <Link to={Path.Login}>Login</Link> or <Link to={Path.Register}>Register</Link>first!</p>
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