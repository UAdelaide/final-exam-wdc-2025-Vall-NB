function debut() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var message = JSON.parse(this.responseText);
            document.getElementById('dotd').src = this.responseText;
        }

    };

    xhttp.open("GET", " https://dog.ceo/dog-api/documentation/random", true);
    xhttp.send();

}