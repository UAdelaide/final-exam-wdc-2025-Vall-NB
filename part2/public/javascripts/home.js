//const { json } = require("express");

function login() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = json.parse(this.responseText);
            // Checks if dogwalker
            if (data[0].role === 1) {
                // Redirects page
                location.replace("http://localhost:8080/owner-dashboard.html");
            } else {
                location.replace("http://localhost:8080/walker-dashboard.html");
            }
        }
    };
    console.log(document.getElementById('Lemail').value);
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Gets email and password from index page
    var loginmail = document.getElementById('Lemail').value;
    xhttp.send(JSON.stringify({email: document.getElementById('Lemail').value, password: document.getElementById('Lpassword').value}));
}