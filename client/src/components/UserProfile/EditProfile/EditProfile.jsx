import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

import * as authService from '../../../services/authService';
import AuthContext from '../../../contexts/AuthContext';
import useForm from '../../../hooks/useForm';
//import validate from '../common/validateRegisterForm';
import Modal from '../Modal/Modal';

import { Path } from '../../../constants/constants';
import styles from '../Profile.module.css';


const formInitialState = {
    username:  '',
    firstName: '',
    lastName: '',
    userAge: 0,
    interest: '',

};

export default function UpdateProfile() {
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
    console.log(userId)
    const placeholderUsername = username;
    const [profileInfo, setProfileInfo] = useState({
        username: username,
        email: email,
        pictureUrl: '',
    });
    // console.log(userId)
    // console.log(email)
    // console.log(username)

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
        setProfile(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const updateProfileSubmitHandler = async () => {
        console.log(profile)
        //const imageListRef = ref(storage, "images/");

        // if (imageUpload == null) {
        //     //setCreateError({message: Notifications.EditError});
        //     //setIsClicked(true);
        //     return;
        // }

//         if ( picture.first === '' ||
//         picture.category === '' ||
//         picture.painter === '' ||
//         picture.painterAge < 0 ||
//         picture.imageUrl === '' ||
//         picture.description === '') {
//            setCreateError({message: Notifications.EditError});
//            setIsClicked(true);
//             return;
//    }

        // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        // uploadBytes(imageRef, imageUpload).then((snapshot) => {
        //     //alert("Image uploaded");
        //     getDownloadURL(snapshot.ref).then((url) => {
        //         setProfileImage((prev) => [...prev, url])
        //     })

        // })
        try {
            await authService.editProfile(userId, profile);
            // console.log('profile: ')
            // console.log(profile)
            navigate(Path.ProfilePage);
        } catch (err) {
            //add error notification
            setCreateError({message: Notifications.OnEditError});
            console.log(err);
        }
        // navigate(Path.EditProfile);

        //  useEffect(() => {
        //     listAll(imageListRef).then((response) => {
        //         console.log(response)
        //     })
        //  }, []);


    };

    const validateInput = (e) => {
        // da se validira formata !!!!!!!!!!!!!!!!!
        //setFormErrors(validate(profile));
    }

    return (
        <section className={styles["update-profile"]}>
            {/*<Modal />*/}
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
            <div>
            <form method="put">
                <legend>Add Profile Info</legend>
                <input type="username"
                    id="username"
                    name="username"
                    value={profile.username}
                    onBlur={validateInput}
                    onChange={onChange}
                    placeholder={`${username}`}
                />
                <p className={styles["error-msg"]}>{formErrors.firstName}</p>
                <input type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onBlur={validateInput}
                    onChange={onChange}
                    placeholder="Enter first name..."
                />
                <p className={styles["error-msg"]}>{formErrors.firstName}</p>
                <label htmlFor="category">Picture category</label>
                <input type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onBlur={validateInput}
                    onChange={onChange}
                    placeholder="Enter last name..."
                />
                <p className={styles["error-msg"]}>{formErrors.lastName}</p>
                <label htmlFor="painter">Interest</label>
                <input type="text"
                    id="interest"
                    name="interest"
                    value={profile.interest}
                    onBlur={validateInput}
                    onChange={onChange}
                    placeholder="Enter your interest..."
                />
            
                <label htmlFor="painterAge">User age:</label>
                <input type="number"
                    id="userAge"
                    name="userAge"
                    value={profile.userAge}
                    onBlur={validateInput}
                    onChange={onChange}
                    placeholder="Enter your age..."
                />
                <p className={styles["error-msg"]}>{formErrors.interest}</p>
                <label>Attach profile picture</label>
                <input type="file"
                    id="pictureUrl"
                    name="pictureUrl"
                    onChange={(event) => setImageUpload(event.target.files[0])}
                    placeholder="Upload a profile picture..."
                />
                {/*<p className={styles["error-msg"]}>{formErrors.pictureUrl}</p>*/}
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={email}
                    disabled
                />
                <button type="button" onClick={updateProfileSubmitHandler}>Update profile</button>
            </form>
            </div>
            <div>
                <p>First name: {profile.firstName}</p>
            </div>
        </section>
    );
}