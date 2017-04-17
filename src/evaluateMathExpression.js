var calc = function (expression) {
    var sum = calculate(expression);
    return sum;
};

function calculate(expression) {
    expression = expression.split(" ").join("");
    expression = reduceParens(expression);
    expression = evaluateDivisionAndMultiplication(expression);
    expression = evaluateAdditionAndSubtraction(expression);
    return parseFloat(expression);
}

function evaluateAdditionAndSubtraction(string) {
    string = replaceDoubleNegatives(string);
    var operations = (string.match(/\+/g) || []).length + (string.match(/\-/g) || []).length;
    if (string.split("")[0] == "-" && operations == 1) {return string;}
    var firstTerm = "", secondTerm = "", secondLeftOvers = "", secondIndex = 0;
    string = string.split("");
    for (var i = 1; i < string.length; i++) {
        if (string[i] == "+") {
            string = string.join("");
            firstTerm = string.substring(0, i);
            secondTerm = string.substring(i + 1, string.length);
            if (secondTerm.match(/[\+\-]/g)) {
                secondIndex = getIndex(secondTerm);
                secondLeftOvers = secondTerm.substring(secondIndex, string.length);
                secondTerm = secondTerm.substring(0, secondIndex);
            }
            string = add(firstTerm, secondTerm) + secondLeftOvers;
            secondLeftOvers = "";
            string = string.split("");
        }
        if (string[i] == "-") {
            string = string.join("");
            firstTerm = string.substring(0, i);
            secondTerm = string.substring(i + 1, string.length);
            if (secondTerm.match(/[\+\-]/g)) {
                secondIndex = getIndex(secondTerm);
                secondLeftOvers = secondTerm.substring(secondIndex, string.length);
                secondTerm = secondTerm.substring(0, secondIndex);
            }
            string = subtract(firstTerm, secondTerm) + secondLeftOvers;
            secondLeftOvers = "";
            string = string.split("");
        }
    }
    if (string.join("").includes("+") || string.join("").includes("-")) {return evaluateAdditionAndSubtraction(string.join(""));}
    return string.join("");
}

function subtract(first, second) {
    return parseFloat(first) - parseFloat(second);
}

function add(first, second) {
    return parseFloat(first) + parseFloat(second);
}

function replaceDoubleNegatives(string) {
    string = string.split("");
    var newValues = new Array();
    for (var i = 0; i < string.length; i++) {
        if (string[i] == "-" && string[i+1] == "-") {
            newValues.push("+");
            i++;
        }
        else {newValues.push(string[i]);}   
    }
    
    return newValues.join("");
}

