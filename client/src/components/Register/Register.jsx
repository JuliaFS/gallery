import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
    return (
        <section id="register-page">
            <form id="register" method="post" >
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="maria@email.com"
                />

                <label htmlFor="pass">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="register-password"
                    placeholder="Enter password"
                />
                <label htmlFor="con-pass">Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    placeholder="Confirm password"
                />
                <input type="submit" value="Register" />
                <p className="field">
                    <span>If you already have profile click <Link to="/login">here</Link></span>
                </p>
            </form>
        </section>
    );
}