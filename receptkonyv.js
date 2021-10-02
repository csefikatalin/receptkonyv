const receptek = [];
$(function () {

  let sorID = 0; //itt tárolom,hogy melyik kép van éppen soron
  //Ajax hívás és az adatok kiírása táblázatban
  let fajlnev="etelek.json";
  beolvas(fajlnev, receptek);

  //A tr tag-ekre rátesszük a kattintás eseménykezelőt

  function beolvas(fajlnev, tomb) {
    $.ajax({
      url: fajlnev,
      success: function (result) {
        tomb = result.receptkonyv;
        ajaxtablazat(tomb);
      },
    });
  }

  function ajaxtablazat(tomb) {
    /*táblázat létrehozása*/
    console.log(tomb);
    $("article").append("<table>");

    var txt =
      "<tr id='fejlec'><th>Név</th><th>Elkészítési idő</th><th>Kép</th><th>leírás</th><th>Hozzávalók</th></tr>";
      tomb.forEach(function(value, index){
        txt += "<tr id='" + index + "'>";
        for (let item in value) {
          txt += "<td>" + value[item] + "</td>";
        }
        txt += "</tr>";
      });
    $("article table").html(txt);
    $("tr").on("click",  etelKivalasztas);
    $("tr").hover(function () {
      $(this).toggleClass("hatter");
    });
  }

  function etelKivalasztas() {
    if ($(this).attr("id") === "fejlec") {
      rendezes();
    } else {
        console.log(receptek);
      sorID = Number($(this).attr("id"));
      console.log(sorID);
      console.log(receptek[sorID]);
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
});
