//const { json } = require("express");

function login() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = json.parse(this.responseText);
            // Checks if dogwalker
            if (data[0].role === 1) {
                // Redirects page
                window.location.href = ("http://localhost:8080/owner-dashboard.html");
            } else {
                window.location.href = ("http://localhost:8080/walker-dashboard.html");
            }
        }
    };
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Gets email and password from index page
    var loginmail = document.getElementById('Lemail').value;
    var loginpass = document.getElementById('Lpassword').value;

    xhttp.send(JSON.stringify({email: loginmail, password: loginpass}));
}

function tablegen() {
        var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            document.getElementById('dog_id').innerHTML = '';
            for (var i = 0; i < this.responseText.length; i++) {
                document.getElementById('dog_id').innerHTML += `<option value="${data[i].dog_id}">${data[i].name}</option>`;
            }
        }
    };
    xhttp.open("GET", "/userdogList", true);
    xhttp.send();

}