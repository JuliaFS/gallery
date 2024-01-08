import { Link } from "react-router-dom";
import { Path } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";
import styles from  "./Home.module.css";

export default function LatestPicture({
    imageUrl,
    title,
    _id
})  
{
   
    return(
        <div className={styles["latest-image"]}>
            <legend>{title}</legend>
            <div>
                <img src={imageUrl}></img>
            </div>
            <Link to={pathToUrl(Path.Details, {pictureId: _id})}>Details</Link>
        </div>
    );
}
// {/*}
// <div className={styles["gallery-box"]}>
// <legend>{title}</legend>
// <img src={imageUrl} />
// {/*<p>Details: {description}</p>*/}
// <Link to={`${Path.Gallery}/${_id}`}>Details</Link>
// </ div>*/}