import { Link } from "react-router-dom";
//import { paths } from "../../constants/constants";

import styles from './PictureListItem.module.css';

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
            <Link to={`/pictures/${_id}`}>Details</Link>
        </ div>
    );
}