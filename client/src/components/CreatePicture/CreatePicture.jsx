

export default function CreatePicture() {
    // <!-- const {onCreateGameSubmit} = useGameContext();
    // const { values, changeHandler, onSubmit } = useForm({
    //     title: '',
    //     category: '',
    //     maxLevel: '',
    //     imageUrl: '',
    //     summary: '',
    // }, onCreateGameSubmit); -->

    return (
        <section id="create-page" className="auth">
            <form id="create" method="post" >
                <div className="container">
                    <h1>Create Game</h1>

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
                </div>
            </form>
        </section>
    );
}