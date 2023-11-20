import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';

import { Path } from '../../constants/constants';
import './register.css';


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
        <section id="register-page">
            <form  method="post" onSubmit={onSubmit}>
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="maria@email.com"
                    onChange={onChange}
                    value={values[RegisterFormKeys.Email]}
                />

                <label htmlFor="pass">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="register-password"
                    placeholder="Enter password"
                    onChange={onChange}
                    value={values[RegisterFormKeys.Password]}
                />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm password"
                    onChange={onChange}
                    value={values[RegisterFormKeys.ConfirmPassword]}
                />
                <input type="submit" value="Register" />
                <p className="field">
                    <span>If you already have profile click <Link to={Path.Login}>here</Link></span>
                </p>
            </form>
        </section>
    );
}