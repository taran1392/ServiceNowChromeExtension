document.getElementById("loginButton").addEventListener("click", validation,false);
document.getElementById("myTicketTab").addEventListener("click", showMyTickets,false);
document.getElementById("myGroupTicketTab").addEventListener("click", showMyGroupTickets,false);
document.getElementById("assignedTicketTab").addEventListener("click", showAssignedTickets,false);
document.getElementById("unAssignedTicketTab").addEventListener("click", showUnAssignedTickets,false);
//document.getElementsByTagName("li").addEventListener("click",showDetails,false);


$("#signout").click(function(){
	
	chrome.storage.local.remove('UserInfo',function(){
		
        document.getElementById("newdiv").style.display='none';
		
		document.getElementById("content").style.display='block';
		
	});
	
});

$('#searchInput').keyup(function(){
    //$("input").css("background-color", "pink");
	console.log("keyup");
	
	var filter=$(this).val();
	console.log("filer"+filter);
	
	$("li").each(function(i,e){
		console.log($(this).text());	
		
		var text=$(this).text();
		if(text.toLowerCase().search(filter.toLowerCase())>=0){
			
			e.style.display='block';
		}else{
			
			e.style.display='none';
		}
		
	});
});


$(document).on('click','li',function(e) {
	
	console.log("li clicked");
	console.log($(this).index());
	console.log('id '+$(this).attr('id'));
	$(".modalHeader").html($(this).attr('id')+" | WorkNotes");
	$("#modalContent").html(myTable.getIncDetails($(this).attr('id')));
	document.getElementById('modal').style.display='block';
});

$('.closebutton').on('click',function(e){
	
	
	
	document.getElementById('modal').style.display='none';
	
});
                  var myTable=incTable();
var KEY_INCIDENT="incidents";
var KEY_USERINFO="UserInfo";
var UserInfo;  
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
          document.getElementById("content").style.display='none';
        document.getElementById("newdiv").style.display='block';
		location.reload();
              
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
                     console.log(result);    
    if (result.UserInfo==null)
        {
            showError('Not Logged In');
			 document.getElementById("newdiv").style.display='none';
        }
    else{
		UserInfo=result.UserInfo;
        
        console.log(result.userInfo);
        showError('You are Logged in');
      document.getElementById("content").style.display='none';
        document.getElementById("newdiv").style.display='block';
    }});
	
	
	
	chrome.storage.local.get(KEY_INCIDENT,function(value){
    
    
    //console.log("Incidents "+ console.log(JSON.stringify(value)) );
    console.log(UserInfo);
          myTable.initialize(value.incidents,UserInfo.username);
		  console.log(value.incidents);
    
            document.getElementById("listDiv").innerHTML=myTable.getGroupIncidentList();
      
    
    
    
    
});





function showMyTickets(evt) {
  var i, x, tablinks;
  document.getElementById("listDiv").innerHTML=myTable.getMyIncidentList();
  
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  
  evt.currentTarget.className += " w3-red";
}


function showMyGroupTickets(evt) {
  var i, x, tablinks;
  document.getElementById("listDiv").innerHTML=myTable.getGroupIncidentList();
  
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  
  evt.currentTarget.className += " w3-red";
}
function showAssignedTickets(evt) {
  var i, x, tablinks;
  document.getElementById("listDiv").innerHTML=myTable.getAssignedIncidentList();
  
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  
  evt.currentTarget.className += " w3-red";
}
	
	function showUnAssignedTickets(evt) {
  var i, x, tablinks;
  document.getElementById("listDiv").innerHTML=myTable.getUnAssignedIncidentList();
  
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  
  evt.currentTarget.className += " w3-red";
}
	
	
	
	
		

