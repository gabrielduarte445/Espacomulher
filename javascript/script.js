
document.addEventListener('DOMContentLoaded',function(){
    const menusimbolo=document.getElementById('menu-toggle');
    const menu=document.querySelector('.menu');
    menusimbolo.addEventListener('click',()=>
    menu.classList.toggle('active'));});

    const btnCopiar = document.getElementById('btn-copiar-pix');
    const chavePix = document.getElementById('chave-pix');
    if (btnCopiar && chavePix) {
      btnCopiar.addEventListener('click', () => {
        navigator.clipboard.writeText(chavePix.textContent.trim()).then(() => {
          const original = btnCopiar.textContent;
          btnCopiar.textContent = 'Copiado!';
          setTimeout(() => (btnCopiar.textContent = original), 2000);
        });
      });
    }