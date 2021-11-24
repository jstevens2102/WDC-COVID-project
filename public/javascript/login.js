function handleLogin() {
  let loginData = {
    email: document.getElementById('login-email').value,
    pass: document.getElementById('login-password').value
  };

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location = "/";
    } else if (this.readyState == 4 && this.status >= 400) {
      alert("Invalid email or password");
    }
  };

  request.open("POST", "/users/login", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(loginData));
}

let showLogin = true;
function toggleSignUp() {
  if (showLogin) {
    document.getElementById("inputs").style.display = "none";
    document.getElementById("signup-inputs").style.display = "block";
    showLogin = false;
  } else {
    document.getElementById("inputs").style.display = "block";
    document.getElementById("signup-inputs").style.display = "none";
    showLogin = true;
  }
}

function showPassword(checkboxID, passwordInputID) {
  var checkbox = document.getElementById(checkboxID);
  var passwordInput = document.getElementById(passwordInputID);
  if (checkbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

function handleSignup() {
  let signupData = {
    email: document.getElementById('signup-email').value,
    pass: document.getElementById('signup-password').value,
    confirmPass: document.getElementById('signup-password-confirm').value,
    firstName: document.getElementById('signup-firstname').value,
    lastName: document.getElementById('signup-lastname').value,
    contactNumber: document.getElementById('signup-contact-number').value,
    address: document.getElementById('signup-address').value
  };

  // validate signup details
  if (signupData.email == '' || signupData.pass === '' || signupData.firstName === '' || signupData.lastName === '') {
    document.getElementById('error-textbox').innerHTML = "<span class='required-field'>ERROR: Required field is empty</span>";
    return;
  }

  if (signupData.pass !== signupData.confirmPass) {
    document.getElementById('error-textbox').innerHTML = "<span class='required-field'>ERROR: Passwords do not match</span>";
    return;
  }

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('error-textbox').innerHTML = this.responseText;
      setTimeout(() => { window.location = '/login.html' }, 2000);
    } else if (this.readyState == 4 && this.status >= 400) {
      document.getElementById('error-textbox').innerHTML = this.responseText;
    }
  };

  request.open("POST", "/users/signup", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(signupData));

}