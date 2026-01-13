// NUESTROS RECUERDOS - JUEGO RETRO
console.log("🌟 Nuestros Recuerdos - Iniciado");



const recuerdos = [
  {
    id: 0, nombre: "Escuela", escena: "escuela", objeto: "📚",
    objetoImg: "assets/images/items/escuela.png",
    mensaje: "Todo comenzó en la escuela... 💕",
    color: "#ff1493", objX: 700, objY: 150
  },
  {
    id: 1, nombre: "Salón", escena: "salon", objeto: "💻",
    objetoImg: "assets/images/items/computo.png",
    mensaje: "Nuestro primer abrazo en el salón de cómputo... 💕",
    color: "#ff69b4", objX: 650, objY: 200
  },
  {
    id: 2, nombre: "Casa", escena: "casa", objeto: "🏠",
    objetoImg: "assets/images/items/casa.png",
    mensaje: "La primera vez que fui a tu casa... 💕",
    color: "#ff1493", objX: 700, objY: 350
  },
  {
    id: 3, nombre: "Taekwondo", escena: "taekwondo", objeto: "🥋",
    objetoImg: "assets/images/items/taekwondo.png",
    mensaje: "Fuiste a verme a mi examen de taekwondo... 💕",
    color: "#ff69b4", objX: 500, objY: 250
  },
  {
    id: 4, nombre: "Feria", escena: "feria", objeto: "🎡",
    objetoImg: "assets/images/items/feria.png",
    mensaje: "Risas infinitas en la feria... 🎡",
    color: "#ff1493", objX: 600, objY: 400
  },
  {
    id: 5, nombre: "Halloween", escena: "halloween", objeto: "🎃",
    objetoImg: "assets/images/items/halloween.png",
    mensaje: "Halloween juntos... 🎃",
    color: "#ff69b4", objX: 400, objY: 300
  },
  {
    id: 6, nombre: "Boda", escena: "boda", objeto: "💍",
    objetoImg: "assets/images/items/boda.png",
    mensaje: "Contigo quiero una vida entera... 💕",
    color: "#ff1493", objX: 400, objY: 200
  }
];

// Definir escenas (backgrounds y decoraciones)
const escenas = {
  escuela: {
    color: "url('assets/models/escuela.png')",
    decoracion: () => {},
  },
  salon: {
    color: "url('assets/models/computo.png')",
    decoracion: () => {},
  },
  casa: {
    color: "url('assets/models/casa.png')",
    decoracion: () => {},
  },
  taekwondo: {
    color: "url('assets/models/taekwondo.png')",
    decoracion: () => {},
  },
  feria: {
    color: "url('assets/models/feria.png')",
    decoracion: () => {},
  },
  halloween: {
    color: "url('assets/models/halloween.png')",
    decoracion: () => {},
  },
  boda: {
    color: "url('assets/models/boda.png')",
    decoracion: () => {},
  }
};

let gameState = {
  recuerdoActual: 0,
  recolectados: [],
  playerX: 400,
  playerY: 300,
  objX: 0,
  objY: 0,
  canMove: true
};

const speed = 4;

function startGame() {
  document.getElementById("menu").classList.remove("active");
  document.getElementById("game").classList.add("active");
  
  // Reproducir música de fondo
  const musica = document.getElementById("musicaFondo");
  musica.volume = 0.4;
  musica.play().catch(e => console.log("Autoplay bloqueado: " + e));
  
  mostrarRecuerdo(0);
  setupControles();
  gameLoop();
}

