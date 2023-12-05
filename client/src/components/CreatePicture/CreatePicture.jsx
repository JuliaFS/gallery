import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import * as pictureService from '../../services/pictureService';
import { Path, Notifications } from '../../constants/constants';

import styles from './CreatePicture.module.css';
import Modal from '../404/ModalErrors';

const formInitialState = {
    title: '',
    category: '',
    painter: '',
    painterAge: 0,
    imageUrl: '',
    description: ''
};

export default function CreatePicture() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(formInitialState);
    const [formErrors, setFormErrors] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    const changeHandler = (e) => {
        let isEmpty = false;
        if(e.target.value !== ""){
            setFormValues(state => ({
                ...state,
                [e.target.name]: e.target.value
            }
            ));
        } else {
            isEmpty = true;
            return;
        }
        
    };

    const resetFormHandler = () => {
        setFormValues(formInitialState);
    };

    const submitHandler = async () => {

        console.log(formValues)
        if ( formValues.title === '' ||
             formValues.category === '' ||
             formValues.painter === '' ||
             formValues.imageUrl === '' ||
             formValues.description === '') {
                console.log('in return in CreatePicture')
                setFormErrors(Notifications.CreateError);
                setIsClicked(true);
                 return;
        }

        try {
            const response = await pictureService.create(formValues);
            resetFormHandler();
            navigate(Path.Gallery);
        } catch (err) {
            //add error notification
            console.log(err);
        }
    };

    const validateInput = (e) =>{
        //console.log(values)
        setFormErrors(validate(values));
        setIsBlur(true);
         
    }

{/* -lekciq forms 1:02 controlled forms
    - add onblur for validation for better UI
    - input type submit predotvratqva defaultnoto prezarejdane na stranicata
*/}
    return (
        <section className={styles["create-page"]}>
            { isClicked &&
                 <Modal {...formErrors}/>
            }
            <form method="POST">
                    <h1>Create New Paint</h1>
                    <label htmlFor="title">Picture title:</label>
                    <input  type="text" 
                            id="title" 
                            name="title" 
                            value={formValues.title}
                            onBlur={validateInput}
                            onChange={changeHandler}
                            placeholder="Enter picture title..." 
                    />
                    <label htmlFor="category">Picture category:</label>
                    <input  type="text"
                            id="category" 
                            name="category" 
                            value={formValues.category}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Enter picture category..." 
                    />
                    <label htmlFor="painter">Painter name:</label>
                    <input  type="text" 
                            id="painter" 
                            name="painter" 
                            value={formValues.painter}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Enter painter name..." 
                    />
                    <label htmlFor="painterAge">Painter age:</label>
                     <input  type="number" 
                            id="painterAge" 
                            name="painterAge" 
                            value={formValues.painterAge}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Enter painter age..." 
                    />
                    <label htmlFor="imageUrl">Picture URL:</label>
                    <input  type="text" 
                            id="imageUrl" 
                            name="imageUrl" 
                            value={formValues.imageUrl}
                            onChange={changeHandler}
                            onBlur={validateInput}
                            placeholder="Upload a photo..." 
                    />
                   <label htmlFor="description">Picture description:</label>
                    <textarea   name="description"
                                value={formValues.description}
                                onChange={changeHandler}
                                onBlur={validateInput}
                                placeholder="Enter picture description here..."
                    ></textarea>
                    <p className={styles["error-msg"]}>{formErrors.description}</p>
                <button type="button" onClick={submitHandler}>Create picture</button>
                <button type="button" onClick={resetFormHandler}>Reset</button>
            </form>
        </section>
    );
}