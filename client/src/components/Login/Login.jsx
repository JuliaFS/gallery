import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
    return (
        <section id="login-page">
            <form id="login" method="POST" >
                <h1>Login</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Sokka@gmail.com" />

                <label htmlFor="login-pass">Password:</label>
                <input type="password" id="login-password" placeholder="Enter your password..." />
                <input type="submit" value="Login" />
                <p>
                    <span>If you don't have profile click <Link to="/register">here</Link></span>
                </p>
            </form>
        </section>
    );
}
