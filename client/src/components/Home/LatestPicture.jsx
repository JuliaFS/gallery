import { Link } from "react-router-dom";
import { Path } from "../../constants/constants";
import { pathToUrl } from "../../utils/pathUtils";

export default function LatestPicture({
    imageUrl,
    title,
    _id
})  
{
   
    return(
        <div>
            <h3>{title}</h3>
            <img src={imageUrl}></img>
            <div>
                <p>Likes: </p>
            </div>
            <Link to={pathToUrl(Path.Details, {pictureId: _id})}>Details</Link>
        </div>
    );
}