import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as pictureService from '../../services/pictureService';


export default function PictureDetails(){
    const [picture, setPicture] = useState({});
    const { pictureId } = useParams();

    useEffect(() => {
        pictureService.getOne(pictureId)
        .then(setPicture); 
    }, [pictureId]);

    return (
        <section id="picture-details">
            <h1>Picture Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={picture.imageUrl} alt={picture.title}/>
                    <h1>{picture.title}</h1>
                    <span className="levels">Painter: {picture.painter} </span>
                    <p className="type">Category: {picture.category}</p>
                </div>

                <p className="text">{picture.description}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                            <li className="comment">
                                <p></p>
                            </li>
                    </ul>

                        <p className="no-comment">No comments.</p>
                </div>

                    <div className="buttons">
                        <Link to="" className="button">Edit</Link>
                        <button className="button">Delete</button>
                    </div>
            </div>

        </section>
    );
}