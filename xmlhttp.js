
//
function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

var xhr = new XMLHttpRequest();

xhr.open("GET", "https://hclad.service-now.com/incident_list.do?JSONv2&sysparm_query=u_business_service%3D08c1c37ae88451009ea659c0489b1316", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // WARNING! Might be evaluating an evil script!
    var resp = JSON.parse(xhr.responseText);
    alert("Working"+ xhr.responseText);

  }
}
console.log("Working Console")

xhr.setRequestHeader("Authorization", make_base_auth('aakash.sharma@adeccona.com' , '@Twin123'));
xhr.send();
