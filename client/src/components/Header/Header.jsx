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
            <nav className="more">
                <div>
                    <Link to={Path.Gallery}>Gallery</Link>
                </div>
                {isAuthenticated && (
                     <div className="user">
                        <Link to={Path.Logout}><span>{email} | </span>Logout</Link>
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

{/*<header className="example">
            <div>
            <h2><Link className="home" to={Path.Home}>Art gallery</Link></h2>
            <nav>
                <Link to={Path.Gallery}>Gallery</Link>
                {isAuthenticated && (
                     <div id="user">
                     <Link to={Path.CreatePicture}>Create picture</Link>
                     <Link to={Path.Logout}><span>{email} | </span>Logout</Link>
                 </div>
                )}
                {!isAuthenticated && (
                <div id="guests">
                    <Link to={Path.Login}>Login</Link>
                    <Link to={Path.Register}>Register</Link>
                </div>
                )}
            </nav>
            </ div>
        </header>*/}