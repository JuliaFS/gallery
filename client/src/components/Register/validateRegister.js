
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
    // } else if(value["confirm-password"].length < 4){
    //     errors["confirm-password"]= 'Password must be at least 4 character long';
    // }else if(value["confirm-password"].length > 15){
    //     errors["confirm-password"] = 'Password can not exceed more than 15 characters';
    //}
    return errors;
}