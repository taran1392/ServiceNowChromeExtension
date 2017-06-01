
var LOGGED_IN=false;
var USERINFO_KEY="UserInfo";
var UserInfo;

var KEY_INCIDENT="incidents";

chrome.storage.onChanged.addListener(function(changes, namespace) {
        
          var storageChange = changes[USERINFO_KEY];
        
            if(storageChange)
                {
                        LOGGED_IN=true;
  
                    UserInfo=storageChange.newValue
                        getUpdate();
                }else{
                    LOGGED_IN=false;
                    UserInfo=null;
                    
                    show('You have Signed Out from service now');
                    
                }
    
        console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      USERINFO_KEY,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        
      });


chrome.storage.local.get(USERINFO_KEY,function(value){
    
    console.log("LOgged in or not "+ value!=null);
    console.log("User value "+JSON.stringify(value));
    if(value.UserInfo!=null){
        
        UserInfo=value.UserInfo;
        LOGGED_IN=true;
        
        getUpdate();
        
    }
    
    
});


function show(text) {
    
    console.log("NOtifying");
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
    icon: '48.png',
    body: text
  });
}



var incidentList={}



 function make_base_auth(user, password) {
  var tok = user + ':' + password;
     
    console.log("Value received   "+ user +" pass "+password );
  var hash = btoa(tok);
      return "Basic " + hash;
    }  



function incExists(inc){
    for(i=0;i<incidentList.length;i++)
        {
            if(incidentList[i].number==inc.number)
                return i;
            
        }
    return -1;
    
    
    
}

//console.log("Value of obj "+JSON.stringify(obj));


//obj.getMyname();

var OptionPagePort;

console.log("Background script started");

chrome.runtime.onConnect.addListener(function(port) {
    
  console.assert(port.name == "backgroundScript");
   
  port.onMessage.addListener(function(msg) {
port.postMessage({msg:" Command received"});    
  
 var xhr = new XMLHttpRequest();
xhr.open("GET", "https://hclad.service-now.com/incident_list.do?JSONv2&sysparm_query=u_business_service%3D08c1c37ae88451009ea659c0489b1316", true);
      
      console.log("")
      
      xhr.setRequestHeader("Authorization",make_base_auth(UserInfo.email,UserInfo.password));
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // WARNING! Might be evaluating an evil script!
    var resp = eval("(" + xhr.responseText + ")");
    
      //console.log("request result "+xhr.responseText);
//      alert("request result "+xhr.responseText);
      
      
      //port.postMessage({data:xhr.responseText});
  }
}


show("command received");
//xhr.send();

 
  
  
  
  });
});


function getUpdate(){
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://hclad.service-now.com/incident_list.do?JSONv2&displayvalue=true&sysparm_query=assignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744^active=true", true);
      
      //xhr.setRequestHeader("Authorization","Basic VGFyYW5kZWVwLnNpbmdoQGFkZWNjb25hLmNvbTpBZGVjY29AMTIzNDU=")

 console.log("Basic auth header "+    make_base_auth(this.UserInfo.email,this.UserInfo.password));
    
      xhr.setRequestHeader("Authorization",make_base_auth(this.UserInfo.email,this.UserInfo.password));
    xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // WARNING! Might be evaluating an evil script!
//      port.postMessage({data:xhr.responseText});
      //var resp = eval("(" + xhr.responseText + ")");
    
      //console.log("request result "+xhr.responseText);
//      alert("request result "+xhr.responseText);
      
      
      if(xhr.status==401)
          {
              show("Please Sign in again..");
           //   return;
          }else{
      var list=JSON.parse(xhr.responseText);
      
      console.log("list has property ? "+list.hasOwnProperty("records"));
      list=list.records;
        //console.log(xhr.responseText);
      
      console.log("Length"+list.length);
      console.log(xhr.responseText.substr(0,40));
      
      for(j=0;j<list.length;j++){
          if(incExists(list[j])>0)
              {
          console.log("incexist "+list[j].number);
                  
                  
              }else{
                  
                  console.log("New  inc "+list[j].number);
          
                        show("New Tciket Update "+list[j].number);

                  //incidentList.push(list[i]);
                  
              }
      }
      
      
      
      
      incidentList=list;
              
              chrome.storage.local.set({"incidents":incidentList});
      
      
          }
  
  }
}
console.log("Get Udpdate");
xhr.send();
    
    
}















// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { 
      
      //show();
  
  }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
        if(LOGGED_IN){
            
            
      getUpdate();}
        else{
            console.log("User not logged in");
        }interval = 0;
    }
  }, 60000);
}







//getUpdate();

 show("background script running");

console.log("Background script started");