import './picturesList.css';

export default function PicturesList(){
    return(
        <section>
            <div className="gallery">
                <h2>Best Lilies</h2>
                <img src="../public/images/lilium-72dpi.jpg" />
                <p>Details</p>
            </ div>
            <div className="gallery"> 
                <h2>Best Lilies 1</h2>
                <img src="../public/images/lilium-72dpi.jpg" />
                <p>Details 11111</p>
            </ div>
        </section>   
    );
}