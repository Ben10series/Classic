const temporadas = {
  "1": {
    plataforma: "vimeo",
    videos: [
      "1078816581", "1078818189", "1078818699", "1078819081", "1078848454", "1078848947",
      "1078849262", "1078849503", "1078853780", "1078853990", "1078854221", "1078854983", "1078855267"
    ],
    nombres: [
      "Y fueron 10", "Aprendiendo a ser héroe", "El Krakken", "Visitando a los viejos", "Buscando el Omnitrix",
      "Trampa para turistas", "Copiando poderes", "La Alianza", "La Última risa", "La chica de la suerte",
      "Un pequeño problema", "Efectos secundarios", "Secretos"
    ]
  },
  "2": { plataforma: "pixeldrain", videos: [
      "https://pixeldrain.com/u/t11HeuFa", "https://pixeldrain.com/u/T95nihDD",
      "https://pixeldrain.com/u/mbrhF83i", "https://pixeldrain.com/u/yDrGfzjf",
      "https://pixeldrain.com/u/WrSWEbvd", "https://pixeldrain.com/u/nnJyvcab",
      "https://pixeldrain.com/u/wnQnF2h7", "https://pixeldrain.com/u/rG3TP47C",
      "https://pixeldrain.com/u/7fshP97R", "https://pixeldrain.com/u/dsAqPoEJ",
      "https://pixeldrain.com/u/YeUV4hGf", "https://pixeldrain.com/u/tgT6GUVZ", "https://pixeldrain.com/u/XNaAkHiu"
    ], nombres: [
      "La verdad", "Un nuevo héroe", "Kevin regresa", "Gwen 10", "Gladiadores", "Los Luchadores Galácticos", "El campamento del terror",
      "La mejor arma", "La suerte regresa", "El nuevo hotel", "El fantasma anda suelto", "Dr. Animo y el rayo mutante", "Los malos están de regreso"
    ]
  },
  "3": { plataforma: "pixeldrain", videos: [
      "https://pixeldrain.com/u/mUHcoR6A", "https://pixeldrain.com/u/JY7rcnwP",
      "https://pixeldrain.com/u/ekYzcRy8", "https://pixeldrain.com/u/2AjSxL98",
      "https://pixeldrain.com/u/3AUUhZsa", "https://pixeldrain.com/u/2BFmwTko",
      "https://pixeldrain.com/u/qzrJ6Zpt", "https://pixeldrain.com/u/FVjadKgL",
      "https://pixeldrain.com/u/vwAPa4Mo", "https://pixeldrain.com/u/4DKgo7vG",
      "https://pixeldrain.com/u/xsfGDgKz", "https://pixeldrain.com/u/Thq7MypP", "https://pixeldrain.com/u/5zaf2EDC"
    ], nombres: [
      "Ben 10.000", "Locura a la medianoche", "Cambio de cara", "Feliz Navidad", "Benlobo", "El juego terminó", "Super alianza de héroes alienígenas", "La momia mutante",
      "Los anormales", "El monstruo del clima", "El regreso (Parte 1)", "Miedo a la oscuridad (Parte 2)", "La visitante"
    ]
  },
  "4": { plataforma: "pixeldrain", videos: [
      "https://pixeldrain.com/u/5HN84ScX", "https://pixeldrain.com/u/vBLeryb6",
      "https://pixeldrain.com/u/Q8A8Ph3b", "https://pixeldrain.com/u/W6berPT9",
      "https://pixeldrain.com/u/UC3wgtAN", "https://pixeldrain.com/u/y7MepkS7",
      "https://pixeldrain.com/u/p5iFJLDM", "https://pixeldrain.com/u/QbwKy3GF",
      "https://pixeldrain.com/u/3hTepKM9", "https://pixeldrain.com/u/e36fXzg8"
    ], nombres: [
      "Un día perfecto", "Es hora de dividirnos", "No tomes el agua", "La gran boda alienígena",
      "Un viaje en carretera", "Listo para luchar", "Ken 10", "Ben 10 contra Los 10 Negativos (1)",
      "Ben 10 contra Los 10 Negativos (2)", "De regreso a casa"
    ]
  },
  "Peliculas": {
    plataforma: "pixeldrain",
    videos: [
      "https://pixeldrain.com/u/9U2fUG6h", "https://pixeldrain.com/u/sv5wbCqJ"
    ],
    nombres: [
      "Ben 10: El Secreto del Omnitrix", "Ben 10: Destrucción Alienígena"
    ]
  }
};

let temporadaActual = "1";
let capActual = 1;
let advertenciaPixeldrainMostrada = false;

const temporadaSelector = document.getElementById("temporada-selector");
const capituloSelector = document.getElementById("capitulo-selector");
const video = document.getElementById("video");
const loader = document.getElementById("loader");

