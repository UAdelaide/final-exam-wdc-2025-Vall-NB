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
            data = JSON.parse(this.responseText);
            document.getElementById('dog_id').innerHTML = '';

            for (var i = 0; i < this.responseText.length; i++) {
                document.getElementById('dog_id').innerHTML += '<option value="${}">Volvo</option>';
            }
        }
    };
    xhttp.open("GET", "/logout", true);
    xhttp.send();

}