import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import * as pictureService from '../../services/pictureService';
import { Path } from '../../constants/constants';
import validate from './validateCreatePicture';
import Modal from '../404/ModalErrors';

import styles from './CreatePicture.module.css';

const formInitialState = {
    title: '',
    category: '',
    painter: '',
    painterAge: 1,
    imageUrl: '',
    description: ''
};

export default function CreatePicture() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(formInitialState);
    const [formErrors, setFormErrors] = useState({});

    const [isSubmitrd, setIsSubmited] = useState(false);
    //const [isError, setIsError] = useState(false);

    // useEffect(() => {
    //     if(Object.keys(error).length !== 0){
    //         setIsError(true);
    //     } else {
    //         setIsError(false);
    //     }
    // }, [error]);


    const changeHandler = (e) => {
            setFormValues(state => ({
                ...state,
                [e.target.name]: e.target.value
            }))
    };

    const resetFormHandler = () => {
        setFormValues(formInitialState);
    };

    const submitHandler = async () => {
        e.preventDefault();
        console.log(formValues)
        // if ( formValues.title === '' ||
        //      formValues.category === '' ||
        //      formValues.painter === '' ||
        //      formValues.imageUrl === '' ||
        //      formValues.description === '') {
        //         console.log('inreturn')
        //          navigate(Path.Gallery);
        //          return;
        // }

        try {
            const response = await pictureService.create(formValues);
            resetFormHandler();
            navigate(Path.Gallery);
        } catch (error) {
            <Modal {...error}/>
            //setIsError(true);
            console.log(error);
        }
    };

    const validateInput = (e) =>{
        e.preventDefault();
        //console.log(values)
        setFormErrors(validate(formValues));
        //setIsSubmited(true);
         
    }

{/* -lekciq forms 1:02 controlled forms
    - add onblur for validation for better UI
    - input type submit predotvratqva defaultnoto prezarejdane na stranicata
*/}
    return (
        <section className={styles["create-page"]}>
            <form method="POST" onSubmit={submitHandler}>
                    <h1>Create New Paint</h1>
                    <label htmlFor="title">Picture title:</label>
                    <input  type="text" 
                            id="title" 
                            name="title" 
                            value={formValues.title}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Enter picture title..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.title}</p>
                    <label htmlFor="category">Picture category:</label>
                    <input  type="text"
                            id="category" 
                            name="category" 
                            value={formValues.category}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Enter picture category..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.category}</p>
                    <label htmlFor="painter">Painter name:</label>
                    <input  type="text" 
                            id="painter" 
                            name="painter" 
                            value={formValues.painter}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Enter painter name..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.painter}</p>
                    <label htmlFor="painterAge">Painter age:</label>
                     <input  type="number" 
                            id="painterAge" 
                            className={styles["age-input"]}
                            name="painterAge" 
                            value={formValues.painterAge}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="1..." 
                            min={1}
                            max={75}
                    />
                    <p className={styles["error-msg"]}>{formErrors.painterAge}</p>
                    <label htmlFor="imageUrl">Picture URL:</label>
                    <input  type="text" 
                            id="imageUrl" 
                            name="imageUrl" 
                            value={formValues.imageUrl}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Upload a photo..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.imageUrl}</p>
                   <label htmlFor="description">Picture description:</label>
                    <textarea   name="description"
                                value={formValues.description}
                                onChange={changeHandler}
                                onBlur={validateInput}
                                placeholder="Enter picture description here..."
                    ></textarea>
                    <p className={styles["error-msg"]}>{formErrors.description}</p>
                <button type="submit">Create picture</button>
                <button type="button" onClick={resetFormHandler}>Reset</button>
            </form>
        </section>
    );
}