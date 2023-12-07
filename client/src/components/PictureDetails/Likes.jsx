import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";
//import * as likesService from '../../services/likesService';


export default function Likes (props){
    // console.log("print props: ")
    //const [picture, setPicture] = useState({});

    useEffect(() => {
        setPicture(props)
    }, []);

    console.log('in likes function')

    console.log('this is picture: ')
    console.log(picture)


    const { userId } = useContext(AuthContext);
    const { pictureId } = useParams();
    //console.log(pictureId)
    //console.log(props._id)
    //console.log(props.title)
    const [likesCount, setLikesCount] = useState(5);

    function getLikes(result){

    }

const onClickButtonLikes = async () => {

    
    //let pictureInfo = await likesService.getLikes(props._id);
    //console.log('likes before filter' + pictureInfo);

    // likes = likes.filter(pictureLikes => pictureLikes.pictureId === pictureId);
    // console.log(likes);
    //console.log('likes after filter' + likes);

    // isLiked = likes.find(liked => liked.data.userId === userId);
    // console.log(isLiked)

    // if(!isLiked){
    //     likes.find(liked => setLikesCount(liked.data.likes));
    //     try {
    //         const result = await likesService.createLike(pictureId, {userId, likes: likes.length });
    //     } catch (err) {
    //         //add error notification
    //         console.log(err);
    //     }  
    // } else {
    //     setLikesCount(9);//(likes.length);
    //     ///TO DO
    // }
}

    return (
        <>
            <div>{ !isLiked && userId && <button onClick={onClickButtonLikes}>Likes</button> }</div>
            <span>Likes: {likesCount} </span>
        </>
    );
}