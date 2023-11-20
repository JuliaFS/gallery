import './header.css';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/constants';

export default function Header(){
    return(
        <header className="example">
            <div>
            <h2><Link className="home" to={Path.Home}>Art gallery</Link></h2>
            <nav>
                <div id="user">
                    <Link to={Path.CreatePicture}>Create picture</Link>
                    <Link to={Path.Gallery}>All pictures</Link>
                    <Link to={Path.Logout}>Logout</Link>
                </div>
                <div id="guests">
                    <Link to={Path.Login}>Login</Link>
                    <Link to={Path.Register}>Register</Link>
                </div>
            </nav>
            </ div>
        </header>
    );
}