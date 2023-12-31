import { Link } from "react-router-dom";

import styles from './PictureListItem.module.css';
import { Path } from "../../../constants/constants";

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
            {/*<p>Details: {description}</p>*/}
            <Link to={`${Path.Gallery}/${_id}`}>Details</Link>
        </ div>
    );
}