const menusimbolo=document.getElementById('menu-toggle');
const menu=document.querySelector('.menu');

menusimbolo.addEventListener('click',()=>{menu.classList.toggle('active');});