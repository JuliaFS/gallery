import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import * as pictureService from '../../services/pictureService';
import * as commentService from '../../services/commentService';
import AuthContext from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import { Path, Notifications } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import styles from "./PictureDetails.module.css";
import Likes from "./Likes";
import Comments from "./Comments";

export default function PictureDetails() {
    const { email, userId } = useContext(AuthContext);
    const [picture, setPicture] = useState({});

    const [comments, setComments] = useState({});
    const { pictureId } = useParams();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const[error, setError ] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        pictureService.getOne(pictureId)
            .then(result => setPicture(result))
            .catch(err => setError(err));

        // commentService.getAll(pictureId)
        //     .then((result) => {
        //         setComments(result)
        //     })
        //     .catch(err => setError(err));
    }, [pictureId]);

    // const addCommentHandler = async (values) => {

    //     if(values.comment === ''){
    //         setError({message: Notifications.EmptyComment});
    //         //setIsClicked(true);
    //         return;
    //     }

    //     try{
    //     const newComment = await commentService.create(
    //         pictureId,
    //         values.comment
    //     );
    //     newComment.owner = { email };

    //     setComments(state => [...state, {...newComment, author: {email}}]);
    

    //     } catch(err){
    //         setCreateError({message: Notifications.CommentNotPublished});
    //         setIsClicked(true);
    //     }
        
    // }
    const deleteButtonClickHandler = async () => {
        const isConfirmed = confirm('Are you sure you want to delete this picture?');

        if (isConfirmed) {
            await pictureService.remove(pictureId);
            navigate(Path.Gallery);
        }
    }

    // const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    //     comment: '',
    // });

    const isOwner = userId === picture._ownerId;


    return (
        <section className={styles["picture-details"]}>
            <h1>{picture.title}</h1>
            <div className={styles["info-section"]}>
            {Object.keys(error).length > 0 &&  
                <p className={styles["error-msg"]}>{error.message}</p> 
            }
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
                {/*<Comments />*/}
            </article>
        </section>
    );
}