function evaluateDivisionAndMultiplication(string) {
    var mult = (string.match(/\*/g) || []).length;
    var div = (string.match(/\//g) || []).length;
    var firstHalf = "", secondHalf = "", firstLeftOvers = "", secondLeftOvers = "";
    var firstHalfIndex = 0, secondHalfIndex = 0;
    if (mult + div == 0) {return string;}
    else {
        string = string.split("");
        for (var i = 0; i < string.length; i++) {
            if (string[i] == "/") {
                string = string.join(""); 
                firstHalf = string.substring(0, i);
                firstHalf = checkAndRemoveDoubleNegsThatAreLeftOverAfterParens(firstHalf);
                firstHalf = replaceDoubleNegatives(firstHalf);
                secondHalf = string.substring(i + 1, string.length);
                secondHalf = checkAndRemoveDoubleNegsThatAreLeftOverAfterParens(secondHalf);
                if (firstHalf.match(/[\+\-]/g)) {
                    if (!(firstHalf[0] == "-" && (string.match(/\-/g) || []).length == 1)) {
                        firstHalfIndex = (firstHalf.length - 1) - getIndex(firstHalf.split("").reverse().join(""));
                        firstLeftOvers = firstHalf.substring(0, firstHalfIndex + 1);
                        firstHalf = firstHalf.substring(firstHalfIndex + 1, string.length);
                    }
                }
                if (secondHalf.match(/[\*\/\+\-]/g)) {
                    secondHalfIndex = getIndex(secondHalf);
                    secondLeftOvers = secondHalf.substring(secondHalfIndex, string.length);
                    secondHalf = secondHalf.substring(0, secondHalfIndex);
                }
                string = firstLeftOvers + divide(firstHalf, secondHalf) + secondLeftOvers;
                firstLeftOvers = "";
                secondLeftOvers = "";
                string = string.split("");
                i = 0;
            }
            else if (string[i] == "*") {
                string = string.join("");
                firstHalf = string.substring(0, i);
                secondHalf = string.substring(i + 1, string.length);
                secondHalf = checkAndRemoveDoubleNegsThatAreLeftOverAfterParens(secondHalf);
                if (firstHalf.match(/[\+\-]/g)) {
                    firstHalfIndex = getIndex(firstHalf);
                    firstLeftOvers = firstHalf.substring(0, firstHalfIndex + 1);
                    firstHalf = firstHalf.substring(firstHalfIndex + 1, firstHalf.length);
                }
                if (secondHalf.match(/[\-\*\/\+]/g)) {
                    secondHalfIndex = getIndex(secondHalf);
                    secondLeftOvers = secondHalf.substring(secondHalfIndex, secondHalf.length);
                    secondHalf = secondHalf.substring(0, secondHalfIndex);
                }
                string = firstLeftOvers + multiply(firstHalf, secondHalf) + secondLeftOvers;
                firstLeftOvers = "";
                secondLeftOvers = "";
                string = string.split("");
                i = 0;
            }
        }
    }
    return string.join("");
}

function removeInitDoubleNegatives(string) {
    string = string.split("");
    if (string[0] == "-" && string[1] == "-") {
        string.shift();
        string.shift();
    }
    return string.join("");
}

function multiply(first, second) {
    return parseFloat(first) * parseFloat(second);
}

function divide(first, second) {
    return parseFloat(first) / parseFloat(second);
}

function getIndex(string) {
    string = string.split("");
    var divideIndex = Infinity, multiplyIndex = Infinity;
    var additionIndex = Infinity, subtractionIndex = Infinity;
    if (string.indexOf("/") >= 0) {divideIndex = string.indexOf("/");}
    if (string.indexOf("*") >= 0) {multiplyIndex = string.indexOf("*");}
    if (string.indexOf("+") >= 0) {additionIndex = string.indexOf("+");}
    if (string.indexOf("-") > 0) {subtractionIndex = string.indexOf("-");}
    
    return Math.min(divideIndex, multiplyIndex, additionIndex, subtractionIndex);
}

function reduceParens(string) {
    var parens = (string.match(/\(/g) || []).length;
    var subExpression = "", start = 0, end = 0;
    var stringBreak = string;
    if (parens == 0) {return string;}
    else if (parens == 1) {
        start = string.indexOf('(');
        end = string.indexOf(')');
        string = string.substring(0, start) + calculate(string.substring(start + 1, end)) + string.substring(end + 1, string.length);
        return string;
    }
    else {
        while (parens > 1) {
            start = string.indexOf('(');
            end = string.indexOf(')');
            stringBreak = string.substring(start + 1, end);
            if (stringBreak.includes('(')) {
                stringBreak = string.substring(start + 1, string.length);
                while (stringBreak.includes('(')) {
                    var temp = stringBreak.indexOf('(');
                    if (temp + (string.length - stringBreak.length) > end) {break;}
                    start = temp + (string.length - stringBreak.length);
                    stringBreak = stringBreak.substring(temp + 1, stringBreak.length);
                    
                }
            }
            var sub = removeInitDoubleNegatives(string.substring(start + 1, end));
            string = string.substring(0, start) + calculate(sub) + string.substring(end + 1, string.length);
            stringBreak = string;
            parens--;
        }
        start = string.indexOf('(');
        end = string.indexOf(')');
        string = string.substring(0, start) + calculate(string.substring(start + 1, end)) + string.substring(end + 1, string.length);
        string = checkAndRemoveDoubleNegsThatAreLeftOverAfterParens(string);
        return string;
    }
}

function checkAndRemoveDoubleNegsThatAreLeftOverAfterParens(string) {
    if (string.includes("+--")) {string = string.replace("+--", "+");}
    if (string.includes("/--")) {string = string.replace("/--", "/");}
    if (string.includes("*--")) {string = string.replace("*--", "*");}
    if (string.includes("---")) {string = string.replace("---", "-");}
    return string;
}