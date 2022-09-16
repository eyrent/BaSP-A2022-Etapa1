/*  Crear un array que contenga 5 palabras y
    recorrer dicho array utilizando un bucle for de JavaScript
    para mostrar una alerta utilizando cada una de las palabras. */
var words = ["javascript", "css3", "html5", "mongoDB", "express.js"];
for(var i = 0; i < words.length; i++){
    alert("5.a> "+ words[i]);
}

/*  Al array anterior convertir la primera letra de cada palabra en mayúscula
y mostrar una alerta por cada palabra modificada. */
for(var i = 0; i < words.length; i++){
    alert("5.a> "+ words[i].substring(0,1).toUpperCase() +
        words[i].substring(1).toLowerCase());
}

/*  Crear una variable llamada “sentence” que tenga un string vacío,
    luego al array del punto a) recorrerlo con un bucle for para ir
    guardando cada palabra dentro de la variable sentence.
    Al final mostrar una única alerta con la cadena completa. */
var sentence = "";
for(var i = 0; i < words.length; i++){
    sentence = sentence.concat(words[i]);
    sentence = sentence.concat(" ");
    console.log("");
}
alert("5.c> " + sentence);

/*  Crear una array vacío y con un bucle for de 10 repeticiones. Llenar el array
    con el número de la repetición, es decir que al final de la ejecución del
    bucle for debería haber 10 elementos dentro del array, desde el número 0
    hasta al número 9. Mostrar por la consola del navegador el array final. */
var digits = [];
for(var i = 10; i > 0; i--){
    digits.unshift(i-1);
}
console.log("5.d> \"", digits.join(" "), "\"");
