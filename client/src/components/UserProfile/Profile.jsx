import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

import * as authService from '../../services/authService';
import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import validate from '../common/validateRegisterForm';

import { Path } from '../../constants/constants';
import styles from './Profile.module.css';


const formInitialState = {
    username: '',
    email: '',
    pictureUrl: '',
};

export default function UpdateProfile() {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isBlur, setIsBlur] = useState(false);
    const [isError, setIsError] = useState(false);

    const [imageUpload, setImageUpload] = useState(null);
    const [profileImage, setProfileImage] = useState([]);
    const imageListRef = ref(storage, "images/");

    const { email, username, userId, error } = useContext(AuthContext);
    const [profileInfo, setProfileInfo] = useState({
                username: username,
                email: email,
                pictureUrl: '',
    });
 console.log(userId)
 console.log(email)
 console.log(username)

 useEffect(() => {
    listAll(imageListRef).then((response) => {
        //console.log(response)
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                setProfileImage((prev) => [...prev, url])
            })
        })
    })
 }, []);
   
    // useEffect(() => {
    //         setProfileInfo({ 
    //             username: username,
    //             email: email,
    //             pictureUrl: '',
    //         });
    // }, []);

    const onChange = (e) => {
        setProfileInfo(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const updateProfileSubmitHandler = async () => {
        //const imageListRef = ref(storage, "images/");

            if ( imageUpload == null ) {
                //setCreateError({message: Notifications.EditError});
                //setIsClicked(true);
                 return;
             }

             const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
             uploadBytes(imageRef, imageUpload).then((snapshot) => {
                 //alert("Image uploaded");
                 getDownloadURL(snapshot.ref).then((url) => {
                    setProfileImage((prev) => [...prev, url])
                 })
                 
             })
             navigate(Path.CardProfile);

            //  useEffect(() => {
            //     listAll(imageListRef).then((response) => {
            //         console.log(response)
            //     })
            //  }, []);
      

      






        // try {
        //     await authService.editProfile(userId, profileInfo);

        //     //navigate(pathToUrl(Path.Details, {pictureId: pictureId}));
        // } catch (err) {
        //     //add error notification
        //     setCreateError({message: Notifications.OnEditError});
        //     console.log(err);
        // }
        
    };

    const validateInput = (e) =>{
        //setFormErrors(validate(picture));
    }

    return (
        <section className={styles["update-profile"]}>
            {error  
                ? <p className={styles["error-msg"]}>{error.message}</p> 
                : <p className={styles["no-error"]}>{''}</p>
            }
            {/*<div>
                {
                    profileImage.map((url) => {
                        return <img  key={url} src={url} />;
                    })
                }
            </div>*/}
            <form  method="put">
                <legend>Update profile</legend>
                <input
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your username..."
                    value={profileInfo.username}
                    disabled
                />
                <label>Attach profile picture</label>
                <input  type="file" 
                        id="pictureUrl" 
                        name="pictureUrl" 
                        onChange={(event) => setImageUpload(event.target.files[0])}
                        placeholder="Upload a profile picture..." 
                />
                <p className={styles["error-msg"]}>{formErrors.pictureUrl}</p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={profileInfo.email}
                    disabled
                />
                <button type="button" onClick={updateProfileSubmitHandler} data={profileImage}>Update profile</button>
            </form>
        </section>
    );
}