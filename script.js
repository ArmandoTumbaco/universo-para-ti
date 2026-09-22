
"use strict";

/* Configuración de la experiencia */

const CONFIG = {

    nombre: "Daira",

    tituloPagina: "Un universo para ti",

    subtituloPagina:
        "UN LUGAR QUE SOLO EXISTE CONTIGO",

    volumenMusica: 0.4,

    mensajesFlores: [

        "Eres especial para mí.",

        "Tu sonrisa ilumina mis días.",

        "Me encanta compartir momentos contigo.",

        "Contigo todo es más bonito.",

        "Siempre te elegiría.",

        "Cada momento contigo es especial.",

        "Me haces muy feliz.",

        "Eres una persona maravillosa.",

        "Mi lugar favorito siempre será contigo."

    ],

    escenas: [

        {
            etiqueta: "ENTRE MILLONES DE ESTRELLAS",

            titulo: "{nombre}...",

            descripcion:
                "Encontré algo en el universo que quería mostrarte.",

            modo: "estrella",

            pie: "LA NOCHE"
        },

        {
            etiqueta: "01 · LAS ESTRELLAS",

            titulo:
                "Dicen que hay millones de estrellas...",

            descripcion:
                "Cada una tiene su propia luz y su propio lugar en el universo.",

            modo: "corazon",

            pie: "LAS ESTRELLAS"
        },

        {
            etiqueta: "02 · UNA ESTRELLA ESPECIAL",

            titulo:
                "Mi estrella favorita siempre serás tú, {nombre}.",

            descripcion:
                "Porque hay luces que simplemente no se pueden comparar.",

            modo: "corazon",

            pie: "MI ESTRELLA FAVORITA"
        },

        {
            etiqueta: "03 · UN PEQUEÑO UNIVERSO",

            titulo:
                "Entonces entendí algo...",

            descripcion:
                "Que los lugares más bonitos no siempre están en el cielo.",

            modo: "planeta",

            flores: 1,

            pie: "UN PEQUEÑO PLANETA"
        },

        {
            etiqueta: "04 · UN LUGAR ESPECIAL",

            titulo:
                "No importa cuántos lugares existan...",

            descripcion:
                "Siempre habrá uno que tenga algo diferente a todos los demás.",

            modo: "planeta",

            flores: 4,

            pie: "UN LUGAR ESPECIAL"
        },

        {
            etiqueta: "05 · UNAS FLORES PARA TI",

            titulo:
                "Siempre elegiría aquel donde estás tú.",

            descripcion:
                "Porque hasta el universo más pequeño puede convertirse en un lugar extraordinario.",

            modo: "planeta",

            flores: 9,

            floresInteractivas: true,

            pie: "TOCA UNA FLOR"
        },

        {
            etiqueta: "06 · ENTRE TODAS ELLAS",

            titulo:
                "Pero entre todas ellas...",

            descripcion:
                "Siempre elegiría una.",

            modo: "planeta",

            flores: 9,

            elegirFlorCentral: true,

            pie: "ELIGE UNA FLOR"
        },

        {
            etiqueta: "07 · MI LUGAR FAVORITO",

            titulo: "Tú.",

            descripcion:
                "Porque incluso en un universo infinito, seguirías siendo mi lugar favorito, {nombre}.",

            modo: "planeta",

            flores: 9,

            pie: "MI LUGAR FAVORITO"
        }

    ]

};

/* Referencias a los elementos HTML */

const scene = document.getElementById("scene");

const sceneLabel = document.getElementById("sceneLabel");

const sceneTitle = document.getElementById("sceneTitle");

const sceneDescription =
    document.getElementById("sceneDescription");

const flowerMessage =
    document.getElementById("flowerMessage");

const mainStar = document.getElementById("mainStar");

const constellation =
    document.getElementById("constellation");

const heartStars =
    document.getElementById("heartStars");

const heartPath =
    document.getElementById("heartPath");

const planetSystem =
    document.getElementById("planetSystem");

const flowersContainer =
    document.getElementById("flowers");

const nextButton =
    document.getElementById("nextButton");

const backButton =
    document.getElementById("backButton");

const sceneCounter =
    document.getElementById("sceneCounter");

const sceneFooter =
    document.getElementById("sceneFooter");

const progressBar =
    document.getElementById("progressBar");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

/* Estado de navegación */

let escenaActual = 0;

let cambiandoEscena = false;

let florCentralSeleccionada = false;

let temporizadorFlor = null;

let temporizadorFoto = null;

const totalEscenas = CONFIG.escenas.length;

