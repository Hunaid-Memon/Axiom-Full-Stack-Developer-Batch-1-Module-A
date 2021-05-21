// Retreiving HTML elements from the DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Function to update class and message for errors
function showError(input, message) {
    //Get the parent element of the input field(.form-control)
    const formControl = input.parentElement;
    //Override the class  - add error
    formControl.className = 'form-control error';
    // Get the small element for the error message
    const small = formControl.querySelector('small');
    //Replace the text for small element using the input message
    small.innerText = message;
}

//Function to update class for success
function showSuccess(input) {
    //Get the parent element of the input field(.form-control)
    const formControl = input.parentElement;
    //Override the class  - add success
    formControl.className = 'form-control success';
}

//function to check if email is valid

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if (re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, `Please provide a valid email`)
    }
}

//Function to check if required field have data

function checkRequired(inputArray){
    inputArray.forEach(function(input){
        if(input.value === ''){
            showError(input, `${getFieldId(input)} is Required`)
        }else {
            showSuccess(input)
        }
    })
}

//Function to get the id of the input field
function getFieldId (input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Function to check length of input field

function checkLength(input, min, max){
    if (input.value.length < min){
        showError(input, `${getFieldId(input)} needs to be atleast ${min} characters`)
    }else if (input.value.length > max) {
        showError(input, `${getFieldId(input)} needs to be less than ${max} characters`)
    }else{
        showSuccess(input)
    }
}

// Function to check if password and confirn password match

function checkPasswordMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, `Passwords don't match`)
    }
}




//Event Listeners
//Create event listener for submit
form.addEventListener('submit', function (e) {
    e.preventDefault();


    checkRequired([username,email,password,password2])
    checkLength(username, 3,10);
    checkLength(password,6,30);
    checkEmail(email);
    checkPasswordMatch(password,password2);
})