function mostrarRecuerdo(idx) {
  gameState.recuerdoActual = idx;
  gameState.playerX = 400;
  gameState.playerY = 300;
  gameState.canMove = false;
  
  const recuerdo = recuerdos[idx];
  const game = document.getElementById("game");
  const escena = escenas[recuerdo.escena];
  
  // Efecto de transición: oscurecer momentáneamente
  game.style.opacity = "0.5";
  
  setTimeout(() => {
    // Usar la imagen de fondo personalizada para cada escena
    // Asegurarse de que la sintaxis sea correcta para backgroundImage
    if (escena.color.startsWith("url")) {
      game.style.backgroundImage = escena.color;
    } else {
      game.style.backgroundImage = `url('${escena.color}')`;
    }
    game.style.backgroundSize = "cover";
    game.style.backgroundPosition = "center";
    
    // Color de borde del HUD
    document.getElementById("recuerdoNombre").style.color = recuerdo.color;
    
    // Actualizar texto con animación
    const nombre = document.getElementById("recuerdoNombre");
    const mensaje = document.getElementById("recuerdoMensaje");
    nombre.style.opacity = "0";
    mensaje.style.opacity = "0";
    
    nombre.innerText = recuerdo.nombre;
    mensaje.innerText = recuerdo.mensaje;
    document.getElementById("progreso").innerText = `${idx + 1}/7`;
    
    // Animar entrada del texto
    setTimeout(() => {
      nombre.style.transition = "opacity 0.4s ease-out";
      mensaje.style.transition = "opacity 0.4s ease-out";
      nombre.style.opacity = "1";
      mensaje.style.opacity = "1";
    }, 50);
    
    // Establecer posición del objeto (fija para cada escena)
    gameState.objX = recuerdo.objX;
    gameState.objY = recuerdo.objY;
    
    // Limpiar decoraciones previas
    const decoracion = document.getElementById("decoracion");
    if (decoracion) decoracion.remove();
    
    // Generar decoraciones
    escena.decoracion();
    
    // Crear/actualizar objeto
    let objEl = document.getElementById("objeto");
    if (objEl) {
      objEl.remove();
    }
    
    objEl = document.createElement("div");
    objEl.id = "objeto";
    // SOLO mostrar imagen si existe objetoImg, NUNCA emoji si hay imagen
    if (recuerdo.objetoImg) {
      const img = document.createElement('img');
      img.src = recuerdo.objetoImg;
      img.alt = recuerdo.nombre;
      img.style.width = "56px";
      img.style.height = "56px";
      img.style.imageRendering = "pixelated";
      img.style.pointerEvents = "none";
      objEl.appendChild(img);
    } else {
      objEl.innerText = recuerdo.objeto;
    }
    objEl.style.position = "absolute";
    objEl.style.left = gameState.objX + "px";
    objEl.style.top = gameState.objY + "px";
    objEl.style.fontSize = "50px";
    objEl.style.cursor = "pointer";
    objEl.style.zIndex = "102";
    objEl.style.filter = "drop-shadow(0 0 8px rgba(255, 105, 180, 0.8))";
    objEl.style.pointerEvents = "auto";
    objEl.onclick = function(e) {
      e.stopPropagation();
      recolectarObjeto();
    };
    const gameContainer = document.querySelector(".game-container");
    gameContainer.appendChild(objEl);
    
    // Posicionar jugador
    const player = document.getElementById("player");
    player.style.left = gameState.playerX + "px";
    player.style.top = gameState.playerY + "px";
    player.style.zIndex = "101";
    // player.src eliminado para evitar imagen rota
    
    // Recuperar opacidad del juego
    game.style.transition = "opacity 0.6s ease-out";
    game.style.opacity = "1";
    
    gameState.canMove = true;
  }, 300);
}

function recolectarObjeto() {
  console.log("🎯 Click en objeto detectado");
  
  if (!gameState) {
    console.error("❌ gameState no existe");
    return;
  }
  
  console.log("Estado del juego:", gameState.canMove, gameState.recuerdoActual);
  
  // Verificar que estés lo suficientemente cerca (40 píxeles)
  const distancia = Math.hypot(
    gameState.playerX - gameState.objX,
    gameState.playerY - gameState.objY
  );
  
  console.log("Distancia:", distancia);
  
  if (distancia > 40) {
    const pista = document.getElementById("pista");
    pista.innerText = "❌ ¡Estás muy lejos! ❌";
    pista.style.opacity = "1";
    setTimeout(() => {
      pista.innerText = "🔴 ¡PRESIONA EL OBJETO! 🔴";
    }, 1500);
    return;
  }
  
  const recuerdo = recuerdos[gameState.recuerdoActual];
  gameState.recolectados.push(recuerdo);
  
  // Reproducir sonido de recolección
  const sonido = document.getElementById("sonidoRecolecta");
  sonido.currentTime = 0;
  sonido.play().catch(e => console.log("No se pudo reproducir sonido"));
  
  // Crear efecto de partículas
  crearParticulasRecolecta();
  
  // Efecto de flash en el objeto
  const objEl = document.getElementById("objeto");
  if (objEl) {
    objEl.style.animation = "none";
    objEl.style.fontSize = "60px";
    objEl.style.filter = "drop-shadow(0 0 20px #ff69b4) brightness(1.5)";
    setTimeout(() => {
      objEl.style.transform = "scale(0)";
      objEl.style.opacity = "0";
      setTimeout(() => objEl.remove(), 200);
    }, 100);
  }
  
  // Mostrar modal con transición suave
  const modal = document.getElementById("modal");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalMensaje = document.getElementById("modalMensaje");
  const modalImagen = document.getElementById("modalImagen");
  
  if (!modal || !modalTitulo || !modalMensaje || !modalImagen) {
    console.error("❌ Elementos del modal no encontrados");
    console.log("modal:", modal, "título:", modalTitulo, "mensaje:", modalMensaje, "imagen:", modalImagen);
    return;
  }
  
  try {
    modalTitulo.innerText = recuerdo.nombre;
    modalMensaje.innerText = recuerdo.mensaje;
    
    // Cargar imagen con manejo de error
    const imagenPath = "assets/images/" + recuerdo.escena + ".jpg";
    console.log("Cargando imagen:", imagenPath);
    
    modalImagen.onerror = function() {
      console.warn("⚠️ No se pudo cargar la imagen:", imagenPath);
      this.style.display = "none";
    };
    
    modalImagen.onload = function() {
      console.log("✅ Imagen cargada correctamente");
    };
    
    modalImagen.src = imagenPath;
    
    console.log("Abriendo modal...");
    modal.classList.add("active");
    console.log("✅ Modal abierto");
  } catch (e) {
    console.error("❌ Error al abrir modal:", e);
  }
  
  gameState.canMove = false;
}

