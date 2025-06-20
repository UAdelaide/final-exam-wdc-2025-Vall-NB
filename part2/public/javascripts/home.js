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

function tablegen(callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            document.getElementById('table-body').innerHTML = '';
            for (var i = 0; i < this.responseText.length; i++) {
                // Appends Row
                document.getElementById('table-body').innerHTML += `<tr> <td>${data[i].dog_name}</td><td>${data[i].owner_username}</td><td>${data[i].size}</td><td><img class="dogimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3HFVnkYFJ_OIogo__Qv58bmhwRqZJcQhOA&s" alt="${data[i].dog_name}">></td></tr>`;
                // Customises Image SRC for each row
                callback(i);
            }
        }
    };
    xhttp.open("GET", "/api/dogs", true);
    xhttp.send();
}

// Attatches image to a table row
function imggen(imagenum) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            document.getElementsByClassName('dogimg')[imagenum].src = data.message;
        }
    };
    // Gets random image
    xhttp.open("GET", "https://dog.ceo/api/breeds/image/random", true);
    xhttp.send();
}
