import { Link } from "react-router-dom";

import styles from './PictureListItem.module.css';
import { Path } from "../../../constants/constants";
import ImageMagnifier from "./ImageMagnifier";

export default function PictureListItem({
    _id,
    title,
    imageUrl,
    description
}){
    return(
        <div className={styles["gallery-box"]}>
            <legend>{title}</legend>
            <img src={imageUrl} />
            <ImageMagnifier imageUrl={imageUrl}/>
            {/*<p>Details: {description}</p>*/}
            <Link to={`${Path.Gallery}/${_id}`}>Details</Link>
        </ div>
    );
}