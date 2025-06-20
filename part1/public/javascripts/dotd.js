function debut() {
        var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "") {
                //console.log(this.responseText)
                var data = JSON.parse(this.responseText);
                //var data = this.responseText;
                //console.log(data.results[Math.floor(Math.random()*1025)].name);
                var qmon = data.results[Math.floor(Math.random()*1025)].name;
                callback(qmon);
                callback2(qmon);
                callback3();
            }
        }

    };

    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0", true);
    xhttp.send();

}