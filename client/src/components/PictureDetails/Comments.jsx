import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { Path, Notifications } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

import styles from "./PictureDetails.module.css";

import AuthContext from "../../contexts/AuthContext";
import * as commentService from '../../services/commentService';

const formInitialState = {
    comment: ''
};

export default function Comments() {

    const { email, userId } = useContext(AuthContext);
    const [comments, setComments] = useState({});
    const [error, setError] = useState({});
    const [isClicked, setIcClcked] = useState(false);
    const [createError, setCreateError] = useState({});
    //console.log(userId);
    //console.log(email)
    const [formValues, setFormValues] = useState(formInitialState);
    const [formErrors, setFormErrors] = useState({});

    const { pictureId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        commentService.getAll(pictureId)
            .then((result) => {
                setComments(result);
            })
            .catch((error) => setError(error));
    }, [pictureId]);

    const onChange = (e) => {
        setValue(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const resetFormHandler = () => {
        setFormValues(formInitialState);
    };

    const submitHandler = async () => {
        if ( formValues.comment === '' ) {
                setCreateError({message: Notifications.CreateError});
                setIsClicked(true);
                 return;
        }

        try {
            const newComment = await commentService.create(pictureId, formValues);
            resetFormHandler();
            navigate(Path.Gallery);
        } catch (err) {
            setCreateError({message: Notifications.Create});
            console.log(err.message);
        }
    };

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }
        ));
    };

    const validateInput = (e) =>{
        setFormErrors(validate(formValues));
         
    }

    const validateComment = (e) =>{
        setFormErrors(validate(value.comment));
         
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target.name)
        // console.log('in add comment handler')
        if ( value.comment === '') {
                setCreateError({message: Notifications.CreateError});
                //setIsClicked(true);
                 return;
        }

 }
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
        {userId
            ? <form method="POST">
                {Object.keys(setCreateError).length > 0 &&
                    <p className={styles["error-msg"]}>{error.message}</p>
                }
                <div>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formValues["comment"]}
                        onChange={changeHandler}
                        onBlur={validateInput}
                        placeholder="Write comment here..." >
                    </textarea>
                    <p className={styles["error-msg"]}>{formErrors.comment}</p>
                </div>
                <div>
            <button type="button" onClick={submitHandler} disabled={isClicked}></button>

                </div>
            </form>
            : <p className={styles["comments-link"]}>To can comments you have to login <Link to={Path.Login}>Login</Link> or <Link to={Path.Register}>Register</Link>first!!!</p>
        }
        <div className={styles["details-comments"]}>
            <h2>Comments:</h2>
            <table>
                <tbody>
                    {comments.map((comment) => (
                        <tr key={id}><td><span>{email}: </span> {text}</td></tr>
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