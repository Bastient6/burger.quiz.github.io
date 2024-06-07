var save = {
    mayo: 0,
    ketchup: 0,
    diapo: 0
};

var data = [];

init();

function init() {
    // Charger le fichier CSV par défaut
    loadDefaultCSV();
    // Ajouter l'événement pour le chargement de fichier via l'input
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

function loadDefaultCSV() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'exemples/evjf.csv', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            handleCSVData(xhr.responseText);
        }
    };
    xhr.send();
}

function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = function(event) {
        handleCSVData(event.target.result);
    };
    reader.readAsText(event.target.files[0]);
}

function handleCSVData(csv) {
    var lines = csv.split("\n");
    var result = [];
    for (var i = 0; i < lines.length; i++) {
        result.push(lines[i].split(";"));
    }
    data = result;
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('data', JSON.stringify(data));
    }
    save.diapo = 0;
    savevars();
    diapo();
}

if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem('save')) {
        save = JSON.parse(localStorage.getItem('save'));
    }
    if (localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'));
    }
}

function savevars() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('save', JSON.stringify(save));
    }
}

function reset() {
    save.mayo = 0;
    save.ketchup = 0;
    save.diapo = 0;
    savevars();
    refresh();
    diapo();
}

function refresh() {
    var txtmayo = (save.mayo < 10) ? "0" + save.mayo : save.mayo;
    document.getElementById("score-mayo").src = "img/score-" + txtmayo + ".jpg";
    document.getElementById("txt-mayo").innerHTML = txtmayo;
    var txtketchup = (save.ketchup < 10) ? "0" + save.ketchup : save.ketchup;
    document.getElementById("score-ketchup").src = "img/score-" + txtketchup + ".jpg";
    document.getElementById("txt-ketchup").innerHTML = txtketchup;
}

function diapo() {
    if (data.length === 0) {
        console.log("No data available.");
        return;
    }
    var i = save.diapo;
    document.getElementById("video-frame").style.display = "none";
    document.getElementById("reponse").style.display = "none";
    document.getElementById("reponses").style.display = "none";
    document.getElementById("image").style.display = "none";
    document.getElementById("menus").style.display = "none";
    document.getElementById("generique").pause();
    document.getElementById("generique").src = "";
    document.getElementById("menus").innerHTML = "";
    document.getElementById("img").src = "";
    
    if (data[i][0] == "V") {
        document.getElementById("generique").src = "videos/" + data[i][1] + ".mp4";
        document.getElementById("video-frame").style.display = "block";
    } else if (data[i][0] == "N") {
        document.getElementById("title").innerHTML = "NUGGETS";
        document.getElementById("question").innerHTML = data[i][1];
        document.getElementById("reponseA").innerHTML = data[i][2];
        document.getElementById("reponseB").innerHTML = data[i][3];
        document.getElementById("reponseC").innerHTML = data[i][4];
        document.getElementById("reponseD").innerHTML = data[i][5];
        document.getElementById("reponses").style.display = "block";
    } else if (data[i][0] == "S") {
        document.getElementById("title").innerHTML = "SEL OU POIVRE";
        document.getElementById("question").innerHTML = data[i][1];
        document.getElementById("reponse").innerHTML = data[i][2];
        document.getElementById("reponse").style.display = "block";
    } else if (data[i][0] == "I") {
        document.getElementById("title").innerHTML = data[i][1];
        document.getElementById("question").innerHTML = data[i][2];
        document.getElementById("img").src = data[i][3];
        document.getElementById("image").style.display = "block";
    } else if (data[i][0] == "M") {
        document.getElementById("title").innerHTML = "MENUS";
        document.getElementById("question").innerHTML = data[i][1];
        document.getElementById("reponse").innerHTML = data[i][2];
        document.getElementById("reponse").style.display = "block";
    } else if (data[i][0] == "A") {
        document.getElementById("title").innerHTML = "ADDITION";
        document.getElementById("question").innerHTML = data[i][1];
        document.getElementById("reponse").innerHTML = data[i][2];
        document.getElementById("reponse").style.display = "block";
    } else if (data[i][0] == "B") {
        document.getElementById("title").innerHTML = "BURGER DE LA MORT";
        document.getElementById("question").innerHTML = data[i][1];
    } else if (data[i][0] == "L") {
        document.getElementById("title").innerHTML = "MENUS";
        document.getElementById("question").innerHTML = "Les menus :";
        document.getElementById("menus").innerHTML = "<li>" + data[i][1] + "</li><li>" + data[i][2] + "</li><li>" + data[i][3] + "</li>";
        document.getElementById("menus").style.display = "block";
    }
}

function addmayo() {
    if (save.mayo < 25) {
        save.mayo++;
        var txtmayo = (save.mayo < 10) ? "0" + save.mayo : save.mayo;
        document.getElementById("score-mayo").src = "img/score-" + txtmayo + ".jpg";
        document.getElementById("txt-mayo").innerHTML = txtmayo;
        savevars();
    }
}

function submayo() {
    if (save.mayo > 0) {
        save.mayo--;
        var txtmayo = (save.mayo < 10) ? "0" + save.mayo : save.mayo;
        document.getElementById("score-mayo").src = "img/score-" + txtmayo + ".jpg";
        document.getElementById("txt-mayo").innerHTML = txtmayo;
        savevars();
    }
}

function addketchup() {
    if (save.ketchup < 25) {
        save.ketchup++;
        var txtketchup = (save.ketchup < 10) ? "0" + save.ketchup : save.ketchup;
        document.getElementById("score-ketchup").src = "img/score-" + txtketchup + ".jpg";
        document.getElementById("txt-ketchup").innerHTML = txtketchup;
        savevars();
    }
}

function subketchup() {
    if (save.ketchup > 0) {
        save.ketchup--;
        var txtketchup = (save.ketchup < 10) ? "0" + save.ketchup : save.ketchup;
        document.getElementById("score-ketchup").src = "img/score-" + txtketchup + ".jpg";
        document.getElementById("txt-ketchup").innerHTML = txtketchup;
        savevars();
    }
}

function prevdiapo() {
    if (save.diapo > 0) {
        save.diapo--;
        savevars();
        diapo();
    }
}

function nextdiapo() {
    if (save.diapo < data.length - 1) {
        save.diapo++;
        savevars();
        diapo();
    }
}

function gohelp() {
    window.open("help.html");
}

document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode == 37) {
        prevdiapo();
    } else if (event.keyCode == 39) {
        nextdiapo();
    }
});
