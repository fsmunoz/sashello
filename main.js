//document.getElementById('issueInputForm').addEventListener('submit', saveIssue);


function updateStatus() {
    $('#sb_endpoint').html(("EP: " + localStorage.getItem('endpoint')));
    $('#sb_code').html(("Code: " + localStorage.getItem('code')));    
    $('#sb_bearer').html(("Bearer: " + localStorage.getItem('bearer')));
    $('#sb_auth').html(("Authenticated: " + localStorage.getItem('authenticated')));    
    $('#sb_user').html(("User: " + localStorage.getItem('user')));    

}

function setEndpoint() {
    var endpoint = $('#endpoint').val();
    localStorage.setItem('endpoint', endpoint);
    updateStatus();
}

function fetchFolder_ () {
    let target = localStorage.getItem('endpoint') + "/folders";
    console.log("Target is " + target);

    fetch(target)
	.then(response => response.text())
	.then(text => console.log(text));

}
function fetch3() {
    var target = localStorage.getItem('endpoint') + "/folders";
    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
    console.log("Target is " + target);
    
    request.open('GET', target); // Open a new connection, using the GET request on the URL endpoint
    request.send();
    
    request.onload = async function () {
        var data = JSON.parse(this.response);
        $('output').html = data // depending on your response targert your desired property.
    }
}

function fetchFolder() {
    var target = localStorage.getItem('endpoint') + "/folders/rootFolders"
    var tks = 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbG9jYWxob3N0L1NBU0xvZ29uL3Rva2VuX2tleXMiLCJraWQiOiJsZWdhY3ktdG9rZW4ta2V5IiwidHlwIjoiSldUIn0.eyJqdGkiOiI3NGI0NGQxZDc2NWQ0MGU5OGIyYzk0YmQ3YTVhZGZjZCIsImV4dF9pZCI6InVpZD12aXlhX2FkbWluLG91PXBlb3BsZSxkYz1leGFtcGxlLGRjPWNvbSIsInJlbW90ZV9pcCI6IjUxLjEwNS4xMTQuMTYwIiwic3ViIjoiZDhiYmYwNDctZWEzZC00NDYxLTk3YjYtOGY2ZTIwNTU0MmEzIiwic2NvcGUiOlsiU0FTQWRtaW5pc3RyYXRvcnMiLCJvcGVuaWQiLCJhZG1pbnMiXSwiY2xpZW50X2lkIjoic2FzaGVsbG8iLCJjaWQiOiJzYXNoZWxsbyIsImF6cCI6InNhc2hlbGxvIiwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiJkOGJiZjA0Ny1lYTNkLTQ0NjEtOTdiNi04ZjZlMjA1NTQyYTMiLCJvcmlnaW4iOiJsZGFwIiwidXNlcl9uYW1lIjoidml5YV9hZG1pbiIsImVtYWlsIjoidml5YV9hZG1pbkBleGFtcGxlLmNvbSIsImF1dGhfdGltZSI6MTY0MDYzNDU0NSwicmV2X3NpZyI6Ijg2MTc4YzY1IiwiaWF0IjoxNjQwNjM0NTQ1LCJleHAiOjE2NDA2Nzc3NDQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QvU0FTTG9nb24vb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsib3BlbmlkIiwic2FzaGVsbG8iXX0.iaRrs8-rUsLgTewcg01-vPQf1eLcHHLYkoUPn78B235XsQzkJ4i04T3xs8iCTnKd853C6ehIs2e8mtbyAXdzsFQtLPPri1B1fLkQKzbniH9VbMphEUTMaHutNzTg8qhGBJYflZWhjFYC64PHrsB7ux4NGm8AUf5QUVirqFRe0XauRPYHP0_OOqkhwJlLVTJFWdHaC2UxVJmj2aW5rI98hZmvkMLb2230S28cSwBu6yiMolJPhzSAGWzkM4GJGHrYwk0OVEU6Oa0BFNp-sso_mGKoUT9thGmLurOyHrKyQsCpgxZlw1gS6D6zY9efQKNHFYf49f7N1iSqzhhsFT0fRQ';
    const headers = {
	'Accept':'application/vnd.sas.collection+json',
	'Authorization':tks
    };
    
    fetch(target,
	  {
	      method: 'GET',
	      headers: headers
	  })
	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    console.log(body);
	});
}

