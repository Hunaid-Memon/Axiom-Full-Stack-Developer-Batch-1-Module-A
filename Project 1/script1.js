
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value === '') {
            showError(input, `${getFieldId(input)} is Required`)
        }
    })
}
// for(let i = 0 ; i < inputArray.length; i++){
//     const input = inputArray[i]
//     if(input.value === ''){
//         showError(input,' is required')
//     }
// }

function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    if (input.value.length < 3) {
        showError(input, `${getFieldId(input)} needs to be atleast ${min} characters`)
    } else if (input.value.length > 10) {
        showError(input, `${getFieldId(input)} needs to be less than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

function checkEmail (input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if (re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, `Please provide a valid email`)
    }
}

function checkPasswordMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, `Password don't match`);
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2])
    checkLength(username,3,12)
    checkLength(password,6,30)
    checkEmail(email)
    checkPasswordMatch(password,password2)
})
