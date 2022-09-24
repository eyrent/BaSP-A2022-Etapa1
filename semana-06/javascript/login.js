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
        (chars.lowerCase.length + chars.upperCase.length) > 0,
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
window.onload = function(){
    var passField = document.querySelector(".text-field[type=password]");
    passField.onblur = function(){
        console.log(isValidPass(passField.value));
        if(isValidPass(passField.value)){
            passField.classList.add("green-border")
        } else{
            passField.classList.add("red-border");
        }
    passField.onfocus = function(){
        passField.classList.remove("red-border");
        passField.classList.remove("green-border");
    }
    }
}