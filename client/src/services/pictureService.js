const baseUrl = "http://localhost:3030/jsonstore";

export const getAll = async () => {
    
};


export const create = async (data) => {
    const response = await fetch(`${baseUrl}/pictures`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return result;
};