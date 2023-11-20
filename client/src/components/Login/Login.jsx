import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom';

//import { useAuthContext } from "../../contexts/AuthContext";
//import { useForm } from "../../hooks/useForm";
import { paths } from '../../constants/constants';
import styles from './Login.module.css';

// const LoginFormKeys = {
//     Email: 'email',
//     Password: 'password'
// };

export default function Login() {
        // const { onLoginSubmit } = auth;
        //const { onLoginSubmit } = useAuthContext();
        //const { values, changeHandler, onSubmit } = useForm({
        //    [LoginFormKeys.Email]: '',
        //    [LoginFormKeys.Password]: '',
        //}, onLoginSubmit);

    const { values, onChange, onSubmit } = useForm({
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
            name="email"
            onChange={onChange}
            value={values.email}
        />

                <label htmlFor="login-password">Password:</label>
                <input
            type="password"
            id="login-password"
            name="password"
            onChange={onChange}
            value={values.password}
        />
                <input type="submit" value="Login" />
                <p>
                    <span>If you don't have profile click <Link to={paths.register}>here</Link></span>
                </p>
            </form>
        </section>
    );
}
