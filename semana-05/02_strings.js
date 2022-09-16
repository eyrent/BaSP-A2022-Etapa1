/*  Crear una variable de tipo string con al menos 10 caracteres y convertir todo el texto en mayúscula. */
var str1_2 = "ThIs TeXt sHoUlD bE aLl In CaPs.";
console.log("2.a> ", str1_2.toUpperCase());

/*  Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
    string con los primeros 5 caracteres guardando el resultado en una nueva variable. */
var str2_2 = "There are 2 sentences in this string. We'll be dropping this part.";
var msg2 = str2_2.substring(0, 37);
console.log("2.b> ", msg2);

/*  Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
    string con los últimos 3 caracteres guardando el resultado en una nueva variable.*/
var str3_2 = "Please don't edit this!!!";
var warning = str3_2.substring(13);
console.log("2.c> ", warning);

/*  Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo string
    con la primera letra en mayúscula y las demás en minúscula. Guardar el resultado en una nueva variable */
var str4_2 = "i'm not SCREAMING";
var msg3 = str4_2.substring(0,1).toUpperCase() + str4_2.substring(1).toLowerCase();
console.log("2.d> ", msg3);

/*  Crear una variable de tipo string con al menos 10 caracteres y algún espacio en blanco.
    Encontrar la posición del primer espacio en blanco y guardarla en una variable. */
var str5_2 = "one two three four five"
var firstSeparator = str5_2.indexOf(" ");
console.log("2.e> First space index: ", firstSeparator);

/*  Crear una variable de tipo string con al menos 2 palabras largas (10 caracteres y algún espacio entre medio).
    Utilizar los métodos de los ejercicios anteriores para generar un nuevo string que tenga
    la primera letra de ambas palabras en mayúscula y las demás letras en minúscula */
var universe = "anthro-chronologically incomprehensible"
var wStart = 0;
/* Assing first word with capitalized fist character INCLUDING SPACE */
var capEachWord =
universe.substring(wStart, wStart + 1).toUpperCase() +  universe.substring(wStart+1, universe.indexOf(" ", wStart) +1);
wStart = universe.indexOf(" ", wStart) + 1;
/* Now concatenate the second CAPed word */
capEachWord += universe.substring(wStart, wStart + 1).toUpperCase() +  universe.substring(wStart+1, universe.length);
console.log("2.f> ", capEachWord);

