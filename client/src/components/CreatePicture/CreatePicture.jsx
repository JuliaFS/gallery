import './create.css';

export default function CreatePicture() {
    const createPictureSubmitHandler = (e) => {
        e.preventDefault();

        const pictureData = Object.fromEntries(new FormData(e.currentTarget));
        console.log(pictureData)
    }

    return (
        <section id="create-page" className="auth">
            <form id="create" method="post" onSubmit={createPictureSubmitHandler} >
                    <h1>Create New Paint</h1>
                    <label htmlFor="title">Legendary title:</label>
                    <input  type="text" id="title" name="title" placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category..." />

                    <label htmlFor="painter">Painter:</label>
                    <input  type="text" id="painter" name="painter" placeholder="Enter painter..." />

                    <label htmlFor="picture-img">Picture:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" ></textarea>

                    <input type="submit" value="Create Picture" />
            </form>
        </section>
    );
}