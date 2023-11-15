import { Link
 } from "react-router-dom";
export default function PictureDetails(){
    return (
        <section id="picture-details">
            <h1>Picture Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src="" />
                    <h1>Title</h1>
                    <span className="levels">MaxLevel: </span>
                    <p className="type">Categoru</p>
                </div>

                <p className="text"></p>

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
                        <Link className="button">Edit</Link>
                        <button className="button">Delete</button>
                    </div>
            </div>

        </section>
    );
}