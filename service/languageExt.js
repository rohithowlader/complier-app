const languageExt = (language) =>{
    let extension="";
    language=language.toLowerCase();
    if(language==="node")
        return "js"
    else if(language==="c")
    return "c"
    else if(language==="cpp")
    return "cpp"
    else if(language==="python")
    return "py"
    

}
export default languageExt;