function mostrarLoader() {
  loader.style.display = "block";
  video.style.display = "none";
}

function cargarTemporadas() {
  temporadaSelector.innerHTML = "";
  Object.keys(temporadas).forEach(temp => {
    const option = document.createElement("option");
    option.value = temp;
    option.textContent = temp === "Peliculas" ? "Peliculas" : `Temporada ${temp}`;
    temporadaSelector.appendChild(option);
  });
}

function cambiarTemporada(nombreTemporada) {
  temporadaActual = nombreTemporada;
  capActual = 1;
  cargarCapitulos();
  cargarCapitulo();
}

function cargarCapitulos() {
  capituloSelector.innerHTML = "";
  const { nombres } = temporadas[temporadaActual];
  nombres.forEach((nombre, i) => {
    const option = document.createElement("option");
    option.value = i + 1;
    option.textContent = nombre;
    capituloSelector.appendChild(option);
  });
}

function seleccionarCapitulo(numero) {
  capActual = parseInt(numero);
  localStorage.setItem("tiempoBen10", 0);
  cargarCapitulo();
}

function anteriorCapitulo() {
  if (capActual > 1) {
    capActual--;
    cargarCapitulo();
  }
}

function siguienteCapitulo() {
  const total = temporadas[temporadaActual].videos.length;
  if (capActual < total) {
    capActual++;
    cargarCapitulo();
  }
}

function guardarProgreso() {
  localStorage.setItem("capituloBen10", capActual);
  localStorage.setItem("temporadaBen10", temporadaActual);
}

function cargarCapitulo(inicioEn = 0) {
  mostrarLoader();

  const temporada = temporadas[temporadaActual];
  const videoID = temporada.videos[capActual - 1];
  let url = "";

  if (temporada.plataforma === "vimeo") {
    url = `https://player.vimeo.com/video/${videoID}?autoplay=1`;
    if (inicioEn > 0) {
      url += `#t=${Math.floor(inicioEn)}s`;
    }
  } else if (temporada.plataforma === "pixeldrain") {
    url = `https://pixeldrain.com/api/file/${videoID.split("/").pop()}?stream`;
    if (inicioEn > 0) {
      url += `#t=${Math.floor(inicioEn)}s`;
    }

    if (temporadaActual === "2" && !advertenciaPixeldrainMostrada) {
      alert("ATENCIÓN: Desde esta temporada no se guarda el tiempo de video, sólo el capítulo.");
      advertenciaPixeldrainMostrada = true;
    }
  }

  video.src = url;
  capituloSelector.value = capActual;
  guardarProgreso();

  setTimeout(() => {
    loader.style.display = "none";
    video.style.display = "block";
  }, 3000);

  // Escuchar tiempo en Vimeo
  if (temporada.plataforma === "vimeo") {
    const vimeoPlayer = new Vimeo.Player(video);

    vimeoPlayer.on('timeupdate', function(data) {
      localStorage.setItem("tiempoBen10", data.seconds);
    });
  }
}

function cargarProgreso() {
  const capGuardado = localStorage.getItem("capituloBen10");
  const tiempoGuardado = localStorage.getItem("tiempoBen10");
  const temporadaGuardada = localStorage.getItem("temporadaBen10");

  cargarTemporadas();

  if (temporadaGuardada && temporadas[temporadaGuardada]) {
    temporadaActual = temporadaGuardada;
  }
  temporadaSelector.value = temporadaActual;
  cargarCapitulos();

  if (capGuardado) {
    capActual = parseInt(capGuardado);

    const plataforma = temporadas[temporadaActual].plataforma;

    if (plataforma === "vimeo" && tiempoGuardado && parseFloat(tiempoGuardado) > 0) {
      const minutos = Math.floor(parseFloat(tiempoGuardado) / 60);
      const segundos = Math.floor(parseFloat(tiempoGuardado) % 60);
      const tiempoFormateado = `${minutos}:${segundos.toString().padStart(2, "0")}`;

      const mensaje = `Te quedaste en la temporada ${temporadaActual}, capítulo ${capActual} en el minuto ${tiempoFormateado}. ¿Querés reanudar?`;
      const volver = confirm(mensaje);

      if (volver) {
        cargarCapitulo(parseFloat(tiempoGuardado));
      } else {
        localStorage.setItem("tiempoBen10", 0);
        cargarCapitulo();
      }
    } else {
      cargarCapitulo();
    }
  } else {
    cargarCapitulo();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProgreso();
  temporadaSelector.addEventListener("change", (e) => cambiarTemporada(e.target.value));
  capituloSelector.addEventListener("change", (e) => seleccionarCapitulo(e.target.value));
  document.getElementById("anterior-btn").addEventListener("click", anteriorCapitulo);
  document.getElementById("siguiente-btn").addEventListener("click", siguienteCapitulo);
});