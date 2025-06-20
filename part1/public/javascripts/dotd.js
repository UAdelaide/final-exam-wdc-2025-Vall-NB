function debut() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('')
        }

    };

    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0", true);
    xhttp.send();

}