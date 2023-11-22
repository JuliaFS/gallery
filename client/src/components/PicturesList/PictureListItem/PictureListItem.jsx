import { Link } from "react-router-dom";
//import { paths } from "../../constants/constants";

export default function PictureListItem({
    _id,
    title,
    imageUrl,
    description
}){
    return(
        <div>
            <h2>{title}</h2>
            <img src={imageUrl} />
            <p>Details: {description}</p>
            <Link to={`/pictures/${_id}`}>Details</Link>
        </ div>
    );
}