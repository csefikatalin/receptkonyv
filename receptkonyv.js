var receptek = [];
var sorID = 0; //itt tárolom,hogy melyik kép van éppen soron

$(function () {
    //Ajax hívás és az adatok kiírása táblázatban
    beolvas();

    //A tr tag-ekre rátesszük a kattintás eseménykezelőt
});

function beolvas() {
    $.ajax({
        url: "etelek.json",
        success: function (result) {
            receptek = result.receptkonyv;
            ajaxtablazat();
        },
    });
}

function ajaxtablazat() {
    /*táblázat létrehozása*/
    console.log(receptek);
    $("article").append("<table>");

    var txt =
        "<tr id='fejlec'><th>Név</th><th>Elkészítési idő</th><th>Kép</th><th>leírás</th><th>Hozzávalók</th></tr>";
    for (var i = 0; i < receptek.length; i++) {
        txt += "<tr id='" + i + "'>";
        for (var item in receptek[i]) {
            txt += "<td>" + receptek[i][item] + "</td>";
        }
        txt += "</tr>";
    }
    $("article table").html(txt);
    $("tr").on("click", etelKivalasztas);
    $("tr").hover(function () {
        $(this).toggleClass("hatter");
    });
}

function etelKivalasztas() {
    if ($(this).attr("id") === "fejlec") {
        rendezes();
    } else {
        sorID = Number($(this).attr("id"));
        console.log(receptek[sorID].kep);
        megjelenit();
    }
}

function balra() {
    sorID = sorID - 1;
    if (sorID < 0) {
        sorID = receptek.length - 1;
    }

    megjelenit();
}
function jobbra() {
    sorID = sorID + 1;
    if (sorID > receptek.length - 1) {
        sorID = 0;
    }

    megjelenit();
}

function megjelenit() {
    $("#kep img").attr("src", receptek[sorID].kep);
}

function rendezes() {
    var mezo = "nev";
    receptek.sort(function (a, b) {
        merre = Number(b[mezo] > a[mezo]) - 0.5;

        return merre;
    });
    console.log(receptek);
}
