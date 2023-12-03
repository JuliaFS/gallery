import { useEffect, useState } from 'react';

import * as pictureService from '../../services/pictureService';
import styles from './Home.module.css';
import LatestPicture from './LatestPicture';

export default function Home({
    _id,
    accessToken,
    email
}) {
    const[ latestPicture, setLatestPicture ] = useState([]);

    useEffect(() =>{
        pictureService.getLatest()
        .then(result => setLatestPicture(result));
    }, []);
    
    return (
        <section className={styles["latest-pictures"]}>
            <h1>Latest pictures</h1>
                {latestPicture.map(picture => <LatestPicture key={picture._id} {...picture} /> )}
                {latestPicture.length === 0 && <p>No added picture in gallery yet!</p>}
        </section>
    );
}