/* Personalización de textos */

function personalizarTexto(texto) {

    return texto.replaceAll(
        "{nombre}",
        CONFIG.nombre
    );

}

/* Configuración inicial */

function configurarPagina() {

    document.title = CONFIG.tituloPagina;

    document.querySelector(
        ".header-title"
    ).textContent =
        CONFIG.tituloPagina.toUpperCase();

    document.querySelector(
        ".header-subtitle"
    ).textContent =
        CONFIG.subtituloPagina;

}

/* Corazón de estrellas */

function crearCorazon() {

    const svgNS = "http://www.w3.org/2000/svg";

    heartStars.replaceChildren();

    /*
     * Las estrellas se colocan directamente
     * sobre el recorrido real del corazón.
     */

    const largo = heartPath.getTotalLength();

    const totalEstrellas = 18;

    for (let i = 0; i < totalEstrellas; i++) {

        const distancia =
            (largo * i) / totalEstrellas;

        const punto =
            heartPath.getPointAtLength(distancia);

        const estrella =
            document.createElementNS(
                svgNS,
                "circle"
            );

        estrella.setAttribute(
            "cx",
            punto.x
        );

        estrella.setAttribute(
            "cy",
            punto.y
        );

        estrella.setAttribute(
            "r",
            i % 3 === 0 ? 2.2 : 1.3
        );

        estrella.style.animationDelay =
            `${i * 100}ms`;

        heartStars.appendChild(estrella);

    }

}

/* Animación del corazón completo */

function reiniciarCorazon() {

    clearTimeout(temporizadorFoto);

    temporizadorFoto = null;

    constellation.classList.remove(
        "visible",
        "photo-visible"
    );

    heartPath.style.animation = "none";

    const largo = heartPath.getTotalLength();

    /*
     * Un pequeño margen adicional garantiza
     * que la línea comience completamente oculta.
     */

    const recorrido = largo + 2;

    heartPath.style.setProperty(
        "--heart-length",
        `${recorrido}`
    );

    heartPath.style.strokeDasharray =
        `${recorrido}`;

    heartPath.style.strokeDashoffset =
        `${recorrido}`;

    void heartPath.getBoundingClientRect();

    heartPath.style.animation = "";

    constellation.classList.add("visible");

    /*
     * Mostrar la fotografía después
     * de dibujar el corazón.
     */

    temporizadorFoto = setTimeout(() => {

        constellation.classList.add(
            "photo-visible"
        );

        temporizadorFoto = null;

    }, 2800);

}

/* Posiciones de las flores */

const posicionesFlores = [

    {
        x: 14,
        altura: 72,
        giro: -24
    },

    {
        x: 25,
        altura: 83,
        giro: -16
    },

    {
        x: 36,
        altura: 76,
        giro: -10
    },

    {
        x: 63,
        altura: 78,
        giro: 12
    },

    {
        x: 50,
        altura: 103,
        giro: 0,
        central: true
    },

    {
        x: 76,
        altura: 85,
        giro: 18
    },

    {
        x: 87,
        altura: 69,
        giro: 26
    },

    {
        x: 42,
        altura: 72,
        giro: -5
    },

    {
        x: 58,
        altura: 73,
        giro: 7
    }

];

/* Crear flores del planeta */

