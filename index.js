// Importar los módulos necesarios de Node.js
const fs = require('fs');
const readline = require('readline');

// Crear una interfaz de lectura y escritura para la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Muestra el menú de opciones en la consola y espera la entrada del usuario.
 */
function mostrarMenu() {
  console.log("\n===== MENÚ DE INVENTARIO =====");
  console.log("1. Leer archivo .inv e imprimir su contenido.");
  console.log("2. Salir.");

  rl.question('Por favor, elige una opción: ', (opcion) => {
    switch (opcion) {
      case '1':
        leerEImprimirArchivo();
        break;
      case '2':
        console.log('Saliendo del programa...');
        rl.close(); // Cierra la interfaz y termina el programa
        break;
      default:
        console.log('Opción no válida. Por favor, intenta de nuevo.');
        mostrarMenu(); // Muestra el menú nuevamente
        break;
    }
  });
}

/**
 * Lee el archivo inventario.inv, imprime su contenido y maneja excepciones.
 */
async function leerEImprimirArchivo() {
  
    const nombreArchivo = 'inventario.inv';

  try {
    // Intentar leer el archivo de forma síncrona con codificación utf8. 
    const data = await fs.promises.readFile(nombreArchivo, 'utf8');
    console.log(`\n--- Contenido de ${nombreArchivo} ---`);
    console.log(data);
    console.log("------------------------------------");
  } catch (error) {
    // Manejo de excepciones
    if (error.code === 'ENOENT') {
      // Error específico si el archivo no se encuentra.
      console.error(`\n[ERROR] El archivo "${nombreArchivo}" no existe.`);
    } else {
      // Otro tipo de error durante la lectura del archivo
      console.error(`\n[ERROR] Ocurrió un problema al leer el archivo: ${error.message}`);
    }
  } finally {
    // Después del bloque try/catch, siempre se vuelve a mostrar el menú
    mostrarMenu();
  }
}

// Iniciar el programa mostrando el menú por primera vez
console.log('Bienvenido al gestor de inventario.');
mostrarMenu();