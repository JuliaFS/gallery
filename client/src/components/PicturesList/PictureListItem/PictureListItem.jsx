export default function PictureListItem({
    title,
    imageUrl,
    description
}){
    return(
        <div className="gallery">
            <h2>{title}</h2>
            <img src={imageUrl} />
            <p>Details: {description}</p>
        </ div>
    );
}