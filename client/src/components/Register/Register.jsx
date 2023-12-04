import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import validate from './validateRegister';

import { Path } from '../../constants/constants';
import styles from './Register.module.css';


const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
};

export default function Register() {
    const [formErrors, setFormErrors] = useState({});
    const [isBlur, setIsBlur] = useState(false);
    const [isError, setIsError] = useState(false);

    const { registerSubmitHandler} = useContext(AuthContext);
    const { error } = useContext(AuthContext);
 
    useEffect(() => {
        if(Object.keys(error).length !== 0){
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [error]);

    const validate = (value) => {
        const errors = {};
        const curPassword = value.password;
        //console.log('validate: ' + value);
       // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
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
        if(!value["confirm-password"]){
            errors["confirm-password"] = 'Confirming password is required';
        } else if (curPassword !== value["confirm-password"]){
            errors["confirm-password"] = 'Password do not match';
        }
        // } else if(value["confirm-password"].length < 4){
        //     errors["confirm-password"]= 'Password must be at least 4 character long';
        // }else if(value["confirm-password"].length > 15){
        //     errors["confirm-password"] = 'Password can not exceed more than 15 characters';
        //}
        return errors;
    }

    const { values, onChange, onSubmit} = useForm(registerSubmitHandler, {
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
            {isError  
                ? <p className={styles["error-msg"]}>{error.message}</p> 
                : ''
            }
            <form  method="POST" onSubmit={onSubmit}>
                <legend>Register</legend>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={onChange}
                    value={values[RegisterFormKeys.Email]}
                    onBlur={validateInput}
                />
                <p className={styles["error-msg"]}>{formErrors[RegisterFormKeys.Email]}</p>
                <input
                    type="password"
                    name="password"
                    id="register-password"
                    placeholder="Enter your password..."
                    onChange={onChange}
                    value={values[RegisterFormKeys.Password]}
                    onBlur={validateInput}
                />
                <p className={styles["error-msg"]}>{formErrors[RegisterFormKeys.Password]}</p>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm your password..."
                    onChange={onChange}
                    value={values[RegisterFormKeys.ConfirmPassword]}
                    onBlur={validateInput}
                />
                <p className={styles["error-msg"]}>{formErrors[RegisterFormKeys.ConfirmPassword]}</p>
                <input type="submit" value="Register" />
                <p>
                    <span>If you already have profile click <Link to={Path.Login}>here</Link></span>
                </p>
            </form>
        </section>
    );
}