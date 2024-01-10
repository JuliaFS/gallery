# gallery
SoftUni React project

## :art: Project Introduction
This site is something like family gallery to store pictures and is a project created for the project defense of the React Softuni Course as part of the Front-End Module.
This project is an React App for my little painters - Elif i Meral.  

## Database
Using the Softuni Practice server to store data and display the data on the pages.

## Navigation
User are able to navigate through various links like:
* Home, 
* Gallery

## Functionality
The application contains two parts:
### Public part
* Guests can:
    - visit Home page
    - register: "/register"
    - login: "/login"
    - view all pictures: "/pictures"
    - view a single picture's details: "/gallery:pictureId"
    - view 404 page
### Private part (logged in users only)
* Logged users can  (if they are not the owner of that article):
    - create picture
    - view to comments for specific picture
    - create a new comment for each picture
    /- like specific picture /
* The owner of the picture can:
    - create new picture: "/pictures/create-picture"
    - edit existing articles: "/pictures/edit-picture/:pictureId",
    - delete existing picture by id
* Any logged in user can:
    - create new picture: "/pictures/create-picture"

## :hammer: Used technologies
* HTML
* CSS
* JavaScript 
* ReactJS
* [SoftUni practice server](https://github.com/softuni-practice-server/softuni-practice-server) as a backend solution

## How to start
 - start softuni practise server( navigate to server folder in terminal): node server.js
 - main folder for project = client (navigate to client falder in terminal): 
        npm install
        npm run dev
- firebase link: https://galeriq-guyndogan.web.app/
    - npm run build (to catch if have changes)
    - firebase deploy (add changes to firebase)


## Resources
* Use local image files
* Person images are my own pictures
* Pictures in gallery are my own (pictures of my little painters)
* The design is my own

