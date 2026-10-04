const pantallaResultado = document.getElementById("resultado");
const pantallaOperacion = document.getElementById("operacion");
const botones = document.querySelector(".botones");

let valorActual = "0";
let valorAnterior = "";
let operador = null;
let reiniciarPantalla = false;

const simbolos = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function actualizarPantalla() {
  pantallaResultado.textContent = valorActual;
  pantallaOperacion.textContent = operador
    ? `${valorAnterior} ${simbolos[operador]}`
    : "";

  document.querySelectorAll(".operador").forEach((btn) => {
    btn.classList.toggle(
      "activo",
      btn.dataset.operador === operador && reiniciarPantalla
    );
  });
}

function agregarNumero(numero) {
  if (reiniciarPantalla || valorActual === "0") {
    valorActual = numero;
    reiniciarPantalla = false;
  } else {
    if (valorActual.length >= 15) return;
    valorActual += numero;
  }
}

function agregarDecimal() {
  if (reiniciarPantalla) {
    valorActual = "0.";
    reiniciarPantalla = false;
    return;
  }
  if (!valorActual.includes(".")) {
    valorActual += ".";
  }
}

function elegirOperador(op) {
  if (operador && !reiniciarPantalla) {
    calcular();
  }
  operador = op;
  valorAnterior = valorActual;
  reiniciarPantalla = true;
}

function calcular() {
  if (!operador) return;

  const a = parseFloat(valorAnterior);
  const b = parseFloat(valorActual);
  let resultado;

  switch (operador) {
    case "+":
      resultado = a + b;
      break;
    case "-":
      resultado = a - b;
      break;
    case "*":
      resultado = a * b;
      break;
    case "/":
      if (b === 0) {
        valorActual = "Error: ÷ 0";
        operador = null;
        valorAnterior = "";
        reiniciarPantalla = true;
        return;
      }
      resultado = a / b;
      break;
  }

  // Evita errores de punto flotante (ej: 0.1 + 0.2)
  valorActual = String(parseFloat(resultado.toPrecision(12)));
  operador = null;
  valorAnterior = "";
  reiniciarPantalla = true;
}

function limpiar() {
  valorActual = "0";
  valorAnterior = "";
  operador = null;
  reiniciarPantalla = false;
}

function borrar() {
  if (reiniciarPantalla || valorActual.startsWith("Error")) {
    limpiar();
    return;
  }
  valorActual = valorActual.length > 1 ? valorActual.slice(0, -1) : "0";
}

function porcentaje() {
  if (valorActual.startsWith("Error")) return;
  valorActual = String(parseFloat(valorActual) / 100);
}

// Manejo de clics
botones.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (valorActual.startsWith("Error") && !btn.dataset.accion) {
    limpiar();
  }

  if (btn.dataset.numero !== undefined) {
    agregarNumero(btn.dataset.numero);
  } else if (btn.dataset.operador) {
    elegirOperador(btn.dataset.operador);
  } else {
    switch (btn.dataset.accion) {
      case "decimal":
        agregarDecimal();
        break;
      case "igual":
        calcular();
        break;
      case "limpiar":
        limpiar();
        break;
      case "borrar":
        borrar();
        break;
      case "porcentaje":
        porcentaje();
        break;
    }
  }
  actualizarPantalla();
});

// Soporte de teclado
document.addEventListener("keydown", (e) => {
  if (valorActual.startsWith("Error")) limpiar();

  if (e.key >= "0" && e.key <= "9") agregarNumero(e.key);
  else if (e.key === "." || e.key === ",") agregarDecimal();
  else if (["+", "-", "*", "/"].includes(e.key)) elegirOperador(e.key);
  else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calcular();
  } else if (e.key === "Backspace") borrar();
  else if (e.key === "Escape") limpiar();
  else if (e.key === "%") porcentaje();
  else return;

  actualizarPantalla();
});

actualizarPantalla();