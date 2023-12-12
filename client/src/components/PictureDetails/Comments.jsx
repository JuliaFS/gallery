import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { Path, Notifications } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import styles from "./PictureDetails.module.css";

import AuthContext from "../../contexts/AuthContext";
import * as commentService from '../../services/commentService';

export default function Comments() {

    const { email, userId, ownerId } = useContext(AuthContext);
    const [comments, setComments] = useState({});


    const [error, setError] = useState({});
    const [isClicked, setIcClcked] = useState(false);
    const [createError, setCreateError] = useState({});
    //console.log(userId);
    //console.log(email)
    const [formValue, setFormValue] = useState("");
    const [value, setValue] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const { pictureId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        commentService.getAll(pictureId)
            .then((result) => {
                setComments(result);
                //console.log(comments);
            })
            .catch((error) => setError(error));
    }, []);
    console.log("comments:")
    console.log(comments)

    // const onChange = (e) => {
    //     console.log(e.target.value);    
    // }
    // console.log(formValue)

    const resetFormHandler = () => {
        setFormValue("");
    };

    // const submitHandler = async () => {
    //     // if ( formValues.comment === '' ) {
    //     //         setCreateError({message: Notifications.CreateError});
    //     //        // setIsClicked(true);
    //     //          return;
    //     // }

    //     try {
    //         // const newComment = await commentService.create(pictureId, {formValues});
    //         // resetFormHandler();
    //         // navigate(Path.Gallery);
    //     } catch (err) {
    //         setCreateError({message: Notifications.Create});
    //         console.log(err.message);
    //     }
    // };

    const changeHandler = (e) => {
        setFormValue(e.target.value)
    };
    //console.log(formValue)

    // const validateInput = (e) =>{
    //     //setValue(validate());
         
    // }

    const validateComment = (e) =>{
        setFormErrors(validate(formValue));
         
    }


    const onSubmit = async (e) => {
        //console.log('formValue in onSubmit')
        //console.log(formValue)

        //e.preventDefault();
        // console.log(e.target.name)
        // console.log('in add comment handler')
        if ( formValue === '') {
                setCreateError({message: Notifications.CreateError});
                //setIsClicked(true);
                 return;
        }

        const newComment = await commentService.create(pictureId, formValue);
        setComments(newComment);
        
        resetFormHandler();
 }

    // let allComments = Object.entries(comments);
    // console.log(allComments)
    // let commentsValues = allComments.map(comment => console.log(comment[1].text));
   // console.log(commentsValues)
 //console.log((test.map(comment => console.log(comment[1].text))));

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
    <>
     <legend>Add new comment:</legend>
        {userId
            ? <form method="POST">
                {Object.keys(setCreateError).length > 0 &&
                    <p className={styles["error-msg"]}>{error.message}</p>
                }
                <div>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formValue}
                        onChange={changeHandler}
                        onBlur={validateComment}
                        placeholder="Write comment here..." >
                    </textarea>
                    <p className={styles["error-msg"]}>{formErrors.comment}</p>
                </div>
                <div>
            <button type="button" onClick={onSubmit} disabled={isClicked}>Comment</button>

                </div>
            </form>
            : <p className={styles["comments-link"]}>To can comments you have to login <Link to={Path.Login}>Login</Link> or <Link to={Path.Register}>Register</Link>first!!!</p>
        }
        <div className={styles["details-comments"]}>
            <h2>Comments:</h2>
            <table>
                <tbody>
                   { Object.entries(comments).map((comment) => (
                        <tr key={comment[1]._createdOn}><td><span>{email}: </span> {comment[1].text}</td></tr>
                   ))}
                </tbody>
            </table>
            {comments.length === 0 &&
                <p className={styles["no-comment"]}>No comments yet.</p>
            }
        </div>
    </>
);
}