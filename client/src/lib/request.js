const buildOptions = (data) => {
    const options = {};

    if(data){
        options.body = JSON.stringify(data);
        options.header = {
            'content-type': 'application/json'
        }
    }
    return options;
}

export const request = async (method, url, data) => {
    const response = await fetch(url, {
        ...buildOptions(data),
        method,
    });

    // if(!response.ok){
    //     throw new Error('Problem with request. Pls try again.')
    // }

    const result = await response.json();
    
    return result;
};

//pravi se po analogiq za vsichki metodi, za da se izvikva s metoda - request.get(parametri)
//export const get = request.bind(null, 'GET')

// export const requestFactory = () => {
//     return {
//         get: requester.bind(null, 'GET'),
//         post: requester.bind(null, 'POST'),
//         put: requester.bind(null, 'PUT'),
//         patch: requester.bind(null, 'PATCH'),
//         delete: requester.bind(null, 'DELETE'),
//     }
// };