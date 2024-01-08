import { useEffect, useState } from 'react';

import * as pictureService from '../../services/pictureService';
import styles from './Home.module.css';
import LatestPicture from './LatestPicture';
import Modal from '../404/ModalErrors/ModalErrors';

export default function Home({
    _id,
    accessToken,
    email
}) {
    const[ latestPicture, setLatestPicture ] = useState([]);
    const [errorMsg, setErrorMsg] = useState({});

    useEffect(() =>{
        pictureService.getLatest()
        .then(result => setLatestPicture(result.slice(-3)))
        .catch(error => setErrorMsg(error));
    }, []);

    
    return (
        <section className={styles["latest-pictures"]}>
            {/*{Object.keys(errorMsg).length > 0 &&
                <Modal {...errorMsg}/>
            }*/}
            <div>
                <h1>My little painters - Elif and Meral.</h1>
                <img src="https://raw.githubusercontent.com/JuliaFS/gallery/main/client/public/images/elif_meral.jpg"/>

            </div>
            <h2>Our latest 3 pictures</h2>
            <div className={styles["latest-container"]}>
                {latestPicture.map(picture => <LatestPicture key={picture._id} {...picture} /> )}
                {latestPicture.length === 0 && <p>No added picture in gallery yet!</p>}
            </div>
        </section>
    );
}
