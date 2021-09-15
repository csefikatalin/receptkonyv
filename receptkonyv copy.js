//segédfüggvény
function $(nev) {
    return document.querySelectorAll(nev);
}
function ID(nev) {
    return document.getElementById(nev);
}

var receptek = [];

function kiir() {
    /*táblázat létrehozása*/
    var node = document.createElement("table");
    $("article")[0].appendChild(node);

    var txt = "<tr><th>Név</th><th>Elkészítési idő</th><th>Kép</th><th>leírás</th><th>Hozzávalók</th></tr>";
    for (var i = 0; i < receptek.length; i++) {
        txt += "<tr>";
        for (var item in receptek[i]) {

            txt += "<td>" + receptek[i][item] + "</td>";
        }
        txt += "</tr>";
    }
    $("article table")[0].innerHTML = txt;
}

function adatokfajlbol_szinkron() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "etelek.json", false);
    xhttp.send();
    receptek = JSON.parse(xhttp.responseText).receptkonyv;
    console.log(receptek);

}

function adatokfajlbol_aszinkron() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "etelek.json", false);
    xhttp.send();
    receptek = JSON.parse(xhttp.responseText).receptkonyv;
    console.log(receptek);

}

function adatok() {
//    adatok létrehozása és eltárolása egy tömbben

    var receptek = [
        {
            nev: "Somlói galuska",
            elkIdo: "60 perc",
            kep: "kepek/somloi.jpg",
            leiras: "Így kell elkészíteni a somlóit",
            hozzavalok: [
                {"liszt": "50 dkg"},
                {"tojas": "6 db"},
                {"csoki": "1 tábla"}
            ]
        },
        {
            nev: "Articsóka leves",
            elkIdo: "10 perc",
            kep: "kepek/articsokaleves.jpg",
            leiras: "Így kell elkészíteni az articsókát",
            hozzavalok: [
                {"articsóka": "1 db"},
                {"tejföl": "250 g"}
            ]
        },
        {
            nev: "Pörkölt",
            elkIdo: "35 perc",
            kep: "kepek/porkolt.jpg",
            leiras: "Így kell elkészíteni a pörköltöt",
            hozzavalok: [
                {"sertéscomb": "1 kg"},
                {"hagyma": "2 db"},
                {"paprika": "1 db"},
                {"paradicsom": "1 db"},
                {"pirospaprika": "1 kiskanál"}
            ]

        }
    ];
    receptek.push(etel);
    console.log(receptek);

}
function ment_localStorage() {
    //létrehozzuk a tárolót: 
    const tarolo = window.localStorage;

    console.log(" sorosítás előtt " + tarolo);
    /*tömb adatainak serializálása*/
    for (var i = 0; i < receptek.length; i++) {
        tarolo.setItem(receptek[i], JSON.stringify(receptek[i]));
    }




}
function csere(a, b) {

    var temp = {};
    for (var item in a) {
        temp[item] = a[item];
        a[item] = b[item];
        b[item] = temp[item];

    }

}

function  rendez_buborek() {
    console.log("buborékban " + receptek);
    var mezo = "nev";
    for (var i = receptek.length; i >= 0; i--) {
        for (var j = 0; j < i - 1; j++) {
            if (receptek[j][mezo] > receptek[j + 1][mezo]) {
                csere(receptek[j], receptek[j + 1]);

            }
        }

    }
    console.log("buborék után " + receptek);
}
function rendez_sort() {

    var mezo = "nev";
    receptek.sort(function (a, b) {
        merre = Number(b[mezo] < a[mezo]) - 0.5;

        return  merre;
    }
    );


//    console.log(kerdesek);
}

function kijelol() {
    this.classList.add("folotte");
}
function levesz() {
    this.classList.remove("folotte");
}
var sor = 0; //itt tárolom,hogy melyik kép van éppen soron
function kivalszt() {
    sor = this.rowIndex - 1;
    console.log(sor);
    megjelenit();

}
function balra() {
    sor = sor - 1;
    if (sor < 0) {
        sor = receptek.length - 1;
    }

    megjelenit();
}
function jobbra() {
    sor = sor + 1;
    if (sor > receptek.length - 1) {
        sor = 0;
    }

    megjelenit();
}
function megjelenit() {
    $("#kep img")[0].src = receptek[sor].kep;
    $("#kep  p")[0].innerHTML = "<H2>" + receptek[sor].nev + "</h2>";
    $("#kep  p")[0].innerHTML += "<H3>Hozzávalók</h3>" + "<ul>";
    console.log("akt revept hozzávalói " + JSON.stringify(receptek[sor].hozzavalok));

    for (var i = 0; i < receptek[sor].hozzavalok.length; i++) {


        console.log("Az objektum " + receptek[sor].hozzavalok[i]);
        for (var item in receptek[sor].hozzavalok[i]) {
            console.log("Az aktuális elem " + item);
            $("#kep  p")[0].innerHTML += "<li>" + item + ": " + receptek[sor].hozzavalok[i][item] + "</li>";
        }
        $("#kep  p")[0].innerHTML += "</ul>";
    }
    $("#kep  p")[0].innerHTML += "<H3>Étel elkészítése</h3>";
    $("#kep  p")[0].innerHTML += receptek[sor].leiras;
}

//init
function init() {
    //adatok();
    adatokfajlbol_szinkron();
//Rendezzük a táblázatot Az első oszlop szerint növékvő sorrendbe!
    rendez_buborek();
    //írjuk ki a tömb tartalmát egy táblázatba a article elemben
    kiir();
    //A sorok fölé vonszolva az egeret változzon meg a háttérszín és legyen a kurzor egy lefelé mutató nyíl. 
    for (var i = 1; i < $("article tr").length; i++) {
        $("article table tr")[i].addEventListener("mouseover", kijelol);
        $("article table tr")[i].addEventListener("click", kivalszt);
        $("article table tr ")[i].addEventListener("mouseout", levesz);
//  
    }
    $("#bal")[0].addEventListener("click", balra);
    $("#jobb")[0].addEventListener("click", jobbra);
}
window.addEventListener('load', init, false);
