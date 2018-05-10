function clearRegisterFields() {

     document.getElementById("userName").value = "";
     document.getElementById("email").value = "";
	 document.getElementById("password").value = "";
}

function clearLoginFields() {

     document.getElementById("emailLogin").value = "";
	 document.getElementById("passwordLogin").value = "";
}

function validateRegisterInput() {
	if( document.getElementById('userName').value.trim().length == 0 ){
		alert('The user name is a required field!');
		return false;
    }
	else if( document.getElementById('email').value.trim().length == 0 ){
		alert('The e-mail is a required field!');
		return false;
	}
	else if( document.getElementById('password').value.trim().length == 0 ){
		alert('The password is a required field!');
		return false;
	}
	else{
			var x = document.forms["addNewUser"]["Email"].value;
			var atpos = x.indexOf("@");
			var dotpos = x.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
				alert("Not a valid e-mail address");
				return false;
			}
		//register();
		$('#myModal').hide();
		$('.modal-backdrop').remove();
		return true;
	}
}
/*
function register() {
	alert('wslna register eh el 7alawa dy');
}*/

function validateLoginInput() {
	if( document.getElementById('emailLogin').value.trim().length == 0 ){
		alert('The e-mail is a required field!');
	}
	else if( document.getElementById('passwordLogin').value.trim().length == 0 ){
		alert('The password is a required field!');
	}
	else{
		var x = document.forms["loginAvailableUser"]["Email"].value;
		var atpos = x.indexOf("@");
		var dotpos = x.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
			alert("Not a valid e-mail address");
			return false;
		}
		validateInformation();
		$('#myModal').hide();
		$('.modal-backdrop').remove();
	}
}

function validateInformation() {
	alert('wslna validate 7alawetna w gamalna');
}