function putFolder() {
    var target = localStorage.getItem('endpoint') + "/folders/folders?parentFolderUri=none";
    console.log("Target is " + target);

    var tks = 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbG9jYWxob3N0L1NBU0xvZ29uL3Rva2VuX2tleXMiLCJraWQiOiJsZWdhY3ktdG9rZW4ta2V5IiwidHlwIjoiSldUIn0.eyJqdGkiOiI3NGI0NGQxZDc2NWQ0MGU5OGIyYzk0YmQ3YTVhZGZjZCIsImV4dF9pZCI6InVpZD12aXlhX2FkbWluLG91PXBlb3BsZSxkYz1leGFtcGxlLGRjPWNvbSIsInJlbW90ZV9pcCI6IjUxLjEwNS4xMTQuMTYwIiwic3ViIjoiZDhiYmYwNDctZWEzZC00NDYxLTk3YjYtOGY2ZTIwNTU0MmEzIiwic2NvcGUiOlsiU0FTQWRtaW5pc3RyYXRvcnMiLCJvcGVuaWQiLCJhZG1pbnMiXSwiY2xpZW50X2lkIjoic2FzaGVsbG8iLCJjaWQiOiJzYXNoZWxsbyIsImF6cCI6InNhc2hlbGxvIiwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiJkOGJiZjA0Ny1lYTNkLTQ0NjEtOTdiNi04ZjZlMjA1NTQyYTMiLCJvcmlnaW4iOiJsZGFwIiwidXNlcl9uYW1lIjoidml5YV9hZG1pbiIsImVtYWlsIjoidml5YV9hZG1pbkBleGFtcGxlLmNvbSIsImF1dGhfdGltZSI6MTY0MDYzNDU0NSwicmV2X3NpZyI6Ijg2MTc4YzY1IiwiaWF0IjoxNjQwNjM0NTQ1LCJleHAiOjE2NDA2Nzc3NDQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QvU0FTTG9nb24vb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsib3BlbmlkIiwic2FzaGVsbG8iXX0.iaRrs8-rUsLgTewcg01-vPQf1eLcHHLYkoUPn78B235XsQzkJ4i04T3xs8iCTnKd853C6ehIs2e8mtbyAXdzsFQtLPPri1B1fLkQKzbniH9VbMphEUTMaHutNzTg8qhGBJYflZWhjFYC64PHrsB7ux4NGm8AUf5QUVirqFRe0XauRPYHP0_OOqkhwJlLVTJFWdHaC2UxVJmj2aW5rI98hZmvkMLb2230S28cSwBu6yiMolJPhzSAGWzkM4GJGHrYwk0OVEU6Oa0BFNp-sso_mGKoUT9thGmLurOyHrKyQsCpgxZlw1gS6D6zY9efQKNHFYf49f7N1iSqzhhsFT0fRQ';    


    const inputBody =  '{"name": "Larch2"}' ;
    const headers = {
	'Content-Type':'application/vnd.sas.content.folder+json',
	'Accept':'application/vnd.sas.content.folder+json',
	'Authorization': tks	
    };
    
    fetch(target,
	  {
	      method: 'POST',
	      body: inputBody,
	      headers: headers
	  })
	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    console.log(body);
	});    
}

