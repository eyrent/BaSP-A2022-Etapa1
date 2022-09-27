function inRange(n, a, b) {
    return n >= a && n <= b;
}
function countCharsByGroup(string){
    var upperCase = [];
    var lowerCase = [];
    var digits = [];
    var whiteSpace = [];
    var others = [];
    var char;
    for(var i = 0; i < string.length; i++){
        char = string[i];
        switch (true) {
            case (inRange(char, 'A', 'Z')):
                upperCase.push(char);
                break;
            case (inRange(char, 'a', 'z')):
                lowerCase.push(char);
                break;
            case (inRange(char, '0', '9')):
                digits.push(char);
                break;
            case (char == ' ' || char == '\n' || char == '\t'):
                whiteSpace.push(char);
                break;
            default:
                others.push(char);
        }
    }
    return {
        upperCase: upperCase.length,
        lowerCase: lowerCase.length,
        digits: digits.length,
        whiteSpace: whiteSpace.length,
        other: others.length
    }
}
function checkLength(name_string, min, max = 120){
//120 is the max lenght for a string provided to this function
    return name_string.length >= min && name_string.length <= max;
}
function validateName(name_string){
    var charCount = countCharsByGroup(name_string);
    return checkLength(name_string, 4) &&
        (charCount.digits + charCount.other) === 0;
}
function validateDni(dni_string){
    var charCount = countCharsByGroup(dni_string);
    return checkLength(charCount.digits, 8) &&
        (charCount.lowerCase +
         charCount.upperCase +
         charCount.other +
         charCount.whiteSpace) === 0;
}
function validateDate(input_date){
    var today = new Date();
    console.log(Date.parse(input_date), today.getTime());
    return Date.parse(input_date) < today.getTime();
}
function validatePhone(phone_string){
    var charCount = countCharsByGroup(phone_string);
    return checkLength(charCount.digits, 10, 10) &&
        (charCount.lowerCase +
         charCount.upperCase +
         charCount.other +
         charCount.whiteSpace) === 0;
}
function validateCity(city_string){
    var charCount = countCharsByGroup(city_string);
    return charCount.lowerCase + charCount.upperCase > 3
        && city_string.length > 4;
}
function validateZipCode(zipcode_string){
    var charCount = countCharsByGroup(zipcode_string);
    return inRange(charCount.digits, 4, 5)
        && (charCount.lowerCase +
            charCount.upperCase +
            charCount.whiteSpace +
            charCount.other) === 0;
}
function validateHomeAdress(address_string){
    var charCount = countCharsByGroup(address_string);
    return address_string.trim().length > 5
        && (charCount.lowerCase + charCount.upperCase) > 0
        && charCount.digits > 0
        && charCount.other === 0
        && address_string.includes(" ");
}
var payload = {
    name: "",
    surname:"",
    dni: "",
    dateBirth: "",
    phone: "",
    homeAddress: "",
    city: "",
    zipcode: "",
    email: "",
    pass: ""
}
var validation = {
    name: false,
    surname: false,
    dni: false,
    dateBirth: false,
    phone: false,
    homeAddress: false,
    city: false,
    zipcode: false,
    email: false,
    pass: false
}