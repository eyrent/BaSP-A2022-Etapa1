/*  Crear una función suma que reciba dos valores numéricos y retorne el resultado.
    Ejecutar la función y guardar el resultado en una variable,
    mostrando el valor de dicha variable en la consola del navegador. */
function getRndmNumber(){
    return Math.floor(Math.random() * 100 -50);
}
function sumOfTwoNum(a, b){
    return a + b;
}
var numOne = getRndmNumber();
var numTwo = getRndmNumber();
console.log("6.a> ", numOne, "+", numTwo, "=", sumOfTwoNum(numOne, numTwo));

/*  A la función suma anterior, agregarle una validación para controlar si alguno
    de los parámetros no es un número; de no ser un número, mostrar una alerta
    aclarando que uno de los parámetros tiene error y retornar el valor NaN como resultado. */
function isNaN(num){
    if(typeof num === 'number'){
        return false;
    } else {
        alert("Error: non-numeric parameter");
        return true;
    }
}
function sumOfTwoNum_safe(a, b){
    if(isNaN(a) || isNaN(b)){
        return NaN;
    } else {
        return sumOfTwoNum(a, b);
    }
}
/* Test: */
console.log("6.b>",
    "sumOfTwoNum_safe(13, 6) = ", sumOfTwoNum_safe(13, 6));
console.log("6.b>",
    "sumOfTwoNum_safe('not a number', 5) = ", sumOfTwoNum_safe("not a number", 5));

/*  Aparte, crear una función validate Integer que reciba un número
    como parámetro y devuelva verdadero si es un número entero. */
function validateInteger(num){
    if(num % 1 !== 0){
        alert("Error: number is not an integer");
        return false;
    }
    else {
        return true;
    }
}
/* Test: */
console.log("6.c>", "isInteger(Math.random()) =", validateInteger(Math.random()).toString() );
/* getRndmNumber returns a random number between -50 and 50 */
console.log("6.c>", "isInteger(getRndmNumber()) =", validateInteger(getRndmNumber()).toString() );

/*  A la función suma del ejercicio 6b) agregarle una llamada a la función del ejercicio 6c.
    y que valide que los números sean enteros. En caso que haya decimales
    mostrar un alerta con el error y retornar el número convertido a entero (redondeado). */
function sumOfTwoInt_safe(a, b){
    if(!isNaN(a) || !isNaN(b)){
        return (validateInteger(a) ? a : Math.round(a)) + (validateInteger(b) ? b : Math.round(b))
    } else return NaN;
}
/* Tests: */
console.log("6.d> sumOfTwoInt_safe(0.5 + 1) =", sumOfTwoInt_safe(0.5, 1) );
console.log("6.d> sumOfTwoInt_safe(6 + 1) =", sumOfTwoInt_safe(6, 1) );

/*  Convertir la validación del ejercicio 6d) en una función separada y
    llamarla dentro de la función suma probando que todo siga funcionando igual. */
function sumValidation(a, b) {
    return !isNaN(a) && !isNaN(b) && validateInteger(a) && validateInteger(b);
}
function sumOfTwoNum2(a, b){
    if(sumValidation(a, b)) return a + b;
    else return NaN;
}
/* Tests: */
console.log("6.e>", "12 + 11 =", sumOfTwoNum2(12, 11));
console.log("6.e>", "5.35 + 1 =", sumOfTwoNum2(5.35, 1));
console.log("6.e>", "4 + 'a' =", sumOfTwoNum2(4, 'a'));