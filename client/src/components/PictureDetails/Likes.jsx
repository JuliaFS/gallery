import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";
import * as likesService from '../../services/likesService';
import Modal from '../404/ModalErrors/ModalErrors';
import { Notifications } from '../../constants/constants';


export default function Likes (){
const { userId } = useContext(AuthContext);
    const { pictureId } = useParams();
    const [isClicked, setIsClicked] = useState(false);
    const [pictureLikes, setPictureLikes] = useState([]);
    const[createError, setCreateError ] = useState({});

    useEffect(() => {
        likesService.getLikes(pictureId)
        .then(result => {
            setPictureLikes(result);
        });
    },[]);

const onClickButtonLikes = async () => {
        setIsClicked(true);
        const token = localStorage.getItem('accessToken');

        const isVoted = pictureLikes.find(x => x.userId === userId);
        console.log(isVoted)
        
        // if(isVoted){
        //     setIsClicked(true);
        //     //setCreateError({message: Notifications.Voted});
        //     return;
        // } 

            console.log(Object.keys(createError).length)
        try{
            const postedUser = await likesService.createLike(pictureId, userId, token);
            //console.log(postedUser)
            setIsClicked(true);

        }catch(err){
            setCreateError({message: Notifications.Voted});
        }
    }      
    return (
        <>
        {Object.keys(createError).length > 0 &&
            <Modal {...createError}/>
        }
        { userId && 
            <button onClick={onClickButtonLikes} disabled={isClicked}>Likes</button> }
            <span>Likes: {pictureLikes.length} </span>
        </>
    );
}