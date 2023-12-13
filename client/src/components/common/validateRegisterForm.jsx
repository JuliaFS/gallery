export default function validate(value){
    const errors = {};
    const curPassword = value.password;
    //console.log('validate: ' + value);
   // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!value.email){
        errors.email = 'Email is required!';
    } else if(!regex.test(value.email)){
        errors.email = 'This is not a valid email format';
    }

    if(!value.username){
        errors.username = 'Username is required!';
    } else if(value.username.length < 4){
        errors.username = 'Username must be at least 4 character long';
    }else if(value.username.length > 7){
        errors.username = 'Username can not exceed more than 7 characters';
    }

    if(!value.password){
        errors.password = 'Password is required!';
    } else if(value.password.length < 4){
        errors.password = 'Password must be at least 4 character long';
    }else if(value.password.length > 15){
        errors.password = 'Password can not exceed more than 15 characters';
    }
    
    if(!value["confirm-password"]){
        errors["confirm-password"] = 'Confirming password is required';
    } else if (curPassword !== value["confirm-password"]){
        errors["confirm-password"] = 'Password do not match';
    }
    return errors;
}
