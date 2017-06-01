

var incTable=function(){
    
    var incidentList=[];
    var username;
    
    var initialize= function (IncidentList,username){
        
        username=username;
        incidentList=IncidentList;
        
    };
    
    
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
        'getGroupIncidentTable':getGroupIncidentTable
        
        
        
    };
    
    
    
    
  
    
    return obj;
    
};




var myTable=incTable();
