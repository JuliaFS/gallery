import { useContext, useState, useEffect, props } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { storage } from '../../firebase';
//import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
//import { v4 } from 'uuid';

//import * as authService from '../../services/authService';
import AuthContext from '../../../contexts/AuthContext';
//import useForm from '../../hooks/useForm';
//import validate from '../common/validateRegisterForm';

import { Path } from '../../../constants/constants';
//import styles from './Profile.module.css';



export default function CardProfile(props) {

    //const navigate = useNavigate();
  
    console.log(props.children)
    console.log(props.url)

   
  

    // const updateProfileSubmitHandler = async () => {
    //     //const imageListRef = ref(storage, "images/");

    //         if ( imageUpload == null ) {
    //             setCreateError({message: Notifications.EditError});
    //             setIsClicked(true);
    //              return;
    //          }

    //          const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    //          uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //              //alert("Image uploaded");
    //              getDownloadURL(snapshot.ref).then((url) => {
    //                 setProfileImage((prev) => [...prev, url])
    //              })
                 
    //          })
       
    // };

    
    return (
            <div>
                {/*{
                    profileImage.map((url) => {
                        return <img  key={url} src={url} />;
                    })
                }*/}
                <p>User Profile box 111</p>
            </div>
            
        
    );
}