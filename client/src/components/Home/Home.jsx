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
        <div>
            <section>
                <h1>Latest pictures</h1>
                {latestPicture.map(picture => <LatestPicture {...picture} /> )}
                {!latestPicture && <p>No added picture in gallery yet!</p>}
            </section>
            <ul>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
                <li><a><img src='/images/chereshka-72dpi.jpg'/></a></li>
                <li><a><img src='/images/minzuhari-72dpi.jpg'/></a></li>
                <li><a><img src='/images/winter-72dpi.jpg'/></a></li>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
            </ul>
      </div>
    );
}
{/*
    return (
        <div>
            <ul>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
                <li><a><img src='/images/lilium-72dpi.jpg'/></a></li>
            </ul>
      </div>
    );
*/}

{/*    return (
        <div id={styles["background"]}>
            <div id={styles["gallery"]}>
                <figure class={styles["pic1"]}>
                    <img src="/images/winter-72dpi.jpg" />
                    <figcaption>Summer 2014</figcaption>
                </figure>
                <figure class={styles["pic2"]}>
                    <img src="/images/minzuhari-72dpi.jpg" />
                    <figcaption>Death valley</figcaption>
                </figure>
                <figure class={styles["pic3"]}>
                    <img src="/images/chereshka-72dpi.jpg" />
                    <figcaption>Early morning</figcaption>
                </figure>
                <figure class={styles["pic4"]}>
                    <img src="/images/minzuhari-72dpi.jpg" />
                    <figcaption>Lost.</figcaption>
                </figure>
                <figure class={styles["pic5"]}>
                    <img src="/images/winter-72dpi.jpg" />
                    <figcaption>#Brooklyn</figcaption>
                </figure>
                <figure class={styles["pic6"]}>
                    <img src="/images/minzuhari-72dpi.jpg" />
                    <figcaption>Why now?</figcaption>
                </figure>
                <figure class={styles["pic7"]}>
                    <img src="/images/winter-72dpi.jpg" />
                    <figcaption>Verbier 10.08.2002</figcaption>
                </figure>
                <figure class={styles["pic8"]}>
                    <img src="/images/winter-72dpi.jpg" />
                    <figcaption>My temporary home</figcaption>
                </figure>
                <figure class={styles["pic9"]}>
                    <img src="/images/minzuhari-72dpi.jpg" />
                    <figcaption>Love</figcaption>
                </figure>
                <figure class={styles["pic10"]}>
                    <img src="/images/winter-72dpi.jpg" />
                    <figcaption>Torino 2013</figcaption>
                </figure>
                <figure class={styles["pic11"]}>
                    <img src="/images/lilium-72dpi.jpg" />
                    <figcaption>Miss you..</figcaption>
                </figure>
            </div>
        </div>
    );*/}
