const postData = async (url, data) => {
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: data
    });

    return await result.json();
};

const getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok){
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

export {postData};
export {getResource};
