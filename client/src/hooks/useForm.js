import { useState } from "react"

export default function useForm(submitHandlers, initialValues ){
    const [values, setValues] = useState(initialValues);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        submitHandlers(values);
    }
    return {
        values,
        onChange,
        onSubmit
    }
}


// import { useState, useEffect } from 'react';

// export const useForm = (initialValues, onSubmitHandler) => {
//     const [values, setValues] = useState(initialValues);

//     const changeHandler = (e) => {
//         setValues(state => ({...state, [e.target.name]: e.target.value}));
//     };

//     const onSubmit = (e) => {
//         e.preventDefault();

//         onSubmitHandler(values);

//         setValues(initialValues);
//     };

//     const changeValues = (newValues) => {
//         // TODO: Validate newValues shape (like initialValues)
        
//         setValues(newValues);
//     };

//     return {
//         values,
//         changeHandler,
//         onSubmit,
//         changeValues,
//     };
// };