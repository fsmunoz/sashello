"use strict";

function updateStatus() {
    document.getElementById("sb_endpoint").innerHTML=("EP: " + localStorage.getItem("endpoint"));     
    document.getElementById("sb_code").innerHTML=("Code: " + localStorage.getItem('code'));
    document.getElementById("sb_auth").innerHTML=("Authenticated: " + localStorage.getItem('authenticated'));
    document.getElementById("sb_user").innerHTML=("User: " + localStorage.getItem('user'));
}

function showOutput(out) {
    console.log(out);
    document.getElementById("output").textContent=JSON.stringify(out, null, 2);

}
function setEndpoint() {
    var endpoint = $('#endpoint').val();
    localStorage.setItem('endpoint', endpoint);
    showOutput("Endpoint set to " + endpoint);
    updateStatus();
}

function fetchFolder() {
    var target = localStorage.getItem('endpoint') + "/folders/rootFolders";
    var tks = 'Bearer ' + localStorage.getItem('accessToken');

    const headers = {
	'Accept':'application/vnd.sas.collection+json',
	'Authorization':tks
    };

    console.log("Target is " + target);
    
    fetch(target,
	  {
	      method: 'GET',
	      headers: headers
	  })
	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    showOutput(body);
	});
}

function putFolder() {
    var target = localStorage.getItem('endpoint') + "/folders/folders?parentFolderUri=none";
    var tks = 'Bearer ' + localStorage.getItem('accessToken');

    const inputBody =  '{"name": "Larch2"}' ;
    const headers = {
	'Content-Type':'application/vnd.sas.content.folder+json',
	'Accept':'application/vnd.sas.content.folder+json',
	'Authorization': tks	
    };

    console.log("Target is " + target);    
    
    fetch(target,
	  {
	      method: 'POST',
	      body: inputBody,
	      headers: headers
	  })
	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    showOutput(body);
	});    
}

async function getUser() {
    var target = localStorage.getItem('endpoint')  + "/identities/users/@currentUser"    
    var tks = 'Bearer ' + localStorage.getItem('accessToken');    
    const headers = {
	'Accept':'application/json',
	'Authorization':tks
    };
    
    await fetch(target,
		{
		    method: 'GET',
		    headers: headers
		})
	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    showOutput(body);
	    localStorage.setItem('user', body.id);
	    updateStatus();
	});

}

function getCode() {
    var target = localStorage.getItem('endpoint') + "/SASLogon/oauth/authorize?client_id=" + localStorage.getItem('clientId') + "&response_type=code";
    console.log("Target is " + target);
    var jQueryObject;
    return fetch(target,
		 {method: 'GET',
		 })
	.then(response => response.text())
	.then(data => { 
	    jQueryObject = $.parseHTML(data);
	    localStorage.setItem('code', $(jQueryObject).find('h4').html());	    
	    console.log(localStorage.getItem('code'));
	    if (localStorage.getItem('code').includes("UAA")) {
		showOutput("Not authenticated in SAS")
		return false;
	    } else {
		return true;
	    }})
}

function getToken() {
    var target = localStorage.getItem('endpoint') + "/SASLogon/oauth/token";
    const inputBody = new URLSearchParams({
	grant_type: "authorization_code",
	code: localStorage.getItem('code')
    });
    
    const headers = {
	'Content-Type':'application/x-www-form-urlencoded',
	'Accept':'application/json',
	'Authorization': 'Basic ' + btoa(localStorage.getItem('clientId') + ":" + localStorage.getItem('clientPw')),
	"grant_type": "authorization_code",	
    };
    
    return fetch(target,
		 {
		     method: 'POST',
		     body: inputBody,
		     headers: headers
		 })
	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    console.log(body.access_token);
	    localStorage.setItem('accessToken', body.access_token);
	    localStorage.setItem('refreshToken', body.refresh_token);	    
	});        
}

async function auth() {
    var authenticated = await getCode();
    if (authenticated) {
	console.log("Authenticated in SAS, getting token using code " + localStorage.getItem("code"));
	localStorage.setItem('authenticated', true);
	await getToken();
    } else {
	localStorage.setItem('authenticated', false);
	localStorage.setItem('user', "");
	console.log("Not authenticated in SAS, return of getCode() was " + authenticated);
    }
    updateStatus;
}

function sasLogin() {
    var target = localStorage.getItem('endpoint') + "/SASLogon/login";
    console.log("Target is " + target);
    window.open(target, "_blank");
    
}

function setup () {
    localStorage.setItem('clientId', "sashello7");
    localStorage.setItem('clientPw', "Pass123");    
    //localStorage.setItem('code', "");
    //localStorage.setItem('accessToken', "");
    //localStorage.setItem('user', "");
    //localStorage.setItem('authenticated', false);
    updateStatus();
}
