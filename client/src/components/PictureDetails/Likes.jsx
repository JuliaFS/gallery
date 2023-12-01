import { useEffect, useContext } from 'react';
import AuthContext from "../../contexts/AuthContext";
import * as likesService from '../../services/likesService';


export default function Likes({
    likes,
    liked,
    _id
}){
    const { email } = useContext(AuthContext);
    // useEffect(
    //     pictureService.
    // )

    const onClickButtonLikes = async () => {
        console.log('INNNNNNNNN')
        console.table('likes: ' + liked)
        //likes = Number(likes) + 1;
        const isVoted = false;
        // console.log('likes: ' + likes);
        // console.log('liked: ' + liked);
        console.log('email: ' + email)
        console.log( '_id: ' + _id)
        if(!liked.includes(email)){
            console.log('liked in if')
            likes = Number(likes) + 1;
            liked.push(email);

            await likesService.updateLikes(_id, { liked : liked, likes: likes});
            console.log('ready');
        } else {
            isVoted = true;
            alert('You already voted!')
        }

    }



    return (
        <div>
            <button onClick={onClickButtonLikes}>Likes</button>
            <span>Likes: {likes}</span>
        </div>
    );
}

// const [pictures, setPictures] = useState([]);

// useEffect(() => {
//     pictureService.getAll()
//     .then(result => setPictures(result))
//     .catch(err => {
//         //TO DO
//         console.log(err);
//     });
// }, []);