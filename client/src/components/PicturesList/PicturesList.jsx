import { useEffect, useState} from 'react';

import * as pictureService from '../../services/pictureService';

import PictureListItem from './PictureListItem/PictureListItem';
import { Notifications } from '../../constants/constants';
import styles from './PicturesList.module.css';

export default function PicturesList(){

    const [pictures, setPictures] = useState([]);
    const[createError, setCreateError ] = useState({});

    useEffect(() => {
        pictureService.getAll()
        .then(result => setPictures(result))
        .catch(err => {
            setCreateError({message: Notifications.CanNotGetImage});
            console.log(err);
        });
    }, []);

    return(
        <section className={styles["gallery"]}>
            { Object.keys(createError).length > 0 &&
                 <Modal {...createError}/>
            }
           <h1>Pictures gallery</h1>
           <div className={styles["container"]}>
                {pictures.map(picture => (
                        <PictureListItem key={picture._id} {...picture} />
                ))}
           </div>

           {pictures.length === 0 && (
                <h3>No pictures yet!</h3>
            )}

        </section>   
    );
}