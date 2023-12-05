import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import * as pictureService from '../../services/pictureService';
import { Path } from '../../constants/constants';

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
        try {
            const response = await pictureService.create(formValues);
            resetFormHandler();
            navigate(Path.Gallery);
        } catch (err) {
            //add error notification
            console.log(err);
        }
    };

{/* -lekciq forms 1:02 controlled forms
    - add onblur for validation for better UI
    - input type submit predotvratqva defaultnoto prezarejdane na stranicata
*/}
    return (
        <section className={styles["create-page"]}>
            <form method="post" id="create" >
                    <h1>Create New Paint</h1>
                    <label htmlFor="title">Picture title:</label>
                    <input  type="text" 
                            id="title" 
                            name="title" 
                            value={formValues.title}
                            onBlur={() => console.log('on blur function for validation')}
                            onChange={changeHandler}
                            placeholder="Enter picture title..." 
                    />
                    <label htmlFor="category">Picture category:</label>
                    <input  type="text"
                            id="category" 
                            name="category" 
                            value={formValues.category}
                            onChange={changeHandler}
                            placeholder="Enter picture category..." 
                    />
                    <label htmlFor="painter">Painter name:</label>
                    <input  type="text" 
                            id="painter" 
                            name="painter" 
                            value={formValues.painter}
                            onChange={changeHandler}
                            placeholder="Enter painter name..." 
                    />
                    <label htmlFor="painterAge">Painter age:</label>
                     <input  type="number" 
                            id="painterAge" 
                            name="painterAge" 
                            value={formValues.painter}
                            onChange={changeHandler}
                            placeholder="Enter painter age..." 
                    />
                    <label htmlFor="imageUrl">Picture URL:</label>
                    <input  type="text" 
                            id="imageUrl" 
                            name="imageUrl" 
                            value={formValues.imageUrl}
                            onChange={changeHandler}
                            placeholder="Upload a photo..." 
                    />
                   <label htmlFor="description">Picture description:</label>
                    <textarea   name="description"
                                value={formValues.description}
                                onChange={changeHandler} >
                    </textarea>
                <button type="button" onClick={submitHandler}>Create picture</button>
                <button type="button" onClick={resetFormHandler}>Reset</button>
            </form>
        </section>
    );
}