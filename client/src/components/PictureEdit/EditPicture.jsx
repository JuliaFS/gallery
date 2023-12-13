import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import * as pictureService from '../../services/authService';


import { Path, Notifications } from '../../constants/constants';
import { pathToUrl } from '../../utils/pathUtils';
import Modal from '../404/ModalErrors/ModalErrors';
import validate from '../common/validateCreateForm';

// import './create.css';
import styles from './EditPicture.module.css';

const formInitialState = {
    title: '',
    category: '',
    painter: '',
    painterAge: 0,
    imageUrl: '',
    description: '',
};

export default function EditProfile() {
    const navigate = useNavigate();
    const { pictureId } = useParams();
    const [picture, setPicture] = useState(formInitialState);
    const [isClicked, setIsClicked] = useState(false);
    const [createError, setCreateError] = useState({});
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        pictureService.getOne(pictureId)
        .then(result => {
            setPicture({ 
                title: result.title,
                category: result.category,
                painter: result.painter,
                painterAge: result.painterAge,
                imageUrl: result.imageUrl,
                description: result.description,
            });
        });
    }, [pictureId]);

    const onChange = (e) => {
        setPicture(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const editPictureSubmitHandler = async () => {
        console.log(picture.title)
        if ( picture.title === '' ||
        picture.category === '' ||
        picture.painter === '' ||
        picture.painterAge < 0 ||
        picture.imageUrl === '' ||
        picture.description === '') {
           setCreateError({message: Notifications.EditError});
           setIsClicked(true);
            return;
   }

        try {
            await pictureService.edit(pictureId, picture);
            navigate(pathToUrl(Path.Details, {pictureId: pictureId}));
        } catch (err) {
            //add error notification
            setCreateError({message: Notifications.OnEditError});
            console.log(err);
        }
    };

    const validateInput = (e) =>{
        setFormErrors(validate(picture));
    }

{/* -lekciq forms 1:02 controlled forms
    - add onblur for validation for better UI
    - input type submit predotvratqva defaultnoto prezarejdane na stranicata
*/}
    return (
        <section className={styles["create-page"]}>
            { isClicked &&
                 <Modal {...createError}/>
            }
            <form method="PUT">
                    <legend>Edit picture</legend>
                    <label htmlFor="title">Picture title</label>
                    <input  type="text" 
                            id="title" 
                            name="title" 
                            value={picture.title}
                            onBlur={validateInput}
                            onChange={onChange}
                            placeholder="Enter picture title..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.title}</p>
                    <label htmlFor="category">Picture category</label>
                    <input  type="text"
                            id="category" 
                            name="category" 
                            value={picture.category}
                            onBlur={validateInput}
                            onChange={onChange}
                            placeholder="Enter game category..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.category}</p>
                    <label htmlFor="painter">Picture painter</label>
                    <input  type="text" 
                            id="painter" 
                            name="painter" 
                            value={picture.painter}
                            onBlur={validateInput}
                            onChange={onChange}
                            placeholder="Enter painter..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.painter}</p>
                     <label htmlFor="painterAge">Painter age:</label>
                     <input  type="number" 
                            id="painterAge" 
                            name="painterAge" 
                            value={picture.painterAge}
                            onBlur={validateInput}
                            onChange={onChange}
                            placeholder="Enter painter age..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.painterAge}</p>
                    <label htmlFor="imageUrl">Picture url</label>
                    <input  type="text" 
                            id="imageUrl" 
                            name="imageUrl" 
                            value={picture.imageUrl}
                            onBlur={validateInput}
                            onChange={onChange}
                            placeholder="Upload a photo..." 
                    />
                    <p className={styles["error-msg"]}>{formErrors.imageUrl}</p>
                    <label htmlFor="description">Picture description</label>
                    <textarea   
                        name="description"
                        value={picture.description}
                        onBlur={validateInput}
                        onChange={onChange} 
                        placeholder="Enter description here..."
                    >
                    </textarea>
                    <p className={styles["error-msg"]}>{formErrors.description}</p>
                <button type="button" onClick={editPictureSubmitHandler}>Edit picture</button>
            </form>
        </section>
    );
}