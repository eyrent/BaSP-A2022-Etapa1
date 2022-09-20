/*  Dado el siguiente array, mostrar por consola los meses 5 y 11 */
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
console.log ("3.a> mes 5: ", meses[4], "| mes 11: ", meses[10]);

/*  Ordenar el array de meses alfabéticamente y mostrarlo por consola */
/*  someArray.slice() creates a shallow copy of the original someArray */
var mesesSorted = meses.slice().sort();
console.log("3.b> mesesSorted =", mesesSorted);

/*  Agregar un elemento al principio y al final del array. */
var meses2  = meses.slice();
console.log("3.c>");
meses2.push("Enero(next year)");
console.log("(push)", meses2);
meses2.unshift("Diciembre(last year)");
console.log("(unshift)", meses2);

/*  Quitar un elemento del principio y del final del array. */
console.log("3.d> ");
var out = meses2.pop();
console.log(out, " popped out of the array.");
out = meses2.shift();
console.log(out, " shifted out of the array.");
console.log("meses =", meses2);

/*  Invertir el orden del array. */
var mesesReversed = meses.slice().reverse();
console.log("3.e> mesesReversed =", mesesReversed);

/*  Unir todos los elementos del array en un único string
    donde cada mes este separado por un guión */
var mesesString = meses.join("-");
    console.log("3.f> mesesString = ", "\"", mesesString, "\"");

/*  Crear una copia del array de meses que contenga desde Mayo hasta Noviembre.*/
var algunosMeses = meses.slice(4, 11);
console.log("3.g> algunosMeses =", algunosMeses);