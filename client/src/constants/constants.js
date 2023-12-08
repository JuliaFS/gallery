const Path = {
    Home: "/",
    Register: "/register",
    Login: "/login",
    Logout: "/logout",
    Gallery: "/gallery",
    CreatePicture: "/create-picture",
    Details: "/gallery/:pictureId",
    PictureEdit: "/gallery/:pictureId/edit",
    PictureDelete: "/gallery/:pictureId/delete",
    Error404Path: "*",
}

const Notifications ={
        CreateError: "You have to fill all fields!",
        Create: "Something wrong, you can not create picture. Pls try again later....",
        Voted: "Unsuccesfull vote, try again later...",
        EmptyComment: "You can not published empty comment.",
        CommentNotPublished: "Error during publish comment...",
        EditError: "Pls, fill all the fields correctly!",
        OnEditError: "Unsuccesfull edited!",
        CanNotGetImage: "Unsuccesfull loading the images...",
}

export {
    Path,
    Notifications
}