function crearFlores(cantidad, opciones = {}) {

    flowersContainer.replaceChildren();

    const total = Math.min(
        cantidad,
        posicionesFlores.length
    );

    const interactivas =
        opciones.interactivas === true;

    const elegirCentro =
        opciones.elegirCentro === true;

    for (let i = 0; i < total; i++) {

        const posicion = posicionesFlores[i];

        const flor = document.createElement("button");

        flor.type = "button";

        flor.className = "flower";

        flor.dataset.index = String(i);

        flor.dataset.center =
            posicion.central ? "true" : "false";

        flor.style.left = `${posicion.x}%`;

        flor.style.setProperty(
            "--flower-height",
            `${posicion.altura}px`
        );

        flor.style.setProperty(
            "--flower-rotation",
            `${posicion.giro}deg`
        );

        flor.style.setProperty(
            "--flower-delay",
            `${i * 90}ms`
        );

        flor.style.zIndex =
            posicion.central ? "20" : String(i + 1);

        flor.setAttribute(
            "aria-label",
            posicion.central
                ? "Flor central"
                : `Flor ${i + 1}`
        );

        /*
         * Contenedor interior para el movimiento.
         */

        const interior =
            document.createElement("span");

        interior.className = "flower-inner";

        /*
         * Tallo.
         */

        const tallo =
            document.createElement("span");

        tallo.className = "stem";

        /*
         * Hojas.
         */

        const hojaIzquierda =
            document.createElement("span");

        hojaIzquierda.className =
            "leaf leaf-left";

        const hojaDerecha =
            document.createElement("span");

        hojaDerecha.className =
            "leaf leaf-right";

        /*
         * Cabeza de la flor.
         */

        const cabeza =
            document.createElement("span");

        cabeza.className = "flower-head";

        /*
         * Seis pétalos.
         */

        for (let j = 0; j < 6; j++) {

            const petalo =
                document.createElement("span");

            petalo.className = "petal";

            petalo.style.transform =
                `rotate(${j * 60}deg) translateY(-8px)`;

            cabeza.appendChild(petalo);

        }

        /*
         * Centro de la flor.
         */

        const centro =
            document.createElement("span");

        centro.className = "flower-center";

        cabeza.appendChild(centro);

        /*
         * Ensamblar la flor.
         */

        interior.append(
            tallo,
            hojaIzquierda,
            hojaDerecha,
            cabeza
        );

        flor.appendChild(interior);

        /*
         * Activar interacción únicamente
         * en las escenas correspondientes.
         */

        if (interactivas || elegirCentro) {

            flor.classList.add("is-interactive");

            flor.addEventListener("click", () => {

                seleccionarFlor(
                    flor,
                    i,
                    opciones
                );

            });

        } else {

            flor.tabIndex = -1;

            flor.setAttribute(
                "aria-hidden",
                "true"
            );

        }

        flowersContainer.appendChild(flor);

    }

}

/* Mostrar mensaje de una flor */

function mostrarMensajeFlor(
    mensaje,
    especial = false
) {

    flowerMessage.classList.remove(
        "visible",
        "is-special"
    );

    flowerMessage.textContent =
        personalizarTexto(mensaje);

    /*
     * Reiniciar la animación del mensaje.
     */

    void flowerMessage.offsetWidth;

    flowerMessage.classList.add("visible");

    if (especial) {

        flowerMessage.classList.add(
            "is-special"
        );

    }

}

/* Selección de flores */

function seleccionarFlor(
    flor,
    indice,
    opciones
) {

    if (
        cambiandoEscena ||
        florCentralSeleccionada
    ) {
        return;
    }

    /*
     * Quitar iluminación de la flor anterior.
     */

    const todasLasFlores =
        flowersContainer.querySelectorAll(
            ".flower"
        );

    todasLasFlores.forEach(elemento => {

        elemento.classList.remove(
            "is-selected",
            "is-blooming"
        );

    });

    /*
     * Iluminar la flor seleccionada.
     */

    flor.classList.add("is-selected");

    /*
     * Escena de elección de la flor central.
     */

    if (opciones.elegirCentro) {

        const esCentral =
            flor.dataset.center === "true";

        if (!esCentral) {

            mostrarMensajeFlor(
                "Todas son bonitas... pero hay una que siempre elegiría."
            );

            return;

        }

        /*
         * Selección de la flor central.
         */

        florCentralSeleccionada = true;

        flor.classList.add("is-blooming");

        mostrarMensajeFlor(
            "Tú.",
            true
        );

        /*
         * Mostrar la escena final después
         * de la animación de la flor.
         */

        temporizadorFlor = setTimeout(() => {

            temporizadorFlor = null;

            cambiarAEscena(
                escenaActual + 1
            );

        }, 1600);

        return;

    }

    /*
     * Flores con mensajes individuales.
     */

    const mensaje =
        CONFIG.mensajesFlores[indice] ||
        "Cada momento contigo es especial.";

    mostrarMensajeFlor(mensaje);

}

/* Mostrar la escena actual */

