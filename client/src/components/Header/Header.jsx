import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import { Path } from '../../constants/constants';
import './header.css';

export default function Header(){
    const { 
        isAuthenticated, 
        username,
        email 
    } = useContext(AuthContext);
    return(
        <header>
            <div className="curve">
                <h1><Link className="home" to={Path.Home}>Art gallery</Link></h1>
            </div>
            <nav className="navigation">
                <div>
                    <Link to={Path.Home}>Home</Link>
                </div>
                <div>
                    <Link to={Path.Gallery}>Gallery</Link>
                </div>
                {isAuthenticated && (
                     <div className="user">
                        <Link to={Path.Logout}>Logout</Link>
                        <Link to={Path.CreatePicture}>Create picture</Link>
                    </div>
                )}
                {!isAuthenticated && (
                    <div className="guests">
                        <Link to={Path.Login}>Login</Link>
                        <Link to={Path.Register}>Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

