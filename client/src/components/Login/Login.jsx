import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom';

//import { useAuthContext } from "../../contexts/AuthContext";
//import { useForm } from "../../hooks/useForm";
import { paths } from '../../constants/constants';
import styles from './Login.module.css';
import { useContext } from 'react';
import authContext from '../../contexts/AuthContext';

const LoginFormKeys = {
    [LoginFormKeys.email]: 'email',
    [LoginFormKeys.Password]: 'password'
};

export default function Login({
    //loginSubmitHandler - izpolzvaiki podavaneto prez context otpada predavaneto prez props
}) {
    const { loginSubmitHandler } = useContext(authContext);

    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        email: '',
        password: ''
    });
    return (
        <section className={styles["login-page"]}>
            <form method="POST" onSubmit={onSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">Email:</label>
                <input
            type="email"
            id="email"
            placeholder="Sokka@gmail.com"
            name={LoginFormKeys.Email}
            onChange={onChange}
            value={values[LoginFormKeys.Email]}
        />

                <label htmlFor="login-password">Password:</label>
                <input
            type="password"
            id="login-password"
            name={LoginFormKeys.Password}
            onChange={onChange}
            value={values[LoginFormKeys.Password]}
        />
                <input type="submit" value="Login" />
                <p>
                    <span>If you don't have profile click <Link to={paths.register}>here</Link></span>
                </p>
            </form>
        </section>
    );
}
