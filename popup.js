document.getElementById("loginButton").addEventListener("click", validation,false);

                    
function validation() {
 var isValid = true;
       var inp_frm =  document.getElementsByTagName("input");
    var in_usr = inp_frm[0] ;
    var in_pass =  inp_frm[1];

var username = in_usr.value;
var password = in_pass.value;
   
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://hclad.service-now.com/sys_user_has_role_list.do?JSONv2&displayvalue=true&sysparm_query=user.email="+username, true);
    
    
    xhr.onerror=function(){
        
        
                  showError("I am Sorry!....Some Error Occured !");
    
    }
     
    
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
 
      if(xhr.status==200){
          showError("You are Successfully Logged In");
          
              
          var data=JSON.parse(xhr.responseText);
          var userFullname=data.records[0].user;
          console.log("USer fullname "+ userFullname  +"   record"+data.records[0]);

          var userInfoObj={"username":userFullname,'email':username,'password':password  };
          chrome.storage.local.set({'UserInfo': userInfoObj});
          
      console.log("response header "+ JSON.stringify(xhr.response));
    var resp = JSON.parse(xhr.responseText);
   // console.log("Working"+ xhr.responseText);
  }
if(xhr.status==401){
    
          showError("Oops! Authentication Failure");
    
}

    
  }
}
console.log("Working"+ xhr.responseText);
xhr.setRequestHeader("Authorization", make_base_auth(username,password));
xhr.send();
    
}








function showError(error){
    
    document.getElementById("error").innerHTML=error;
    
}
  //--------------------------------------------------------  
    

 function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
      return "Basic " + hash;
    }  
    //AJAX Request for Valdiation
//---------------Storage (Check Logged IN)---------------------------
chrome.storage.local.get('UserInfo', function(result){
                         
    if (result.userInfo==null)
        {
            showError('Not Logged In');
        }
    else{
        
        console.log(result.userInfo);
        showError('You are Logged in');
      document.getElementById("content").style.display='none';
        document.getElementById("newdiv").style.display='block';
    }});

