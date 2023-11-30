import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import * as pictureService from '../../services/pictureService';
import { Path } from '../../constants/constants';
import { pathToUrl } from '../../utils/pathUtils';

// import './create.css';
import styles from './EditPicture.module.css';

// const formInitialState = {
//     title: '',
//     category: '',
//     painter: '',
//     imageUrl: '',
//     description: '',
// };

export default function EditPicture() {
    const navigate = useNavigate();
    const { pictureId } = useParams();
    const [picture, setPicture] = useState({
        title: '',
        category: '',
        painter: '',
        imageUrl: '',
        description: '',
    });

    useEffect(() => {
        pictureService.getOne(pictureId)
        .then(result => {
            setPicture(result);
        });
    }, [pictureId]);

    const editPictureSubmitHandler = async () => {
        try {
            await pictureService.edit(pictureId, picture);
            navigate(pathToUrl(Path.Details, {pictureId: _id}));
        } catch (err) {
            //add error notification
            console.log(err);
        }
    };

    const onChange = (e) => {
        setPicture(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

{/* -lekciq forms 1:02 controlled forms
    - add onblur for validation for better UI
    - input type submit predotvratqva defaultnoto prezarejdane na stranicata
*/}
    return (
        <section className={styles["create-page"]}>
            <form method='PUT' onSubmit={editPictureSubmitHandler} >
                    <legend>Create New Paint</legend>
                    <input  type="text" 
                            id="title" 
                            name="title" 
                            value={picture.title}
                            onBlur={() => console.log('on blur function for validation')}
                            onChange={onChange}
                            placeholder="Enter picture title..." 
                    />
                    <input  type="text"
                            id="category" 
                            name="Enter category..." 
                            value={picture.category}
                            onChange={onChange}
                            placeholder="Enter game category..." 
                    />
                    <label htmlFor="painter">Painter:</label>
                    <input  type="text" 
                            id="painter" 
                            name="painter" 
                            value={picture.painter}
                            onChange={onChange}
                            placeholder="Enter painter..." 
                    />
                    <label htmlFor="imageUrl">Picture:</label>
                    <input  type="text" 
                            id="imageUrl" 
                            name="imageUrl" 
                            value={picture.imageUrl}
                            onChange={onChange}
                            placeholder="Upload a photo..." 
                    />
                   <label htmlFor="description">Description:</label>
                    <textarea   
                        name="description"
                        value={picture.description}
                        onChange={onChange} 
                    >
                    </textarea>
                <button type="button" >Edit picture</button>
            </form>
        </section>
    );
}