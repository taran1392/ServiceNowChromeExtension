




var myTable=incTable();
var KEY_INCIDENT="incidents";
var KEY_USERINFO="UserInfo";
var UserInfo;



chrome.storage.local.get(KEY_USERINFO,function(value){
    
    
    UserInfo=value.UserInfo;
    console.log("UserInfo "+JSON.stringify(UserInfo));

        //myTable.initialize(storageChange.newValue.incidents,UserInfo.username);
    
//            document.getElementById("myIncidentDiv").innerHTML=myTable.getMyIncidentTable();
    
    
    
});


chrome.storage.local.get(KEY_INCIDENT,function(value){
    
    
    //console.log("Incidents "+ console.log(JSON.stringify(value)) );
    
          myTable.initialize(value.incidents,UserInfo.username);
    
            document.getElementById("myIncidentDiv").innerHTML=myTable.getGroupIncidentTable();
      
    
    
    
    
});



chrome.storage.onChanged.addListener(function(changes, namespace) {
        
    //var storageChangeUser=changes[KEY_USERINFO];
    
    //console.log("UserINfo "+ JSON.stringify( storageChangeUser.newValue));
    //UserInfo= storageChangeUser.newValue;

              var storageChange = changes[KEY_INCIDENT];
    console.log("Storage change "+JSON.stringify(storageChange.newValue));

    if(UserInfo.email){
    
          var storageChange = changes[KEY_INCIDENT];
            
            myTable.initialize(storageChange.newValue,UserInfo.username);
    
            document.getElementById("myIncidentDiv").innerHTML=myTable.getGroupIncidentTable();
    
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
    }
      });





console.log("index hey");
var input_fields=document.getElementsByTagName("input");


console.log("count of inur "+input_fields.length);
for(i=0;i<input_fields.length;i++)
	if(input_fields[i].addEventListener)
		input_fields[i].addEventListener("keyup",filter,false);
	else
		{input_fields[i].attachEvent("onkeyup",filter);
			
		}
		function filter(e){
		
		e = e || window.event;
		var target = e.target || e.srcElement;
	
var index;
for(i=0;i<input_fields.length;i++)
	if(input_fields[i]==target)
		index=i;
		
var rows=document.getElementsByTagName("tr");

for(i=1;i<rows.length;i++)
	{	
var c=	rows[i].innerHTML.toLowerCase().search(target.value.toLowerCase())>=0;
		console.log (i+ " contain "+ c);
	if(rows[i].innerHTML.toLowerCase().search(target.value.toLowerCase())>=0)
			rows[i].style.display="table-row";
			else
			{rows[i].style.display="none";
	console.log("comp"+rows[i].cells[index].innerHTML);		
	}
	
	
	}


}	






