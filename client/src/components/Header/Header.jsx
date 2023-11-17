import './header.css';
import { Link } from 'react-router-dom';
import { paths } from '../../constants/constants';

export default function Header(){
    return(
        <header className="example">
            <div>
            <h2><Link className="home" to={paths.home}>Art gallery</Link></h2>
            <nav>
                <div id="user">
                    <Link to={paths.createPicture}>Create picture</Link>
                    <Link to={paths.gallery}>All pictures</Link>
                    <Link to={paths.logout}>Logout</Link>
                </div>
                <div id="guests">
                    <Link to={paths.login}>Login</Link>
                    <Link to={paths.register}>Register</Link>
                </div>
            </nav>
            </ div>
        </header>
    );
}