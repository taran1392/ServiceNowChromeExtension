 
//signout


var KEY_USERINFO="UserInfo";
var UserInfo;

document.getElementById("buttonSign").addEventListener("click", signOut);

function signOut(){
   

    chrome.storage.local.remove(KEY_USERINFO,function(v){
        
             console.log("Logged out...");
            console.log("value returned "+v);
        
        
        
    });
    
    
    

    
}