import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import validate from '../common/validateRegisterForm';

import { Path } from '../../constants/constants';
import styles from './Register.module.css';
import Modal from '../PicturesList/PictureListItem/Modal/Modal';


const RegisterFormKeys = {
    Username: 'username',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
};

export default function Register() {
    const [formErrors, setFormErrors] = useState({});
    const [isBlur, setIsBlur] = useState(false);
    const [isError, setIsError] = useState(false);

    const { registerSubmitHandler, error, isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated)
 
    useEffect(() => {
        if(Object.keys(error).length !== 0){
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [error]);

    const { values, onChange, onSubmit} = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    })

    const validateInput = (e) =>{
        //console.log(values)
        setFormErrors(validate(values));
        setIsBlur(true);
         
    }

    return (
        <section className={styles["register-page"]}>
            {error  
                ? <p className={styles["error-msg"]}>{error.message}</p> 
                : <p className={styles["no-error"]}>{''}</p>
            }
            <form  method="post" onSubmit={onSubmit}>
                <legend>Register</legend>
                <input
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your username..."
                    onChange={onChange}
                    onBlur={validateInput}
                    value={values[RegisterFormKeys.Username]}
                />
                <p className={styles["error-msg"]}>{formErrors[RegisterFormKeys.Username]}</p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={onChange}
                    onBlur={validateInput}
                    value={values[RegisterFormKeys.Email]}
                />
                <p className={styles["error-msg"]}>{formErrors[RegisterFormKeys.Email]}</p>
                <input
                    type="password"
                    name="password"
                    id="register-password"
                    placeholder="Enter your password..."
                    onChange={onChange}
                    onBlur={validateInput}
                    value={values[RegisterFormKeys.Password]}
                />
                <p className={styles["error-msg"]}>{formErrors[RegisterFormKeys.Password]}</p>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm your password..."
                    onChange={onChange}
                    onBlur={validateInput}
                    value={values[RegisterFormKeys.ConfirmPassword]}
                />
                <p className={styles["error-msg"]}>{formErrors[RegisterFormKeys.ConfirmPassword]}</p>
                <input type="submit" value="Register" />
                <p>
                    <span>If you already registered click <Link to={Path.Login}>here</Link></span>
                </p>
            </form>
        </section>
    );
}