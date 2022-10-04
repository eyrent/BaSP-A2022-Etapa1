function inRange(n, a, b) {
    return n >= a && n <= b;
}
function groupChars(string){
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
        upperCase: upperCase,
        lowerCase: lowerCase,
        digits: digits,
        whiteSpace: whiteSpace,
        other: others
    }
}
function validatePass(pass_string){
    var chars = groupChars(pass_string);
    var str_len = pass_string.length;
    return [(str_len > 7 && str_len < 21),
        chars.digits.length > 0,
        chars.upperCase.length > 0,
        (chars.other.length + chars.whiteSpace.length) === 0];
}
function isValidPass(pass_string){
    var eval = validatePass(pass_string);
    var valid = true;
    for(var i = 0; i < eval.length; i++){
        valid &&= eval[i];
    }
    return valid;
}
var emailExpression = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
function isValidEmail(email_string){
    if(email_string === ""){
        return false;
    } else return emailExpression.test(email_string);
}
function alertUser(dataObj){
    var emailErrorMsg = "The e-mail address you entered does not look valid";
    var passErrorMsg1 = "Your password length is incorrect.";
    var passErrorMsg2 = "Your password must include at least a number.";
    var passErrorMsg3 = "Your password must include at least an uppercase letter.";
    var passErrorMsg4 = "Your password must NOT include spaces nor symbols.";
    var passState = validatePass(dataObj.password); // [bool]
    var emailState = isValidEmail(dataObj.email); // bool
    if(emailState && isValidPass(dataObj.password)){
        serverLogin(dataObj);
    } else {
        var errorMsgs_array = [];
        if(!emailState) errorMsgs_array.push(emailErrorMsg);
        if(!(passState[0]))errorMsgs_array.push(passErrorMsg1);
        if(!(passState[1]))errorMsgs_array.push(passErrorMsg2);
        if(!(passState[2]))errorMsgs_array.push(passErrorMsg3);
        if(!(passState[3]))errorMsgs_array.push(passErrorMsg4);
        modalAlert("Ups!", "Something went wrong. Please check: ", errorMsgs_array);
    }
}
function modalAlert(heading_str, text_str, errorMsgs_array){
    var modalContentHtmlNode = document.querySelector(".modal-content");
    // remove elements left by previous alert
    var childNode;
    while((childNode = modalContentHtmlNode.firstChild).tagName !== "BUTTON"){
        childNode.remove();
    }
    var modalErrorList = document.createElement("ul");
    if(errorMsgs_array !== undefined && errorMsgs_array !== []){
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
function showMsg(state){
    if(state.loggedIn){
        modalAlert("Welcome to Trackgenix", "Login successfull. Redirecting to home page.");
    } else {
        modalAlert("Login failed","Check your e-mail address and password.");
    }
}
function serverLogin(credentials){
    var loginState = {
        showSpinner: false,
        loggedIn:  false,
        errors: false,
        errorMsgs: []
    };
    loginState.showSpinner = true;
    var apiURI = "https://basp-m2022-api-rest-server.herokuapp.com/login"
    var paramList = [];
    for(prop in credentials){
        paramList.push(prop + "=" + credentials[prop]);
    }
    fetch(apiURI + "?" + paramList.join("&"))
    .then(function(loginApiResponse){
        return loginApiResponse.json();
    })
    .then(function(responseObj){
            if(responseObj.success){
                loginState.loggedIn = true;
                loginState.showSpinner = false;
                loginState.errors = false;
                loginState.errorMsg = "";
                return loginState;
            } else {
                loginState.loggedIn = false;
                loginState.showSpinner = false;
                if(responseObj.errors !== undefined){
                    loginState.errors = true;
                    for(var i = 0; i < responseObj.errors.length; i++){
                        loginState.errorMsgs_array.push(responseObj.errors[i].msg);
                    }
                } else{
                    loginState.errors = false;
                }
                return loginState;
            }
        })
        .then(function(loginState) {
            showMsg(loginState);
        });
}
window.onload = function(){
    var passField = document.getElementById("password");
    var emailField = document.getElementById("email-address");
    var loginButton = document.getElementById("login-btn");
    passField.onblur = function(){
        if(isValidPass(passField.value)){
            passField.classList.add("green-outline")
        } else{
            passField.classList.add("red-outline");
        }
    }
    passField.onfocus = function(){
        passField.classList.remove("red-outline");
        passField.classList.remove("green-outline");
    }
    emailField.onblur = function(){
        if(isValidEmail(emailField.value)){
            emailField.classList.add("green-outline");
        } else{
            emailField.classList.add("red-outline");
        }
    }
    emailField.onfocus = function(){
        emailField.classList.remove("red-outline");
        emailField.classList.remove("green-outline");
    }
    var modalOKBtn = document.querySelector(".modal-box button");
    var modal = document.querySelector(".modal");
    modalOKBtn.addEventListener("click", function(){
        modal.classList.add("hidden");
    })
    loginButton.addEventListener("click", function(){
        alertUser({
            email: emailField.value,
            password: passField.value
        });
    });
}