function siguiente() {
  document.getElementById("modal").classList.remove("active");
  
  // Pequeño delay para que la transición del modal sea suave
  setTimeout(() => {
    if (gameState.recolectados.length === 7) {
      mostrarFinal();
    } else {
      mostrarRecuerdo(gameState.recolectados.length);
    }
  }, 400);
}

function mostrarFinal() {
  document.getElementById("game").classList.remove("active");
  document.getElementById("final").classList.add("active");
}

function setupControles() {
  // Sprites personalizados para el oso
  const playerSprites = {
    down: 'assets/images/player/abajo.png',
    up: 'assets/images/player/arriba.png',
    left: 'assets/images/player/izquierda.png',
    right: 'assets/images/player/derecha.png'
  };
  let lastDirection = 'down';
  document.addEventListener("keydown", (e) => {
    if (!gameState.canMove) return;
    const player = document.getElementById("player");
    let direction = null;
    if (e.key === "w" || e.key === "ArrowUp") {
      gameState.playerY -= speed;
      direction = 'up';
    }
    if (e.key === "s" || e.key === "ArrowDown") {
      gameState.playerY += speed;
      direction = 'down';
    }
    if (e.key === "a" || e.key === "ArrowLeft") {
      gameState.playerX -= speed;
      direction = 'left';
    }
    if (e.key === "d" || e.key === "ArrowRight") {
      gameState.playerX += speed;
      direction = 'right';
    }
    gameState.playerX = Math.max(0, Math.min(gameState.playerX, 800));
    gameState.playerY = Math.max(0, Math.min(gameState.playerY, 600));
    player.style.left = gameState.playerX + "px";
    player.style.top = gameState.playerY + "px";
    // Cambiar sprite visual (solo fondo, no lógica)
    if (direction && lastDirection !== direction) {
      player.style.backgroundImage = `url('${playerSprites[direction]}')`;
      lastDirection = direction;
    }
    // Eliminar src si existe (asegura solo fondo)
    if (player.tagName === 'IMG') player.removeAttribute('src');
  });
}

function gameLoop() {
  if (!gameState.canMove) {
    requestAnimationFrame(gameLoop);
    return;
  }
  
  // Verificar colisión
  const distancia = Math.hypot(
    gameState.playerX - gameState.objX,
    gameState.playerY - gameState.objY
  );
  
  const pista = document.getElementById("pista");
  if (distancia < 60) {
    pista.style.opacity = "1";
    pista.innerText = "🔴 ¡PRESIONA EL OBJETO! 🔴";
  } else {
    pista.style.opacity = "0.5";
    pista.innerText = `Busca el objeto... (${Math.floor(distancia)}px)`;
  }
  
  requestAnimationFrame(gameLoop);
}

function crearParticulasRecolecta() {
  const objEl = document.getElementById("objeto");
  if (!objEl) return;
  
  const rect = objEl.getBoundingClientRect();
  const container = document.querySelector(".game-container");
  
  for (let i = 0; i < 12; i++) {
    const particula = document.createElement("div");
    const angle = (i / 12) * Math.PI * 2;
    const velocity = 3 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    particula.style.position = "absolute";
    particula.style.left = gameState.objX + "px";
    particula.style.top = gameState.objY + "px";
    particula.style.fontSize = "20px";
    particula.style.zIndex = "99";
    particula.style.pointerEvents = "none";
    particula.innerText = "✨";
    
    container.appendChild(particula);
    
    let x = gameState.objX;
    let y = gameState.objY;
    let life = 30;
    
    const animar = () => {
      x += vx;
      y += vy;
      life -= 1;
      
      particula.style.left = x + "px";
      particula.style.top = y + "px";
      particula.style.opacity = life / 30;
      
      if (life > 0) {
        requestAnimationFrame(animar);
      } else {
        particula.remove();
      }
    };
    animar();
  }
}
