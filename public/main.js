const url = "/api";
let mapa;
const bt = document.querySelector(".boton-puntuar");
const area = document.querySelector(".section-1-5-1");

let datos = {
  fetchDatos: async function () {
    const response = await fetch(url, {
      method: "GET",
    });

    const takeData = await response.json();
    dataShow(takeData);
  },
};

function dataShow(objectApi) {
  try {
    function mostrar() {
      newObject = {...objectApi}
      const { Latitud, Longitud, ubicacion } = newObject;
  
      despl(newObject);
      mapsFunction(Latitud, Longitud, ubicacion);
    }
    function comprometer() {
      for (let i = 0; i < 4; i++) {
        for_delay(i);
      }

      function for_delay(i) {
        setTimeout(() => {
          const dataLatitud = objectApi.Latitud;
          if (typeof dataLatitud === "undefined") {
            try {
              ("");
            } catch (error) {
              console.log("Err: " + error);
            }
          } else {
            mostrar();
          }
        }, 60000 * i);
      }
    }

    comprometer();
  } catch (error) {
    console.log(error);
  }
}

datos.fetchDatos();

const despl = (objectApi) => {
  const {
    Latitud,
    Longitud,
    fechaLocal,
    horaLocal,
    horaUtc,
    fechaUtc,
    magnitud,
    profunidad
  } = {...objectApi};

  const arrayData = [Latitud, Longitud, fechaLocal, horaLocal, horaUtc, fechaUtc, magnitud, profunidad]

  arrayData.map((el, index) => {
    document.querySelector('#el'+(index+1)).innerHTML = el;
  })


  };

function mapsFunction(lat, lon, ref) {
  mapa !== undefined && mapa.remove()
  mapa = L.map("map").setView([lat, lon], 9);

  mapa.createPane("labels");
  document.getElementsByClassName(
    "leaflet-control-attribution"
  )[0].style.display = "none";
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 11,
  }).addTo(mapa);
  L.marker([lat, lon, ref]).addTo(mapa).bindPopup(`${ref}`).openPopup();
}

area.setAttribute("style", " border-top: none; height: 0;");
area2 = document.querySelector(".section-1-5");

bt.addEventListener("mousedown", (e) => {
  if (e.target.id === "collapsed") {
    e.target.id = "expanded";
    e.target.style = "background-color: #DFDFDF; transition: .5s;";

    area2.setAttribute("style", "border-bottom: none;");

    area.setAttribute(
      "style",
      "display: flex; height: 10em; transition: .3s; border-bottom: solid 1px; border-top: solid 1px; justify-content: center; align-items: center;"
    );

    area.innerHTML = `<div class="div_interior"> <p>Próximamente...</p> </div>`;
    divinterior = document.querySelector(".div_interior");
    divinterior.setAttribute(
      "style",
      "display: flex; align-items: center; justify-content: center;"
    );
  } else {
    e.target.id = "collapsed";
    e.target.style = "background-color: buttonface; transition: .5s;";
    area.setAttribute(
      "style",
      "display: flex; border-left: none; border-right: none; height: 0; transition: .3s; border-bottom: none; border-top: none; justify-content: center;"
    );

    area2.setAttribute("style", "");
    area.innerHTML = "";
  }
});
