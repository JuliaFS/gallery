import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import * as pictureService from '../../services/pictureService';
import { Path } from '../../constants/constants';
import { pathToUrl } from '../../utils/pathUtils';

// import './create.css';
import styles from './EditPicture.module.css';

const formInitialState = {
    title: '',
    category: '',
    painter: '',
    imageUrl: '',
    description: '',
};

export default function EditPicture() {
    const navigate = useNavigate();
    const { pictureId } = useParams();
    const [picture, setPicture] = useState(formInitialState);

    useEffect(() => {
        pictureService.getOne(pictureId)
        .then(result => {
            setPicture({ 
                title: result.title,
                category: result.category,
                painter: result.painter,
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
        try {
            await pictureService.edit(pictureId, picture);
            navigate(pathToUrl(Path.Details, {pictureId: pictureId}));
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
            <form method="PUT">
                    <legend>Create New Paint</legend>
                    <label htmlFor="title">Picture title</label>
                    <input  type="text" 
                            id="title" 
                            name="title" 
                            value={picture.title}
                            onBlur={() => console.log('on blur function for validation')}
                            onChange={onChange}
                            placeholder="Enter picture title..." 
                    />
                    <label htmlFor="category">Picture category</label>
                    <input  type="text"
                            id="category" 
                            name="category" 
                            value={picture.category}
                            onChange={onChange}
                            placeholder="Enter game category..." 
                    />
                    <label htmlFor="painter">Picture painter</label>
                    <input  type="text" 
                            id="painter" 
                            name="painter" 
                            value={picture.painter}
                            onChange={onChange}
                            placeholder="Enter painter..." 
                    />
                    <label htmlFor="imageUrl">Picture url</label>
                    <input  type="text" 
                            id="imageUrl" 
                            name="imageUrl" 
                            value={picture.imageUrl}
                            onChange={onChange}
                            placeholder="Upload a photo..." 
                    />
                    <label htmlFor="description">Picture description</label>
                    <textarea   
                        name="description"
                        value={picture.description}
                        onChange={onChange} 
                        placeholder="Enter description here..."
                    >
                    </textarea>
                <button type="button" onClick={editPictureSubmitHandler}>Edit picture</button>
            </form>
        </section>
    );
}