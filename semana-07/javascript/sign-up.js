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
function APIformatDate(date_string){
    dateParts = date_string.split("-");
    return [dateParts[1], dateParts[2], dateParts[0]].join("/");
    // var date = new Date(date_string);
    // return [date.getMonth(), date.getDate(), date.getFullYear()].join("/");

}
function ISOformatDate(date_string){
    dateParts = date_string.split("/");
    return [dateParts[2], dateParts[0], dateParts[1]].join("-");
    // var date = new Date(date_string);
    // return [ date.getFullYear(), date.getMonth(), date.getDate()].join("-");
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
function modalAlert(heading_str, text_str, errorMsgs_array, preformatedText_str){
    var modalContentHtmlNode = document.querySelector(".modal-content");
    // remove elements left by previous alert
    var childNode;
    while((childNode = modalContentHtmlNode.firstChild).tagName !== "BUTTON"){
        childNode.remove();
    }
    if(preformatedText_str !== undefined && preformatedText_str !== ""){
        var modalPreformatedText = document.createElement("pre");
        modalPreformatedText.textContent = preformatedText_str;
        modalContentHtmlNode.prepend(modalPreformatedText);
    }
    if(errorMsgs_array !== undefined && errorMsgs_array !== []){
        var modalErrorList = document.createElement("ul");
        for(var i = 0; i < errorMsgs_array.length; i++){
            var newErrorMsg = modalErrorList.appendChild(document.createElement("li"));
            newErrorMsg.textContent = errorMsgs_array[i];
        }
        modalContentHtmlNode.prepend(modalErrorList);
    }
    if(text_str !== undefined && text_str !== ""){
        var modalText = document.createElement("p");
        modalText.textContent = text_str;
        modalContentHtmlNode.prepend(modalText);
    }
    if(heading_str !== undefined && heading_str !== ""){
        var modalHeading = document.createElement("h3");
        modalHeading.textContent = heading_str;
        modalContentHtmlNode.prepend(modalHeading);
    }
    document.querySelector(".modal").classList.remove("hidden");
}
function alertUser(dataObj, validationObj){
    var alertErrorMsgs = [];
    var alertText = "";
    var result = true;
    var errorMessages = [
        "Your name must be al least 4 characters long. Numbers and symbols are not allowed",
        "Your surname must be al least 4 characters long. Numbers and symbols are not allowed",
        "Your DNI number must be al least 8 digits long. Just the numbers.",
        "There's an issue with your birth date.",
        "Your phone number is 10 digits long. Only numbers are allowed",
        "Your home address doesn't look right. Include street name (at least 6 letters long) and number. Don't use symbols.",
        "Cities are at least 4 alphanumeric characters long.",
        "Zip codes are 4-5 digits long. Just the numbers.",
        "Your email address doesn't look right.",
        "Passwords are 8 to 20 characters long. They must contain at least a number and an uppercase letter. Spaces and symbols are not allowed. Make sure both password fields are the same."
    ]
    for (var field in validationObj){
        result &&= validationObj[field];
    }
    if(result){
        serverCreateUser(dataObj);
    } else{
        alertText = "Some fields don't look right. Check the following:\n";
        errorNumber = 0;
        for(field in validationObj){
            if(!validationObj[field]) alertErrorMsgs.push(errorMessages[errorNumber]);
            errorNumber++;
        }
        modalAlert("Ups!", alertText, alertErrorMsgs);
    }
}
function serverCreateUser(payload){
    var signUpState = {
        showSpinner: false,
        userCreated:  false,
        errors: false,
        errorMsgs: [],
        data: {}
    };
    signUpState.showSpinner = true;
    var apiURI = "https://basp-m2022-api-rest-server.herokuapp.com/signup"
    var paramList = [];
    for(prop in payload){
        paramList.push(prop + "=" + payload[prop]);
    }
    fetch(apiURI + "?" + paramList.join("&"))
    .then(function(loginApiResponse){
        return loginApiResponse.json();
    })
    .then(function(responseObj){
            if(responseObj.success){
                signUpState.userCreated = true;
                signUpState.showSpinner = false;
                signUpState.errors = false;
                signUpState.errorMsgs = [];
                signUpState.data = responseObj.data;
                storeAPIResponseData(responseObj.data);
                return signUpState;
            } else {
                signUpState.userCreated = false;
                signUpState.showSpinner = false;
                signUpState.errorMsgs = [];
                if(responseObj.errors !== undefined){
                    signUpState.errors = true;
                    for(var i = 0; i < responseObj.errors.length; i++){
                        signUpState.errorMsgs.push(responseObj.errors[i].msg);
                    }
                } else{
                    responseObj.errors = false;
                }
                return signUpState;
            }
        })
        .then(function(signUpState) {
            showMsg(signUpState);
        });
}
function showMsg(state){
    var errorMsgs_array = [];
    if(state.userCreated){
        modalAlert("Welcome to Trackgenix!",
            "Your account has been created.",
            [],
            JSON.stringify(state.data, null, "\n"));
    } else {
        var alertText = "We can't create your accound at the moment. Server response is:"
        if(state.errorMsgs.length > 0){
            errorMsgs_array = state.errorMsgs;
        }
        modalAlert("We're sorry!",alertText, errorMsgs_array);
    }
}
function storeAPIResponseData(data){
    for(key in data){
        localStorage.setItem(key, data[key]);
    }
}
function restoreAPIResponseData(dataObj){
    var value;
    for(prop in dataObj){
        if((value = localStorage.getItem(prop)) !== null){
            dataObj[prop] = value;
        }
    }
}
window.onload = function(){
    var payload = {
        name: "",
        lastName:"",
        dni: "",
        dob: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        email: "",
        password: ""
    }
    var validation = {
        name: false,
        lastName: false,
        dni: false,
        dob: false,
        phone: false,
        address: false,
        city: false,
        zip: false,
        email: false,
        password: false
    }
    restoreAPIResponseData(payload);

    var nameField = document.getElementById("name-field");
    if(payload.name !== null) {
        nameField.value = payload.name;
        validation.name = validateName(payload.name);
    }
    nameField.onblur = function(){
        payload.name = nameField.value;
        validation.name = validateName(payload.name);
        nameField.classList.add(validation.name ? "green-outline" : "red-outline");
        document.querySelector("#name-field ~ .error-msg").classList.add("visible");
    }
    nameField.onfocus = function(){
        nameField.classList.remove("green-outline","red-outline");
        document.querySelector("#name-field ~ .error-msg").classList.remove("visible");
    }
    var surnameField = document.getElementById("surname-field");
    if(payload.lastName !== null) {
        surnameField.value = payload.lastName;
        validation.lastName = validateName(payload.lastName);
    }
    surnameField.onblur = function(){
        payload.lastName = surnameField.value;
        validation.lastName = validateName(payload.lastName);
        surnameField.classList.add(validation.lastName ? "green-outline" : "red-outline");
        document.querySelector("#surname-field ~ .error-msg").classList.add("visible");
    }
    surnameField.onfocus = function(){
        surnameField.classList.remove("green-outline","red-outline");
        document.querySelector("#surname-field ~ .error-msg").classList.remove("visible");
    }
    var dniField = document.getElementById("dni-field");
    if(payload.dni !== null) {
        dniField.value = payload.dni
        validation.dni = validateDni(payload.dni);
    };
    dniField.onblur = function(){
        payload.dni = dniField.value;
        validation.dni = validateDni(payload.dni);
        dniField.classList.add(validation.dni ? "green-outline" : "red-outline");
        document.querySelector("#dni-field ~ .error-msg").classList.add("visible");
    }
    dniField.onfocus = function(){
        dniField.classList.remove("green-outline","red-outline");
        document.querySelector("#dni-field ~ .error-msg").classList.remove("visible");
    }
    var dateBirthField = document.getElementById("date-birth-field");
    if(payload.dob !== null) {
        dateBirthField.value = ISOformatDate(payload.dob);
        validation.dob = validateDate(payload.dob);
    }
    dateBirthField.onblur = function(){
        payload.dob = /* dateBirthField.value;  */APIformatDate(dateBirthField.value);
        validation.dob = validateDate(payload.dob);
        dateBirthField.classList.add(validation.dob ? "green-outline" : "red-outline");
        document.querySelector("#date-birth-field ~ .error-msg").classList.add("visible");
    }
    dateBirthField.onfocus = function(){
        dateBirthField.classList.remove("green-outline","red-outline");
        document.querySelector("#date-birth-field ~ .error-msg").classList.remove("visible");
    }
    var phoneField = document.getElementById("phone-field");
    if(payload.phone !== null) {
        phoneField.value = payload.phone;
        validation.phone = validatePhone(payload.phone);
    }
    phoneField.onblur = function(){
        payload.phone = phoneField.value;
        validation.phone = validatePhone(payload.phone);
        phoneField.classList.add(validation.phone ? "green-outline" : "red-outline");
        document.querySelector("#phone-field ~ .error-msg").classList.add("visible");
    }
    phoneField.onfocus = function(){
        phoneField.classList.remove("green-outline","red-outline");
        document.querySelector("#phone-field ~ .error-msg").classList.remove("visible");
    }
    var homeAddressField = document.getElementById("home-address-field");
    if(payload.address !== null){
        homeAddressField.value = payload.address;
        validation.address = validateHomeAdress(payload.address);
    }
    homeAddressField.onblur = function(){
        payload.address = homeAddressField.value;
        validation.address = validateHomeAdress(payload.address);
        homeAddressField.classList.add(validation.address ? "green-outline" : "red-outline");
        document.querySelector("#home-address-field ~ .error-msg").classList.add("visible");
    }
    homeAddressField.onfocus = function(){
        homeAddressField.classList.remove("green-outline","red-outline");
        document.querySelector("#home-address-field ~ .error-msg").classList.remove("visible");
    }
    var cityField = document.getElementById("city-field");
    if(payload.city !== null){
        cityField.value = payload.city;
        validation.city = validateCity(payload.city);
    }
    cityField.onblur = function(){
        payload.city = cityField.value;
        validation.city = validateCity(payload.city);
        cityField.classList.add(validation.city ? "green-outline" : "red-outline");
        document.querySelector("#city-field ~ .error-msg").classList.add("visible");
    }
    cityField.onfocus = function(){
        cityField.classList.remove("green-outline","red-outline");
        document.querySelector("#city-field ~ .error-msg").classList.remove("visible");
    }
    var zipcodeField = document.getElementById("zipcode-field");
    if(payload.zip !== null) {
        zipcodeField.value = payload.zip;
        validation.zip = validateZipCode(payload.zip);
    }
    zipcodeField.onblur = function(){
        payload.zip = zipcodeField.value;
        validation.zip = validateZipCode(payload.zip);
        zipcodeField.classList.add(validation.zip ? "green-outline" : "red-outline");
        document.querySelector("#zipcode-field ~ .error-msg").classList.add("visible");
    }
    zipcodeField.onfocus = function(){
        zipcodeField.classList.remove("green-outline","red-outline");
        document.querySelector("#zipcode-field ~ .error-msg").classList.remove("visible");
    }
    var emailField = document.getElementById("email-address-field");
    if(payload.email !== null) {
        emailField.value = payload.email;
        validation.email = validateEmailAddress(payload.email);
    }
    emailField.onblur = function(){
        payload.email = emailField.value;
        validation.email = validateEmailAddress(payload.email);
        emailField.classList.add(validation.email ? "green-outline" : "red-outline");
        document.querySelector("#email-address-field ~ .error-msg").classList.add("visible");
    }
    emailField.onfocus = function(){
        emailField.classList.remove("green-outline","red-outline");
        document.querySelector("#email-address-field ~ .error-msg").classList.remove("visible");
    }
    var passField = document.getElementById("pass-field");
    if(payload.password !== null) {
        passField.value = payload.password;
        validation.password = validatePass(payload.password);
    }
    passField.onblur = function(){
        payload.password = passField.value;
        validation.password = validatePass(payload.password);
        passField.classList.add(validation.password ? "green-outline" : "red-outline");
        document.querySelector("#pass-field ~ .error-msg").classList.add("visible");
    }
    passField.onfocus = function(){
        passField.classList.remove("green-outline","red-outline");
        document.querySelector("#pass-field ~ .error-msg").classList.remove("visible");
    }
    var passConfirmField = document.getElementById("pass-confirm-field");
    passConfirmField.value = passField.value;
    passConfirmField.onblur = function(){
        validation.password &&= passField.value === passConfirmField.value;
        passConfirmField.classList.add(validation.password ? "green-outline" : "red-outline");
        document.querySelector("#pass-confirm-field ~ .error-msg").classList.add("visible");
    }
    passConfirmField.onfocus = function(){
        passConfirmField.classList.remove("green-outline","red-outline");
        document.querySelector("#pass-confirm-field ~ .error-msg").classList.remove("visible");
    }
    // Prevent page from reloading after form submition
    var signupForm = document.querySelector("form")
        .addEventListener("submit", function(e){
            e.preventDefault();
        })
    var submitBtn = document.getElementById("signup-btn");
    submitBtn.addEventListener("click", function () {
        alertUser(payload, validation);
    });
    var modalOKBtn = document.querySelector(".modal-box button");
    var modal = document.querySelector(".modal");
    // console.log(modal, modalOKBtn);
    modalOKBtn.addEventListener("click", function(){
        modal.classList.add("hidden");
    })
}