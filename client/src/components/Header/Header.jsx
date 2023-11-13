export default function Header(){
    return(
        <header>
            <h2><a className="home" href="/">Арт Галерия</a></h2>
            <nav menu slide>
                <a href="#">Всички картини</a>
                <div id="user">
                    <a href="#">Всички картини</a>
                    <a href="">Изход</a>
                </div>
                <div id="guests">
                    <a href="#">Вход за художници</a>
                    <a href="/login">Вход</a>
                    <a href="/register">Регистрирай се</a>
                </div>
            </nav>
        </header>
    );
}