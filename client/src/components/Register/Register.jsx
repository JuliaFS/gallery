import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';

import { Path } from '../../constants/constants';
import styles from './Register.module.css';


const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
};

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);

    const { values, onChange, onSubmit} = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    })
    return (
        <section className={styles["register-page"]}>
            <form  method="post" onSubmit={onSubmit}>
                <legend>Register</legend>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={onChange}
                    value={values[RegisterFormKeys.Email]}
                />
                <input
                    type="password"
                    name="password"
                    id="register-password"
                    placeholder="Enter your password..."
                    onChange={onChange}
                    value={values[RegisterFormKeys.Password]}
                />
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm your password..."
                    onChange={onChange}
                    value={values[RegisterFormKeys.ConfirmPassword]}
                />
                <input type="submit" value="Register" />
                <p>
                    <span>If you already have profile click <Link to={Path.Login}>here</Link></span>
                </p>
            </form>
        </section>
    );
}