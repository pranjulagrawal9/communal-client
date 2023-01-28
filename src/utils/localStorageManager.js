const ACCESS_TOKEN_LOCAL_STORAGE_KEY= "access_token";

function getItem(key){
    return localStorage.getItem(key);
}

function setItem(key, value){
    localStorage.setItem(key, value);
}

function removeItem(key){
    localStorage.removeItem(key);
}


export {
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    getItem,
    setItem,
    removeItem
}