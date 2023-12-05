import { Link } from "react-router-dom";

import styles from './PageNotFound.module.css/';
import { Path } from "../../../constants/constants";


export default function PageNotFound(){
    return(
        <div className={styles["page-404"]} >
            <h1>Oops! You seem to be lost...</h1>
            <p>Here are some helpful links:</p>
            <Link to={Path.Home}>Home</Link>
            <Link to={Path.Gallery}>See our picture...</Link>
        </div>
    );
}