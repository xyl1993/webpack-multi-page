export const getElementsByClass = (classnames)=>{  
    var classobj = [];  
    var classint = 0;  
    var tags =document.getElementsByTagName("*");  
    for(var i in tags){  
    if(tags[i].nodeType == 1){  
        if(tags[i].getAttribute("class") == classnames){  
        classobj[classint] = tags[i];  
            classint++;  
        }  
        }  
    }  
    return classobj;  
}  