import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";
import * as likesService from '../../services/likesService';
import Modal from '../404/ModalErrors/ModalErrors';
import { Notifications } from '../../constants/constants';
import styles from './PictureDetails.module.css';


export default function Likes ({isOwner}){
    const { userId } = useContext(AuthContext);
    const { pictureId } = useParams();
    const [isClicked, setIsClicked] = useState(false);
    const [pictureLikes, setPictureLikes] = useState([]);
    const [error, setError ] = useState({});

    useEffect(() => {
        likesService.getLikes(pictureId)
        .then(result => {
            setPictureLikes(result);
        }).catch(err => setError(err));
    },[pictureLikes]);

    //const isOwner = userId === pictureLikes._ownerId;
    //console.log(isOwner)
    const onClickButtonLikes = async () => {
        setIsClicked(true);
        const token = localStorage.getItem('accessToken');

        const isVoted = pictureLikes.find(x => x.userId === userId);
        
        if(isVoted){
            
            setError({message: Notifications.Voted});
            return;
        } 

        try{
            const postedUser = await likesService.createLike(pictureId, userId, token);

        }catch(err){
            setError({message: Notifications.Voted});
        }
    }      
    return (
        <>
        {Object.keys(error).length > 0 &&
            <Modal {...error}/>
        }
        {/*{Object.keys(error).length > 0 &&  
                <p className={styles["error-msg"]}>{error.message}</p> 
        }*/}
        { userId && !isOwner &&
            <button onClick={onClickButtonLikes} disabled={isClicked}>Likes</button> 
        }
            <span>Likes: {pictureLikes.length} </span>
        </>
    );
}
