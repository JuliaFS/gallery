
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';

import { Path } from '../../constants/constants';
import styles from './Login.module.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import Modal from "../404/ModalErrors/ModalErrors";


const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export default function Login() {
    const [formErrors, setFormErrors] = useState({});
    const [isBlur, setIsBlur] = useState(false);
    
    const { loginSubmitHandler } = useContext(AuthContext);
    const { error } = useContext(AuthContext);
   
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: ''
    });

    const validate = (value) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!value.email){
            errors.email = 'Email is required!';
        } else if(!regex.test(value.email)){
            errors.email = 'This is not a valid email format';
        }
        if(!value.password){
            errors.password = 'Password is required!';
        } else if(value.password.length < 4){
            errors.password = 'Password must be at least 4 character long';
        }else if(value.password.length > 15){
            errors.password = 'Password can not exceed more than 15 characters';
        }
        return errors;
    }

    const validateInput = (e) =>{
        setFormErrors(validate(values));
        setIsBlur(true);
         
    }

    return (
        <section className={styles["login-page"]}>
            {/*<pre>{JSON.stringify(values, undefined, 2)}</pre>*/}
            <p className={styles["error-msg"]}>{error.message}</p>
            <form method="POST" onSubmit={onSubmit}>
                <legend>Login</legend>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email..."
                        name={LoginFormKeys.Email}
                        onChange={onChange}
                        value={values[LoginFormKeys.Email]}
                        onBlur={validateInput}
                    />
                    <p className={styles["error-msg"]}>{formErrors.email}</p>
                <input
                    type="password"
                    id="login-password"
                    placeholder="Enter password..."
                    name={LoginFormKeys.Password}
                    onChange={onChange}
                    value={values[LoginFormKeys.Password]}
                    onBlur={validateInput}
                />
                <p className={styles["error-msg"]}>{formErrors.password}</p>
                <input type="submit" value="Login" />
                <p>
                    <span>If you don't have profile click <Link to={Path.Register}>here</Link></span>
                </p>
            </form>
        </section>
    );
}
