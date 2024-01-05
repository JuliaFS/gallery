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
                <p>This site is intended as an exhibition of the paintings of my princesses - Elif and Meral.</p>
                <img src="./public/images/elif_meral.jpg"/>

            </div>
            <div>
                <h3>Our latest 3 pictures</h3>
                {latestPicture.map(picture => <LatestPicture key={picture._id} {...picture} /> )}
                {latestPicture.length === 0 && <p>No added picture in gallery yet!</p>}
            </div>
        </section>
    );
}
