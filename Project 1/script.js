// Retreiving HTML elements from the DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const passward = document.getElementById('passward');
const passward2 = document.getElementById('passward2');

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


//Event Listeners
//Create event listener for submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    //check if username is empty
    if (username.value === '') {
        showError(username, 'Username is required')
    } else {
        showSuccess(username)
    }
    //check if email is empty
    if (email.value === '') {
        showError(email, 'Email is required')
    } else {
        showSuccess(email)
    }
    //check if passward is empty
    if (passward.value === '') {
        showError(passward, 'passward is required')
    } else {
        showSuccess(passward)
    }
    //check if confirm passward is empty
    if (passward2.value === '') {
        showError(passward2, 'Confirm Passward is required')
    } else {
        showSuccess(passward2)
    }
})