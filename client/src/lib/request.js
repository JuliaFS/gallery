export const request = async (method, url, data) => {
    const response = await fetch(url, {
        method,
    });

    // if(!response.ok){
    //     throw new Error('Problem with request. Pls try again.')
    // }

    const result = await response.json();
    return result;
};