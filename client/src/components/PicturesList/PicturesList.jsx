import { useEffect, useState} from 'react';

import * as pictureService from '../../services/pictureService';

import './picturesList.css';
import PictureListItem from './PictureListItem/PictureListItem';

export default function PicturesList(){

    const [pictures, setPictures] = useState([]);
    console.log(pictures)
    useEffect(() => {
        pictureService.getAll()
        .then(result => setPictures(result));
    }, []);
    console.log(pictures)

    return(
        <section>
           <h1>Pictures gallery</h1>
           {pictures.map(picture => (
                <PictureListItem key={picture._id} {...picture} />
           ))}
           {pictures.length === 0 && (
                <h3>No pictures yet!</h3>
            )}
        </section>   
    );
}