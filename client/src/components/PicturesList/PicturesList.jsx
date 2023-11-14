import { useEffect, useState} from 'react';

import * as pictureService from '../../services/pictureService';

import './picturesList.css';

export default function PicturesList(){

    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        pictureService.getAll()
        .then(result => setPictures(result));
    }, []);

    console.log(pictures);

    return(
        <section>
            <div className="gallery">
                <h2>Best Lilies</h2>
                <img src="../public/images/lilium-72dpi.jpg" />
                <p>Details</p>
            </ div>
            <div className="gallery"> 
                <h2>Best Lilies 1</h2>
                <img src="../public/images/lilium-72dpi.jpg" />
                <p>Details 11111</p>
            </ div>
        </section>   
    );
}