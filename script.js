alert("SCRIPT NUEVO CARGADO");

// =====================
// LOGIN
// =====================
function login() {
  const user = document.getElementById("usuario")?.value.trim();
  const pass = document.getElementById("password")?.value.trim();

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    window.location.href = "app.html";
  } else {
    document.getElementById("mensaje").innerText =
      "❌ Usuario o contraseña incorrectos";
  }
}

// =====================
// LOGOUT
// =====================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// =====================
// PROTECCIÓN
// =====================
if (location.pathname.includes("app.html")) {
  if (localStorage.getItem("login") !== "true") {
    location.href = "index.html";
  }
}

// =====================
// AGREGAR TAREA
// =====================
function agregarTarea() {
  const input = document.getElementById("tarea");
  const texto = input.value.trim();
  if (!texto) return;

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push({ texto, completada: false });
  localStorage.setItem("tareas", JSON.stringify(tareas));

  crearTarea(texto, false);
  input.value = "";
}

// =====================
// CREAR TAREA
// =====================
function crearTarea(texto, completada) {
  const lista = document.getElementById("lista");

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  if (completada) li.classList.add("completada");

  span.onclick = () => {
    li.classList.toggle("completada");
  };

  const btn = document.createElement("button");
  btn.textContent = "🗑️";
  btn.className = "borrar";

  btn.onclick = () => {
    li.remove();
    borrarDeStorage(texto);
  };

  li.appendChild(span);
  li.appendChild(btn);
  lista.appendChild(li);
}

// =====================
// BORRAR
// =====================
function borrarDeStorage(texto) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas = tareas.filter(t => t.texto !== texto);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// =====================
// CARGAR
// =====================
const lista = document.getElementById("lista");
if (lista) {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach(t => crearTarea(t.texto, t.completada));
}