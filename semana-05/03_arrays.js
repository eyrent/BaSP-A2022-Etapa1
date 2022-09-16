/*  Dado el siguiente array, mostrar por consola los meses 5 y 11 */
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
console.log ("3.a> mes 5: ", meses[4], "| mes 11: ", meses[10]);

/*  Ordenar el array de meses alfabéticamente y mostrarlo por consola */
console.log("3.b> mesesSorted = [", meses.sort().join(", "), "]");

/*  Agregar un elemento al principio y al final del array. */
meses.push("Enero(next year)");
meses.unshift("Diciembre(last year)");
console.log("3.c> [", meses.join(", "), "]");

/*  Quitar un elemento del principio y del final del array. */
console.log("3.d> ");
console.log("Popping", meses.pop(), "out of the array.");
console.log("Shifting", meses.shift(), "out of the array.");
console.log("meses = [", meses.join(", "), "]");

/*  nvertir el orden del array. */
console.log("3.e> meses(reversed alphabetical order) =",
    meses.reverse().join(", "), "]");

/*  Unir todos los elementos del array en un único string
    donde cada mes este separado por un guión */
console.log("3.f> ", meses.join("-"));

/*  Crear una copia del array de meses que contenga desde Mayo hasta Noviembre.*/
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var algunosMeses = meses.slice(4, 11);
console.log("3.g> [", algunosMeses.join(", "), "]");