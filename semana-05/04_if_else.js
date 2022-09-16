/*  Crear un número aleatorio entre 0 y 1 utilizando la función Math.random(),
    si el valor es mayor o igual que 0,5 mostrar una alerta con el mensaje
    “Greater than 0,5” y sino un alerta con el mensaje “Lower than 0,5”. */
var num1 = Math.random();
    if(num1 > 0.5){
        alert("4.a> Greater than 0,5");
} else if (num1 < 0.5){
    alert("4.a> Lower than 0,5");
}

/*  Crear una variable “Age” que contenga un número entero entre 0 y 100 
    y muestre los siguientes mensajes de alerta:
        “Bebe” si la edad es menor a 2 años;
        “Niño” si la edad es entre 2 y 12 años;
        “Adolescente” entre 13 y 19 años;
        “Joven” entre 20 y 30 años;
        “Adulto” entre 31 y 60 años;
        “Adulto mayor” entre 61 y 75 años;
        “Anciano” si es mayor a 75 años. */
var age = Math.floor(Math.random() * 100);
switch(age) {
    case(age < 2): category = "Bebé"; break;
    case(age < 12): category = "Niño"; break;
    case(age < 19): category = "Adolescente"; break;
    case(age < 30): category = "Jóven"; break;
    case(age < 60): category = "Adulto"; break;
    case(age < 75): category = "Adulto mayor"; break;
    default: category = "Anciano"; break;
}
alert("4.b> " + category);