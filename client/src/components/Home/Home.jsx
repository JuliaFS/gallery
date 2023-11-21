import styles from './Home.module.css';

export default function Home() {
    return (
        <div>
            <div className={styles["image-rotate"]}>
                <img src="/images/lilium-72dpi.jpg"/>
                <img src="/images/minzuhari-72dpi.jpg"/>
                <img src="/images/test.png"/>
                <img src="/images/winter-72dpi.jpg"/>
                <img src="/images/lilium-72dpi.jpg"/>
            </div>

            <h3>title</h3>
            <div>
                <p>Some text here...</p>
            </div>
             <div>
                <a>Details</a>
                <button>Like</button>
            </div>
        </div>
    );
}

