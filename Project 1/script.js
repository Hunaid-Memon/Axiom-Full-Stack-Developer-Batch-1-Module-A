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


//Event Listeners
//Create event listener for submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    //check if username is empty
    if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
        username.value = '';
    }
    //check if email is empty
    if (email.value === '') {
        showError(email, 'Email is required');
    } else {
        showSuccess(email);
        email.value = '';
    }
    //check if password is empty
    if (password.value === '') {
        showError(password, 'Password is required');
    } else {
        showSuccess(password);
        password.value = '';
    }
    //check if confirm password is empty
    if (password2.value === '') {
        showError(password2, 'Confirm Password is required');
    } else {
        showSuccess(password2);
        password2.value = '';
    }
})