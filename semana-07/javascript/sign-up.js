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
function validateName(name_string){
    var charCount = countCharsByGroup(name_string);
    return name_string.length > 3 &&
        (charCount.digits + charCount.other) === 0;
}
function validateDni(dni_string){
    var charCount = countCharsByGroup(dni_string);
    return charCount.digits > 7 &&
        (charCount.lowerCase +
        charCount.upperCase +
        charCount.other +
        charCount.whiteSpace) === 0;
}
function validateDate(input_date){
    var today = new Date();
    return Date.parse(input_date) < today.getTime();
}
function validatePhone(phone_string){
    var charCount = countCharsByGroup(phone_string);
    return charCount.digits === 10 &&
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
function _validatePass(pass_string){
    var chars = countCharsByGroup(pass_string);
    var str_len = pass_string.length;
    return [(str_len > 7 && str_len < 21),
        chars.digits> 0,
        chars.upperCase> 0,
        (chars.other+ chars.whiteSpace) === 0];
}
function validatePass(pass_string){
    var eval = _validatePass(pass_string);
    var valid = true;
    for(var i = 0; i < eval.length; i++){
        valid &&= eval[i];
    }
    return valid;
}
function validateEmailAddress(email_string){
    var emailExpression = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if(email_string === ""){
        return false;
    } else return emailExpression.test(email_string);
}
function alertUser(dataObj, validationObj){
    var alertText = "";
    var result = true;
    var errorMessages = [
        "\t- Your name must be al least 4 characters long. Numbers and symbols are not allowed",
        "\t- Your surname must be al least 4 characters long. Numbers and symbols are not allowed",
        "\t- Your DNI number must be al least 8 digits long. Just the numbers.",
        "\t- There's an issue with your birth date.",
        "\t- Your phone number is 10 digits long. Only numbers are allowed",
        "\t- Your home address doesn't look right. Include street name (at least 6 letters long) and number. Don't use symbols.",
        "\t- Cities are at least 4 alphanumeric characters long.",
        "\t- Zip codes are 4-5 digits long. Just the numbers.",
        "\t- Your email address doesn't look right.",
        "\t- Passwords are 8 to 20 characters long. They must contain at least a number and an uppercase letter. Spaces and symbols are not allowed. Make sure both password fields are the same."
    ]
    for (var field in validationObj){
        result &&= validationObj[field];
    }
    if(result){
        alertText = "Welcome to Trackgenix. Your account has been created.\nForm data\n" +
            JSON.stringify(dataObj, null, "\t");
    } else{
        alertText = "Your account cannot be created. Check the following:\n";
        errorNumber = 0;
        for(field in validationObj){
            if(!validationObj[field]) alertText += errorMessages[errorNumber] + "\n";
            errorNumber++;
        }
    }
    alert(alertText);
}
window.onload = function(){
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
    var nameField = document.getElementById("name-field");
    nameField.onblur = function(){
        payload.name = nameField.value;
        validation.name = validateName(payload.name);
        nameField.classList.add(validation.name ? "green-outline" : "red-outline");
    }
    nameField.onfocus = function(){
        nameField.classList.remove("green-outline","red-outline");
    }
    var surnameField = document.getElementById("surname-field");
    surnameField.onblur = function(){
        payload.surname = surnameField.value;
        validation.surname = validateName(payload.surname);
        surnameField.classList.add(validation.surname ? "green-outline" : "red-outline");
    }
    surnameField.onfocus = function(){
        surnameField.classList.remove("green-outline","red-outline");
    }
    var dniField = document.getElementById("dni-field");
    dniField.onblur = function(){
        payload.dni = dniField.value;
        validation.dni = validateDni(payload.dni);
        dniField.classList.add(validation.dni ? "green-outline" : "red-outline");
    }
    dniField.onfocus = function(){
        dniField.classList.remove("green-outline","red-outline");
    }
    var dateBirthField = document.getElementById("date-birth-field");
    dateBirthField.onblur = function(){
        payload.dateBirth = dateBirthField.value;
        validation.dateBirth = validateDate(payload.dateBirth);
        dateBirthField.classList.add(validation.dateBirth ? "green-outline" : "red-outline");
    }
    dateBirthField.onfocus = function(){
        dateBirthField.classList.remove("green-outline","red-outline");
    }
    var phoneField = document.getElementById("phone-field");
    phoneField.onblur = function(){
        payload.phone = phoneField.value;
        validation.phone = validatePhone(payload.phone);
        phoneField.classList.add(validation.phone ? "green-outline" : "red-outline");
    }
    phoneField.onfocus = function(){
        phoneField.classList.remove("green-outline","red-outline");
    }
    var homeAddressField = document.getElementById("home-address-field");
    homeAddressField.onblur = function(){
        payload.homeAddress = homeAddressField.value;
        validation.homeAddress = validateHomeAdress(payload.homeAddress);
        homeAddressField.classList.add(validation.homeAddress ? "green-outline" : "red-outline");
    }
    homeAddressField.onfocus = function(){
        homeAddressField.classList.remove("green-outline","red-outline");
    }
    var cityField = document.getElementById("city-field");
    cityField.onblur = function(){
        payload.city = cityField.value;
        validation.city = validateCity(payload.city);
        cityField.classList.add(validation.city ? "green-outline" : "red-outline");
    }
    cityField.onfocus = function(){
        cityField.classList.remove("green-outline","red-outline");
    }
    var zipcodeField = document.getElementById("zipcode-field");
    zipcodeField.onblur = function(){
        payload.zipcode = zipcodeField.value;
        validation.zipcode = validateZipCode(payload.zipcode);
        zipcodeField.classList.add(validation.zipcode ? "green-outline" : "red-outline");
    }
    zipcodeField.onfocus = function(){
        zipcodeField.classList.remove("green-outline","red-outline");
    }
    var emailField = document.getElementById("email-address-field");
    emailField.onblur = function(){
        payload.email = emailField.value;
        validation.email = validateEmailAddress(payload.email);
        emailField.classList.add(validation.email ? "green-outline" : "red-outline");
    }
    emailField.onfocus = function(){
        emailField.classList.remove("green-outline","red-outline");
    }
    var passField = document.getElementById("pass-field");
    passField.onblur = function(){
        payload.pass = passField.value;
        validation.pass = validatePass(payload.pass);
        passField.classList.add(validation.pass ? "green-outline" : "red-outline");
    }
    passField.onfocus = function(){
        passField.classList.remove("green-outline","red-outline");
    }
    var passConfirmField = document.getElementById("pass-confirm-field");
    passConfirmField.onblur = function(){
        validation.pass &&= passField.value === passConfirmField.value;
        passConfirmField.classList.add(validation.pass ? "green-outline" : "red-outline");
    }
    passConfirmField.onfocus = function(){
        passConfirmField.classList.remove("green-outline","red-outline");
    }
    var submitBtn = document.getElementById("signup-btn");
    submitBtn.addEventListener("click", function () {
        alertUser(payload, validation);
        });
}