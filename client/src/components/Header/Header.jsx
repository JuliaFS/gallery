export default function Header(){
    return(
        <header className="example">
            <div>
            <h2><a className="home" href="/">Art gallery</a></h2>
            <nav className="navi1">
                <a className="sm1" href="#">Register painter</a>
                <div id="user">
                    <a className="sm2" href="#">All pictures</a>
                    <a  className="sm3" href="#">Logout</a>
                </div>
                <div id="guests">
                    <a className="sm4" href="/login">Login</a>
                    <a className="sm5" href="/register">Register</a>
                </div>
            </nav>
            </ div>
        </header>
    );
}