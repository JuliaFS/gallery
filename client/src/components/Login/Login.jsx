
import { Link } from 'react-router-dom';

//import { useAuthContext } from "../../contexts/AuthContext";
//import { useForm } from "../../hooks/useForm";
import useForm from '../../hooks/useForm'

import { Path } from '../../constants/constants';
import styles from './Login.module.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';


const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export default function Login({
    //loginSubmitHandler - izpolzvaiki podavaneto prez context otpada predavaneto prez props
}) {
    const { loginSubmitHandler } = useContext(AuthContext);

    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: ''
    });
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
                        required
                    />
                <input
                    type="password"
                    id="login-password"
                    placeholder="Enter password..."
                    name={LoginFormKeys.Password}
                    onChange={onChange}
                    value={values[LoginFormKeys.Password]}
                    required
                />
                <input type="submit" value="Login" />
                <p>
                    <span>If you don't have profile click <Link to={Path.Register}>here</Link></span>
                </p>
            </form>
        </section>
    );
}
