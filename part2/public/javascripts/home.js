function login() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

        }
    };

    xhttp.open("POST", "/actrmv", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({username:sacrifice}));
}