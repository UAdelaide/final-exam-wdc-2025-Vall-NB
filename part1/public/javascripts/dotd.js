function debut() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            document.getElementById('dotd').src = res.message;
        }
    };

    xhttp.open("GET", "  https://dog.ceo/api/breeds/image/random", true);
    xhttp.send();
}