function mostrarEscena() {

    const datos =
        CONFIG.escenas[escenaActual];

    /*
     * Reiniciar temporizadores pendientes.
     */

    clearTimeout(temporizadorFlor);

    temporizadorFlor = null;

    clearTimeout(temporizadorFoto);

    temporizadorFoto = null;

    florCentralSeleccionada = false;

    /*
     * Actualizar textos.
     */

    sceneLabel.textContent =
        datos.etiqueta || "";

    sceneTitle.textContent =
        personalizarTexto(datos.titulo);

    sceneDescription.textContent =
        personalizarTexto(
            datos.descripcion || ""
        );

    /*
     * Limpiar el mensaje anterior.
     */

    flowerMessage.textContent = "";

    flowerMessage.classList.remove(
        "visible",
        "is-special"
    );

    /*
     * Destacar el nombre y el mensaje final.
     */

    sceneTitle.classList.toggle(
        "is-name",
        escenaActual === 0 ||
        escenaActual === totalEscenas - 1
    );

    /*
     * Ocultar animaciones anteriores.
     */

    mainStar.classList.remove("visible");

    constellation.classList.remove(
        "visible",
        "photo-visible"
    );

    planetSystem.classList.remove("visible");

    /*
     * Mostrar estrella.
     */

    if (datos.modo === "estrella") {

        mainStar.classList.add("visible");

    }

    /*
     * Mostrar corazón con fotografía.
     */

    if (datos.modo === "corazon") {

        reiniciarCorazon();

    }

    /*
     * Mostrar planeta con flores.
     */

    if (datos.modo === "planeta") {

        crearFlores(
            datos.flores || 0,
            {
                interactivas:
                    datos.floresInteractivas === true,

                elegirCentro:
                    datos.elegirFlorCentral === true
            }
        );

        planetSystem.classList.add(
            "visible"
        );

    }

    /*
     * Navegación.
     */

    backButton.disabled =
        escenaActual === 0;

    if (datos.elegirFlorCentral) {

        nextButton.disabled = true;

        nextButton.innerHTML =
            'Elige una flor <span>✦</span>';

    } else {

        nextButton.disabled = false;

        if (
            escenaActual === totalEscenas - 1
        ) {

            nextButton.innerHTML =
                'Volver al inicio <span>↻</span>';

        } else {

            nextButton.innerHTML =
                'Continuar <span>→</span>';

        }

    }

    /*
     * Contador.
     */

    const numeroActual =
        String(escenaActual + 1).padStart(2, "0");

    const numeroTotal =
        String(totalEscenas).padStart(2, "0");

    sceneCounter.textContent =
        `${numeroActual} / ${numeroTotal}`;

    sceneFooter.textContent =
        datos.pie || "UN UNIVERSO PARA TI";

    /*
     * Barra de progreso.
     */

    const porcentaje =
        ((escenaActual + 1) / totalEscenas) * 100;

    progressBar.style.width =
        `${porcentaje}%`;

}

/* Transiciones entre escenas */

function cambiarAEscena(numero) {

    if (cambiandoEscena) {
        return;
    }

    if (
        numero < 0 ||
        numero >= totalEscenas
    ) {
        return;
    }

    /*
     * Cancelar una revelación pendiente
     * si se abandona la escena.
     */

    clearTimeout(temporizadorFlor);

    temporizadorFlor = null;

    clearTimeout(temporizadorFoto);

    temporizadorFoto = null;

    cambiandoEscena = true;

    scene.classList.add("is-changing");

    setTimeout(() => {

        escenaActual = numero;

        mostrarEscena();

        scene.classList.remove(
            "is-changing"
        );

        cambiandoEscena = false;

    }, 350);

}

/* Botón continuar */

nextButton.addEventListener("click", () => {

    if (cambiandoEscena) {
        return;
    }

    const datos =
        CONFIG.escenas[escenaActual];

    /*
     * La escena de la flor central
     * no puede saltarse.
     */

    if (datos.elegirFlorCentral) {
        return;
    }

    if (
        escenaActual === totalEscenas - 1
    ) {

        cambiarAEscena(0);

        return;

    }

    cambiarAEscena(
        escenaActual + 1
    );

});

/* Botón atrás */

backButton.addEventListener("click", () => {

    if (cambiandoEscena) {
        return;
    }

    cambiarAEscena(
        escenaActual - 1
    );

});

/* Navegación con teclado */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {

        if (!nextButton.disabled) {

            nextButton.click();

        }

    }

    if (event.key === "ArrowLeft") {

        backButton.click();

    }

});

/* Música de fondo */

backgroundMusic.volume =
    CONFIG.volumenMusica;

function actualizarBotonMusica() {

    const reproduciendo =
        !backgroundMusic.paused;

    musicButton.classList.toggle(
        "is-playing",
        reproduciendo
    );

    musicButton.setAttribute(
        "aria-pressed",
        String(reproduciendo)
    );

    musicButton.setAttribute(
        "aria-label",
        reproduciendo
            ? "Pausar música"
            : "Activar música"
    );

    musicButton.title =
        reproduciendo
            ? "Pausar música"
            : "Activar música";

    musicButton.textContent =
        reproduciendo ? "♫" : "♪";

}

