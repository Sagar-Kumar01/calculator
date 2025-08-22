let operation_button = document.querySelectorAll(".operation-button")
let operation_button_button = document.querySelectorAll(".operation-buttonbutton")
let digit_button_button = document.querySelectorAll(".digit-buttonbutton")
let inputs = document.querySelector("#input")



window.addEventListener("keydown", function(obj) {
    if ((obj.key == "+" || obj.key == "-" || obj.key == "*" ||
        obj.key == "/" || obj.key >= 0 || obj.key <= 9 || obj.key == ".")) {
        inputs.value = inputs.value + obj.key;
        inputs.scrollLeft = inputs.scrollWidth;
    }
    if (obj.key == "=") {
        console.log(tokenize(inputs.value))
    }
    if (obj.key == "Backspace") {
        if (inputs.value.length != 0) {
            let temp = inputs.value.split("");
            temp = temp.slice(0, -1);
            inputs.value = temp.join("")
        }

    }
    if (obj.key == "a" || obj.key == "A") {
        inputs.value = ""
    }


})

function tokenize(expression) {
    let arr = expression.match(/\d+(\.\d+)?|[+\-*/]/g);

    let flag = 0;

    for(let i = 0; i<arr.length; i++){
        if(arr[i] == "/" && arr[i+1] != "0"){
            let result = divs(arr[i-1],arr[i+1])
            arr.splice(i - 1, 3, result);
            i--;
        }else if(arr[i+1] == "0"){
            flag += 1;
        }
    }
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == "*"){
            let result = multi(arr[i-1],arr[i+1])
            arr.splice(i - 1, 3, result);
            i--;
        }
    }
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == "+"){
            let result = plus(arr[i-1],arr[i+1])
            arr.splice(i - 1, 3, result);
            i--;
        }
        if(arr[i] == "-"){
            let result = minus(arr[i-1],arr[i+1])
            arr.splice(i - 1, 3, result);
            i--;
        }
    }
    if(flag>0){
        inputs.value = "can't divided by 0"
    }else{
        inputs.value = arr[0];
    }
    
}

function plus(a, b) {
    a = Number(a);
    b = Number(b);
    return a + b;
}

function minus(a, b) {
    a = Number(a);
    b = Number(b);
    return a - b;
}

function multi(a, b) {
    a = Number(a);
    b = Number(b);
    return a * b;
}

function divs(a, b) {
    a = Number(a);
    b = Number(b);
    return (a / b).toFixed(2);
    
    
}