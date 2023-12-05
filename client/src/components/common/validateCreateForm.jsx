export default function validate(value){
    const errors = {};
    //console.log('validate: ' + value);
   // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regex = /(https?:\/\/.*\.(?:png|jpg))/i;
    if(!value.title){
        errors.title = 'Title is required!';
    } else if(value.title.length > 50){
        errors.title = 'Title can not be more than 50 characters.';
    }

    if(!value.category){
        errors.category = 'Picture category is required!';
    } else if(value.category.length > 25){
        errors.category = 'Picture category can not be more than 25 characters.';
    }

    if(!value.painter){
        errors.painter = 'Painter name is required!';
    } else if(value.painter.length > 30){
        errors.painter = 'Painter name can not be more than 30 characters.';
    }
    if(!/[0-9]/.test(value.painterAge)){
        errors.painterAge = 'Age is required and must be a number!';
    } else if(Number(value.painterAge) > 30){
        errors.painterAge = 'Age can not be more than 75 years.';
    } else if(Number(value.painterAge) < 1){
        errors.painterAge = 'Age can not be less than 1 year.';
    }

    // if(!regex.test(value.imageUrl)){
    //     errors.imageUrl = 'Image Url is required or is not valid!';
    // } 

    if(!value.description){
        errors.description ='Description is required!'
    } else if(value.description.length > 300){
        errors.description = 'Description can not be more than 300 characters.'
    }

    return errors;
}