CALCULADORA WEB
===============

Calculadora hecha con HTML, CSS y JavaScript puro. No necesita instalar nada.

ARCHIVOS
--------
index.html  -> estructura y botones
styles.css  -> diseño visual
script.js   -> lógica de la calculadora

CÓMO EJECUTARLA
---------------
1. Crea una carpeta y coloca dentro los 3 archivos.
2. Haz doble clic en index.html para abrirlo en el navegador.

(Opcional: con VS Code, usa la extensión Live Server
y abre http://localhost:8000)

CÓMO SE USA
-----------
- Números: botones 0-9 o teclas 0-9
- Decimal: botón "." o teclas "." y ","
- Operaciones: + - * / (botones o teclado)
- Resultado: botón "=" o tecla Enter
- Borrar un dígito: botón ⌫ o Backspace
- Limpiar todo: botón AC o Esc
- Porcentaje: botón % o tecla %

FUNCIONAMIENTO
--------------
- index.html: crea la pantalla (operación y resultado) y los
  botones. Cada botón tiene un atributo data-* (número,
  operador o acción) para que el JavaScript sepa qué hace.

- styles.css: usa CSS Grid de 4 columnas para los botones.
  Los colores distinguen el tipo de botón y el operador
  seleccionado se resalta en blanco.

- script.js: guarda el estado en 4 variables:
    valorActual       -> número que se está escribiendo
    valorAnterior     -> primer número de la operación
    operador          -> operador elegido (+, -, *, /)
    reiniciarPantalla -> indica si el próximo número reemplaza
                         al actual

Ejemplo (8 + 5 =):
  1. Se presiona 8: valorActual = 8
  2. Se presiona +: se guarda 8 y el operador
  3. Se presiona 5: valorActual = 5
  4. Se presiona =: se calcula 8 + 5 y muestra 13

Detalles:
- Si se divide entre cero, muestra un mensaje de error.
- Los resultados se redondean para evitar errores de
  decimales (0.1 + 0.2 = 0.3).
- Se pueden encadenar operaciones (2 + 3 + 4).
- Un solo evento para todos los botones y otro para el teclado.