function getUser() {
    var target = localStorage.getItem('endpoint')  + "/identities/users/@currentUser"
    var tks = 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbG9jYWxob3N0L1NBU0xvZ29uL3Rva2VuX2tleXMiLCJraWQiOiJsZWdhY3ktdG9rZW4ta2V5IiwidHlwIjoiSldUIn0.eyJqdGkiOiI3NGI0NGQxZDc2NWQ0MGU5OGIyYzk0YmQ3YTVhZGZjZCIsImV4dF9pZCI6InVpZD12aXlhX2FkbWluLG91PXBlb3BsZSxkYz1leGFtcGxlLGRjPWNvbSIsInJlbW90ZV9pcCI6IjUxLjEwNS4xMTQuMTYwIiwic3ViIjoiZDhiYmYwNDctZWEzZC00NDYxLTk3YjYtOGY2ZTIwNTU0MmEzIiwic2NvcGUiOlsiU0FTQWRtaW5pc3RyYXRvcnMiLCJvcGVuaWQiLCJhZG1pbnMiXSwiY2xpZW50X2lkIjoic2FzaGVsbG8iLCJjaWQiOiJzYXNoZWxsbyIsImF6cCI6InNhc2hlbGxvIiwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiJkOGJiZjA0Ny1lYTNkLTQ0NjEtOTdiNi04ZjZlMjA1NTQyYTMiLCJvcmlnaW4iOiJsZGFwIiwidXNlcl9uYW1lIjoidml5YV9hZG1pbiIsImVtYWlsIjoidml5YV9hZG1pbkBleGFtcGxlLmNvbSIsImF1dGhfdGltZSI6MTY0MDYzNDU0NSwicmV2X3NpZyI6Ijg2MTc4YzY1IiwiaWF0IjoxNjQwNjM0NTQ1LCJleHAiOjE2NDA2Nzc3NDQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QvU0FTTG9nb24vb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsib3BlbmlkIiwic2FzaGVsbG8iXX0.iaRrs8-rUsLgTewcg01-vPQf1eLcHHLYkoUPn78B235XsQzkJ4i04T3xs8iCTnKd853C6ehIs2e8mtbyAXdzsFQtLPPri1B1fLkQKzbniH9VbMphEUTMaHutNzTg8qhGBJYflZWhjFYC64PHrsB7ux4NGm8AUf5QUVirqFRe0XauRPYHP0_OOqkhwJlLVTJFWdHaC2UxVJmj2aW5rI98hZmvkMLb2230S28cSwBu6yiMolJPhzSAGWzkM4GJGHrYwk0OVEU6Oa0BFNp-sso_mGKoUT9thGmLurOyHrKyQsCpgxZlw1gS6D6zY9efQKNHFYf49f7N1iSqzhhsFT0fRQ';
    const headers = {
	'Accept':'application/json',
	'Authorization':tks
    };
    
    fetch(target,
	  {
	      method: 'GET',
	      headers: headers
	  })
	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    console.log(body);
	});
}

function getCode () {
    // https://sas.viya4.gesal.org/SASLogon/oauth/authorize?client_id=sashello&response_type=code&callback=https://localho.st:8080/callback
    
    // https://sas.viya4.gesal.org/SASLogon/oauth/authorize?client_id=sashello2&response_type=code&redirect_uri=https://localho.st:8080/callback        
    var target = localStorage.getItem('endpoint') + "/SASLogon/oauth/authorize?client_id=" + localStorage.getItem('clientId') + "&response_type=code";
    console.log("Target is " + target);
    
    fetch(target,
	  {method: 'GET',
	   credentials: 'include'
	  })
    	.then(function(res) {
	    return res.json();
	}).then(function(body) {
	    console.log(body);
	});
}

function getToken () {


}

function setup () {
    localStorage.setItem('clientId', "sashello3");
    localStorage.setItem('clientPw', "Pass123");    
    //localStorage.setItem('code', "");
    //localStorage.setItem('bearer', "");
    //localStorage.setItem('user', "");
    //localStorage.setItem('authenticated', false);
    updateStatus();
}
