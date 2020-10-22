let hash = (string: string, max: Number) =>{
    let hash = 0;
    // Just telling our linter that this is a String
    if (typeof  string != 'string' || string.length === 0)
        return -1;
    for(let i = 0; i < string.length; i++){
        hash += string.charCodeAt(i);
    }
    return  hash % max;
}