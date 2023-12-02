import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";
import * as likesService from '../../services/likesService';

const formInitialState = {
    likes: 0,
    liked: []
}; 
export default function Likes(props){

    // const { email, userId } = useContext(AuthContext);
    const { pictureId } = useParams();
    let isLiked = true;
    
    const [likesInfo, setLikesInfo] = useState({});
    
    // //console.log(props.liked)

    // useEffect(() => {
    //     likesService.getLikeCount(pictureId)
    //     .then((result) => {
    //         if(result.code !== 404){
    //             setLikesInfo(result)
    //         }
    //     })
    // }, [pictureId]);
    // //Da se premesti vav onclick funkciqta
    // if(likesState.liked.includes(userId)){
    //     isLiked = true;
    // } else {
    //     likesState.liked.push(userId);
    //     likesState.likes  = Number(likesState.likes) + 1;
    //     isLiked = false;
    // }

    // console.log('likesState.likes = ' + likesState.likes);

const onClickButtonLikes = async () => {
    console.log('inside onClickButtonLikes')

    let likes = await likesService.getLikes();
    likes.filter()
    //     //Da se premesti vav onclick funkciqta
    // if(likesState.liked.includes(userId)){
    //     isLiked = true;
    // } else {
    //     likesState.liked.push(userId);
    //     likesState.likes  = Number(likesState.likes) + 1;
    //     isLiked = false;
    // }

    //     try {
    //         const result = await likesService.createLike(pictureId, likesState);
    //         setLikesState(result.likes);
    //         //navigate(pathToUrl(Path.Details, {pictureId: pictureId}));
    //     } catch (err) {
    //         //add error notification
    //         console.log(err);
    //     }   
}

    return (
        <div>{ isLiked &&
            <button onClick={onClickButtonLikes}>Likes</button> }
            <span>Likes: {likesInfo.likes} </span>
        </div>
        
    );
}