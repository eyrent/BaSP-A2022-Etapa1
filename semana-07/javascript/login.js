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
function alertUser(){
    var inputPass = document.getElementById("password").value;
    var inputEmail = document.getElementById("email-address").value;
    var successMsg = "You've logged in successfully.";
    var generalErrorMsg = "Something went wrong. Please check: ";
    var emailErrorMsg = "The e-mail address you entered does not look valid";
    var passErrorMsg1 = "Your password length is incorrect.";
    var passErrorMsg2 = "Your password must include at least a number.";
    var passErrorMsg3 = "Your password must include at least an uppercase letter.";
    var passErrorMsg4 = "Your password must NOT include spaces nor symbols.";
    var passState = validatePass(inputPass); // [bool]
    var emailState = isValidEmail(inputEmail); // bool
    console.log(passState, emailState);
    var alertText;
    if(emailState && isValidPass(inputPass)){
        alertText = successMsg;
        alertText += "\nForm data: \n" + JSON.stringify({email: inputEmail, password: inputPass}, null, "\t");
    } else {
        alertText = generalErrorMsg;
        if(!emailState) alertText += "\n" + emailErrorMsg;
        if(!(passState[0]))alertText += "\n" + passErrorMsg1;
        if(!(passState[1]))alertText += "\n" + passErrorMsg2;
        if(!(passState[2]))alertText += "\n" + passErrorMsg3;
        if(!(passState[3]))alertText += "\n" + passErrorMsg4;
    }
    alert(alertText);
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
    loginButton.addEventListener("click", alertUser);
}