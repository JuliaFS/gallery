import { useEffect, useState, useContext, useReducer, useMemo} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import * as pictureService from '../../services/pictureService';
import * as commentService from '../../services/commentService';
import AuthContext from "../../contexts/AuthContext";
import reducer from './commentReducer';
import useForm from "../../hooks/useForm";
import { Path } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import * as likesService from "../../services/likesService";

import styles from "./PictureDetails.module.css";
//import Likes from "./Likes";

export default function PictureDetails() {
    const { email, userId } = useContext(AuthContext);
    const [picture, setPicture] = useState({});
    //const [comments, setComments] = useState([]);

    const [comments, dispatch] = useReducer(reducer, []);
    const { pictureId } = useParams();
    const navigate = useNavigate();
    //let [likesCount, setLikesCount] = useState(0);
    //const [liked, setLiked] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    //console.log('picture before useEffect: ' + picture);
    const [likes, setLikes] = useState([]);

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

    const onClickButtonLikes = () => {

        likesService.getLikes(pictureId).then(result => setLikes(result));
        console.log(likes)
        // if(picture.usersLiked.includes(userId)){
        //     setIsClicked(true);
        //     return;
        // }


        // picture.usersLiked.push(userId);
        // picture.likes = Number(picture.likes) + 1;
        // console.log(userId)
        // console.log(picture.likes)
        // console.log(picture.likes)
        
        // try{
        //     await pictureService.edit(pictureId, picture);
        // } catch(err){
        //     //setCreateError({message: Notifications.CreateError});
        // }
    }

    const deleteButtonClickHandler = async () => {
        const isConfirmed = confirm('Are you sure you want to delete this picture?');

        if (isConfirmed) {
            await pictureService.remove(pictureId);

            navigate(Path.Gallery);
        }
    }

    //TO DO temp solution
    // const initialValues = useMemo(() => ({
    //     comment: '',
    // }), []);

    const { values, onChange, onSubmit } = useForm(addCommentHandler, {
        comment: '',
    });

    const isOwner = userId === picture._ownerId;

    // const checkIsAuthorized = localStorage.getItem('auth');
    // if (!userId) {
    //     console.log('No authorized: ' + userId);
    // }

    // if(Math.random() < 0.5){
    //     throw new Error('Picture details error');
    // }

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
                        {/*<Link to={pathToUrl(Path.PictureDelete, { pictureId })} className="button">Delete</Link>*/}
                        <button onClick={deleteButtonClickHandler}>Delete</button>
                    </div>
                )}
            </div>
            
                <div>
                   {/*<Likes {...picture}/>*/}
                    {/*{ !isLiked && userId && <button onClick={onClickButtonLikes}>Likes</button> }*/}
                    <span>Likes: {picture.likes} </span>
                    {!isOwner && userId &&
                     <button onClick={onClickButtonLikes} disabled={isClicked}>Likes</button>  
                    }
                </div>

            <article className={styles["create-comment"]}>
                <legend>Add new comment:</legend>
                {userId
                    ? <form onSubmit={onSubmit}>
                        <textarea
                            name="comment"
                            value={values.comment}
                            onChange={onChange}
                            placeholder="Comment......" >
                        </textarea>
                        <input type="submit" value="Add Comment" />
                    </form>
                    : <p className={styles["comments-link"]}>To can comments you have to login <Link to={Path.Login}>Login</Link> or <Link to={Path.Register}>Register</Link>first!!!</p>
                }

                <div className={styles["details-comments"]}>
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(({ _id, text, owner: { email } }) => (
                            <li key={_id}>{email}: {text}</li>
                        ))}
                    </ul>
                    {comments.length === 0 &&
                        <p className={styles["no-comment"]}>No comments yet.</p>
                    }
                </div>

            </article>

        </section>
    );
}