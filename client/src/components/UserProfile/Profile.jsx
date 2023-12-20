import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

import * as authService from '../../services/authService';
import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import validate from '../common/validateRegisterForm';
import Modal from './Modal/Modal';

import { Path } from '../../constants/constants';
import styles from './Profile.module.css';
import CardProfile from './CardProfile/CardProfile';


const formInitialState = {
    username:  '',
    firstName: '',
    lastName: '',
    userAge: 0,
    interest: '',
};

export default function UpdateProfile(children) {
    const navigate = useNavigate();
    const [isBlur, setIsBlur] = useState(false);
    const [isError, setIsError] = useState(false);

    const [profile, setProfile] = useState(formInitialState);
    const [isClicked, setIsClicked] = useState(false);
    const [createError, setCreateError] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const [imageUpload, setImageUpload] = useState(null);
    const [profileImage, setProfileImage] = useState([]);
    const imageListRef = ref(storage, "images/");

    const { email, username, userId, error } = useContext(AuthContext);
    const placeholderUsername = username;
    const [profileInfo, setProfileInfo] = useState({
        username: username,
        email: email,
        pictureUrl: '',
    });
  
    console.log(children)
   

    const onChange = (e) => {
        setProfile(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const updateProfileSubmitHandler = async () => {
        //const imageListRef = ref(storage, "images/");

        if (imageUpload == null) {
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
        try {
            const result = await authService.getUser(userId);
            console.log(result)
            console.log(profile)
            //navigate(Path.ProfilePage);
        } catch (err) {
            //add error notification
            setCreateError({message: Notifications.OnEditError});
            console.log(err);
        }
        // navigate(Path.EditProfile);

     

    };

    const validateInput = (e) => {
        setFormErrors(validate(profile));
    }

    return (
        <section className={styles["update-profile"]}>
            <Modal />
            {error
                ? <p className={styles["error-msg"]}>{error.message}</p>
                : <p className={styles["no-error"]}>{''}</p>
            }
        

        <CardProfile {////////////////...snapshot}/>


        <div>Test</div>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        </section>
    );
}