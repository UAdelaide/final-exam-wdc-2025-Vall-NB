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
            var data = JSON.parse(this.responseText);
            document.getElementById('dog_id').innerHTML = '';
            for (var i = 0; i < this.responseText.length; i++) {
                // For each dog add an option
                document.getElementById('dog_id').innerHTML += `<option value="${data[i].dog_id}">${data[i].name}</option>`;
            }
        }
    };

    // Get List of user's dogs via request
    xhttp.open("GET", "/userdogList", true);
    xhttp.send();
}