musicButton.addEventListener(
    "click",
    async () => {

        if (backgroundMusic.paused) {

            try {

                await backgroundMusic.play();

            } catch (error) {

                console.error(
                    "No se pudo reproducir la música:",
                    error
                );

                musicButton.title =
                    "Comprueba que assets/musica.mp3 exista";

            }

        } else {

            backgroundMusic.pause();

        }

        actualizarBotonMusica();

    }
);

backgroundMusic.addEventListener(
    "play",
    actualizarBotonMusica
);

backgroundMusic.addEventListener(
    "pause",
    actualizarBotonMusica
);

/* Fondo de estrellas */

const canvas =
    document.getElementById("starsCanvas");

const ctx = canvas.getContext("2d");

let estrellas = [];

let anchoPantalla = 0;

let altoPantalla = 0;

let ultimoTiempo = 0;

const movimientoReducido =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

/* Ajustar el fondo a la pantalla */

function ajustarCanvas() {

    if (!ctx) {
        return;
    }

    const escala = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    anchoPantalla = window.innerWidth;

    altoPantalla = window.innerHeight;

    canvas.width = Math.round(
        anchoPantalla * escala
    );

    canvas.height = Math.round(
        altoPantalla * escala
    );

    ctx.setTransform(
        escala,
        0,
        0,
        escala,
        0,
        0
    );

    crearEstrellas();

}

/* Crear estrellas */

function crearEstrellas() {

    const cantidad = Math.min(
        240,
        Math.max(
            70,
            Math.round(
                (anchoPantalla * altoPantalla) / 5500
            )
        )
    );

    estrellas = [];

    for (let i = 0; i < cantidad; i++) {

        estrellas.push({

            x: Math.random() * anchoPantalla,

            y: Math.random() * altoPantalla,

            radio: 0.25 + Math.random() * 1.1,

            brillo: 0.15 + Math.random() * 0.55,

            velocidad: 0.3 + Math.random() * 1.2,

            fase: Math.random() * Math.PI * 2

        });

    }

}

/* Dibujar el universo */

function dibujarUniverso(tiempo) {

    if (!ctx) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        anchoPantalla,
        altoPantalla
    );

    const segundos = tiempo / 1000;

    estrellas.forEach(estrella => {

        const variacion =
            movimientoReducido
                ? 1
                : 0.65 +
                  0.35 * Math.sin(
                      segundos * estrella.velocidad +
                      estrella.fase
                  );

        const opacidad =
            estrella.brillo * variacion;

        ctx.beginPath();

        ctx.arc(
            estrella.x,
            estrella.y,
            estrella.radio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255, 250, 230, ${opacidad})`;

        ctx.fill();

    });

    if (!movimientoReducido) {

        dibujarEstrellaFugaz(segundos);

    }

}

/* Estrella fugaz */

function dibujarEstrellaFugaz(segundos) {

    const ciclo = segundos % 13;

    if (
        ciclo < 2 ||
        ciclo > 3.2
    ) {
        return;
    }

    const progreso = (ciclo - 2) / 1.2;

    const inicioX = anchoPantalla * 0.8;

    const inicioY = altoPantalla * 0.15;

    const x = inicioX - progreso * 170;

    const y = inicioY + progreso * 95;

    const gradiente =
        ctx.createLinearGradient(
            x + 45,
            y - 25,
            x,
            y
        );

    gradiente.addColorStop(
        0,
        "rgba(255,255,255,0)"
    );

    gradiente.addColorStop(
        1,
        "rgba(255,244,210,0.65)"
    );

    ctx.beginPath();

    ctx.moveTo(x + 45, y - 25);

    ctx.lineTo(x, y);

    ctx.strokeStyle = gradiente;

    ctx.lineWidth = 1.2;

    ctx.stroke();

}

/* Bucle de animación */

function animarEstrellas(tiempo) {

    if (
        tiempo - ultimoTiempo >= 30 ||
        movimientoReducido
    ) {

        dibujarUniverso(tiempo);

        ultimoTiempo = tiempo;

    }

    if (!movimientoReducido) {

        requestAnimationFrame(
            animarEstrellas
        );

    }

}

/* Ajustar al cambiar el tamaño */

window.addEventListener("resize", () => {

    ajustarCanvas();

    if (movimientoReducido) {

        dibujarUniverso(0);

    }

});

/* Inicio */

function iniciarExperiencia() {

    configurarPagina();

    crearCorazon();

    ajustarCanvas();

    mostrarEscena();

    actualizarBotonMusica();

    requestAnimationFrame(
        animarEstrellas
    );

}

iniciarExperiencia();