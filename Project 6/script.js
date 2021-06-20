const close = document.getElementById('close');
const open = document.getElementById('open');
const toggle = document.getElementById('toggle');
const modal = document.getElementById('modal');

toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('show-nav')
});

open.addEventListener('click', ()=> modal.classList.add('show'));

close.addEventListener('click', ()=> modal.classList.remove('show') )

window.addEventListener('click', e =>{
    e.target === modal ? modal.classList.remove('show') : false;
})
