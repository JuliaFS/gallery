import './header.css';
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header className="example">
            <div>
            <h2><Link className="home" to="/">Art gallery</Link></h2>
            <nav>
                <Link to="/register-painter">Enter for painters</Link>
                <div id="painters">
                    <Link to="/register-painter">Register painter</Link>
                    <Link to="/create-picture">Create picture</Link>
                </div>
                <div id="user">
                    <Link to="/all-pictures">All pictures</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                <div id="guests">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
            </ div>
        </header>
    );
}