const { json } = require("express");

function login() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = json.parse(this.responseText);

            if (data[0].role === 1) {
                location.replace("http://localhost:8080/owner-dashboard.html");
            } else {
                location.replace("http://localhost:8080/walker-dashboard.html");
            }
            // Redirect
        }
    };

    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({email: document.getElementById('Lemail').value, password: document.getElementById('Lpassword').value}));
}