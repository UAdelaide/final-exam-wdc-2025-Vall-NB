function logout() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            window.location.replace("http://localhost:8080/");
        }
    };
    xhttp.open("GET", "/logout", true);
    xhttp.send();
}

function optiongen() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('dog_id').innerHTML = '';
        }
    };
    xhttp.open("GET", "/logout", true);
    xhttp.send();

}