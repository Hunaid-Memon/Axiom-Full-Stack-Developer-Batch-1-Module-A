const menuToggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav')
})