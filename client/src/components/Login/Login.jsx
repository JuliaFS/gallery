
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

//import { useAuthContext } from "../../contexts/AuthContext";
//import { useForm } from "../../hooks/useForm";
import useForm from '../../hooks/useForm';

import { Path } from '../../constants/constants';
import styles from './Login.module.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import Modal from "../404/ModalErrors";


const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    //const { error } = useContext(AuthContext);
    // const [formErrors, setFormErrors] = useState({});
    //let checkForError = Object.values(error);


    const [err, setErr] = useState("");
    
   
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: ''
    });

    const validateInput = (e) =>{
        //const error = {};
        //const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        switch(e.target.name){
            case "email": {
                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                const  isCorrectEmail = regex.test(e.target.value);
                    if(!isCorrectEmail){
                        setErr('Pls check and enter correct email.');
                    }
                    break;
                }
            case "password": {
                if(e.target.value.length < 4 && e.target.value.length > 12){
                    setErr('Pls check passwords length');
                }
                break;
            }
            default: setErr('Something wrong, pls check info carefully...')
        }
        //return errorMsg;
    }


   
    //console.log('props in login' + props);
    return (
        <section className={styles["login-page"]}>
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
                        required
                    />
                    <p className="error">{err}</p>
                <input
                    type="password"
                    id="login-password"
                    placeholder="Enter password..."
                    name={LoginFormKeys.Password}
                    onChange={onChange}
                    value={values[LoginFormKeys.Password]}
                    required
                />
                <p className="error">{err}</p>
                <input type="submit" value="Login" />
                <p>
                    <span>If you don't have profile click <Link to={Path.Register}>here</Link></span>
                </p>
            </form>
        </section>
    );
}

