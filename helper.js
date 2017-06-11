

var incTable=function(){
    
    var incidentList=[];
    var userName;
    
    var initialize= function (IncidentList,username){
        
		console.log('Username received '+username);
        userName=username;
        incidentList=IncidentList;
        
    };
    
	
	function getIncDetails(number){
		
		var ret="<p>NO work NOtes found</p>";
		
		incidentList.forEach(function (inc,index){
			//console.log(inc.number+"  number received: "+number);
				//console.log(inc.number+"  number received: "+number+"  comp "+ (number+""==inc.number+"") +((number.localeCompare(inc.number))==0));
			if((number.localeCompare(inc.number))==0)
			{
				console.log("returning value");
				ret="<p>"+inc.comments_and_work_notes.replace(/\n/g, "<br />");+"</p>";
			
				}
		});
		
		return ret;
		
		
		
	}
	
	function getListItem(inc){
		
		//console.log(inc);
		return '<li id="'+inc.number+'" class="w3-padding-8"><span class="w3-large">'+inc.number+'</span> | <span >'+inc.priority+'</span> | <span >'+inc.assignment_group+'</span><span style="float:right" class="w3-small">'+inc.sys_created_on+'</span><br><span>'+inc.short_description+'</span><br>'+
    '<span  class="w3-small">'+inc.assigned_to+'</span><span style="float:right" class="w3-small">Last update:'+inc.sys_updated_on+'</span></li>';
		
	}
	
	
	function getGroupIncidentList(){
		console.log("Get Group INC called "+incidentList.length);
        var list='<ul class="w3-ul w3-card-4">'
        
        incidentList.forEach(function (inc,index){
            
            if(inc.assigned_to!=userName)
                {
                    //add row for incident
                    list+=getListItem(inc);
                    //console.log("adding "+inc.number);
                    
                }
            
        });
        
        return list+="</ul>";  
        
		
		
	}
	
	
	
	function getMyIncidentList(){
		console.log("Get Group INC called "+incidentList.length);
        var noTicketsDiv=`<div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
  <p>There are no tickets assigned to you.</p>
</div>`;
		var tcount=0;
		var list='<ul class="w3-ul w3-card-4">'
        console.log("username outside "+this.userName);
        incidentList.forEach(function (inc,index){
            console.log(inc.assigned_to+"  "+userName);
            if(inc.assigned_to==userName)
                {  tcount++;
                    //add row for incident
                    list+=getListItem(inc);
                    //console.log("adding "+inc.number);
                    
                }
            
        });
        if(tcount>0)
        return list+="</ul>";  
		else
		return noTicketsDiv;
        
		
		
	}
    
	
	function getAssignedIncidentList(){
		console.log("Get Group INC called "+incidentList.length);
        var noTicketsDiv=`<div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
  <p>There are no tickets assigned </p>
</div>`;
		var tcount=0;
		var list='<ul class="w3-ul w3-card-4">'
        
        incidentList.forEach(function (inc,index){
            
            if(inc.assigned_to)
                {  tcount++;
                    //add row for incident
                    list+=getListItem(inc);
                    //console.log("adding "+inc.number);
                    
                }
            
        });
        if(tcount>0)
        return list+="</ul>";  
		else
		return noTicketsDiv;
        
		
		
	}
	
	
	function getUnAssignedIncidentList(){
		console.log("Get Group INC called "+incidentList.length);
        var noTicketsDiv=`<div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
  <p>There are no UnAssigned tickets  </p>
</div>`;
		var tcount=0;
		var list='<ul class="w3-ul w3-card-4">'
        
        incidentList.forEach(function (inc,index){
            
            if(!inc.assigned_to)
                {  tcount++;
                    //add row for incident
                    list+=getListItem(inc);
                    //console.log("adding "+inc.number);
                    
                }
            
        });
        if(tcount>0)
        return list+="</ul>";  
		else
		return noTicketsDiv;
        
		
		
	}
	
    function getRow(inc){
        
        
        return '<tr><td>'+ inc.number+'</td><td>'+ inc.short_description+'</td> <td>'+ inc.assignment_group +'</td><td>'+  inc.sys_created_on+'</td></tr>';
        
        
    }
    
    
    var getMyIncidentTable= function (){
        //function to generate HTML table
        
        var table='<table><tr><th>Number</th><th>Description</th><th>Group</th><th>Created</th></tr>'
        
        incidentList.forEach(function (inc,index){
            
            if(assigned_to==username)
                {
                    //add row for incident
                    table+=getRow(inc);
                    
                }
            
        });
        
        return table+="</table>";  
        
        
        
    };
    
    
    
    var getGroupIncidentTable= function (){
        //function to generate HTML table
        
        console.log("Get Group INC called "+incidentList.length);
        var table='<table><tr><th>Number</th><th>Description</th><th>Group</th><th>Created</th></tr>'
        
        incidentList.forEach(function (inc,index){
            
            if(inc.assigned_to!=username)
                {
                    //add row for incident
                    table+=getRow(inc);
                    console.log("adding "+inc.number);
                    
                }
            
        });
        
        return table+="</table>";  
        
        
        
    };
    
    
    var obj={
        'initialize':initialize,
        'getMyIncidentTable':getMyIncidentTable,
        'getGroupIncidentTable':getGroupIncidentTable,
		'getGroupIncidentList':getGroupIncidentList,
		'getMyIncidentList':getMyIncidentList,
		'getAssignedIncidentList':getAssignedIncidentList,
		'getUnAssignedIncidentList':getUnAssignedIncidentList,
		'getIncDetails':getIncDetails
        
        
        
    };
    
    
    
    
  
    
    return obj;
    
};




var myTable=incTable();
