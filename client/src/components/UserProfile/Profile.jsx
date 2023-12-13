import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                setCreateError({message: Notifications.EditError});
                setIsClicked(true);
                 return;
             }

             const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
             uploadBytes(imageRef, imageUpload).then((snapshot) => {
                 //alert("Image uploaded");
                 getDownloadURL(snapshot.ref).then((url) => {
                    setProfileImage((prev) => [...prev, url])
                 })
                 
             })

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
            <div>
                {
                    profileImage.map((url) => {
                        return <img src={url} />;
                    })
                }
            </div>
            <form  method="put">
                <legend>Update profile</legend>
                <input
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your username..."
                    onChange={onChange}
                    onBlur={validateInput}
                    value={profileInfo.username}
                    disabled
                />
                <label>Attach profile picture</label>
                <input  type="file" 
                        id="pictureUrl" 
                        name="pictureUrl" 
                        value={profileInfo.pictureUrl}
                        onChange={(event) => setImageUpload(event.target.files[0])}
                        onBlur={validateInput}
                        placeholder="Upload a profile picture..." 
                />
                <p className={styles["error-msg"]}>{formErrors.pictureUrl}</p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={onChange}
                    onBlur={validateInput}
                    value={profileInfo.email}
                    disabled
                />
                <button type="button" onClick={updateProfileSubmitHandler}>Update profile</button>
            </form>
        </section>
    );
}

{/*}
const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload" src={src}/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>
  
  
  const Name =({
    onChange,
    value
  })=>
    <div className="field">
      <label htmlFor="name">
        name:
      </label>
      <input 
        id="name" 
        type="text" 
        onChange={onChange} 
        maxlength="25" 
        value={value} 
        placeholder="Alexa" 
        required/>
    </div>
  
    
  const Status =({
    onChange,
    value
  })=>
    <div className="field">
      <label htmlFor="status">
        status:
      </label>
      <input 
        id="status" 
        type="text" 
        onChange={onChange} 
        maxLength="35" 
        value={value} 
        placeholder="It's a nice day!" 
        required/>
    </div>
  
  
  const Profile =({
    onSubmit,
    src,
    name,
    status,
  })=>
    <div className="card">
      <form onSubmit={onSubmit}>
        <h1>Profile Card</h1>
        <label className="custom-file-upload fas">
          <div className="img-wrap" >
            <img for="photo-upload" src={src}/>
          </div>
        </label>
        <div className="name">{name}</div>
        <div className="status">{status}</div>
        <button type="submit" className="edit">Edit Profile </button>
      </form>
    </div>
       
        
  const Edit =({
    onSubmit,
    children,
  })=>
    <div className="card">
      <form onSubmit={onSubmit}>
        <h1>Profile Card</h1>
          {children}
        <button type="submit" className="save">Save </button>
      </form>
    </div>
  
  class CardProfile extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
      name:'',
      status:'',
      active: 'edit'
    }
  
    photoUpload = e =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }
    editName = e =>{
      const name = e.target.value;
      this.setState({
        name,
      });
    }
    
    editStatus = e => {
      const status = e.target.value;
      this.setState({
        status,
      });
    }
    
    handleSubmit= e =>{
      e.preventDefault();
      let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
      this.setState({
        active: activeP,
      })
    }
    
    render() {
      const {imagePreviewUrl, 
             name, 
             status, 
             active} = this.state;
      return (
        <div>
          {(active === 'edit')?(
            <Edit onSubmit={this.handleSubmit}>
              <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
              <Name onChange={this.editName} value={name}/>
              <Status onChange={this.editStatus} value={status}/>
            </Edit>
          ):(
            <Profile 
              onSubmit={this.handleSubmit} 
              src={imagePreviewUrl} 
              name={name} 
              status={status}/>)}
          
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <CardProfile/>,
    document.getElementById('root')
  )*/}
