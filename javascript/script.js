document.addEventListener('DOMContentLoaded', function () {
  const menusimbolo = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const backdrop = document.getElementById('menu-backdrop');
  const fechar = document.getElementById('menu-fechar');

  function abrirMenu() {
    menu.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; /* trava a rolagem da página atrás do menu */
  }

  function fecharMenu() {
    menu.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menusimbolo) {
    menusimbolo.addEventListener('click', abrirMenu);
  }
  if (fechar) {
    fechar.addEventListener('click', fecharMenu);
  }
  if (backdrop) {
    backdrop.addEventListener('click', fecharMenu);
  }

  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', fecharMenu);
  });
  const btnCopiar = document.getElementById('btn-copiar-pix');
  
  if (btnCopiar) {
  btnCopiar.addEventListener('click', function () {
    const chave = document.getElementById('chave-pix').innerText;
    navigator.clipboard.writeText(chave).then(() => {
      btnCopiar.innerText = 'Copiado!';
      setTimeout(() => { btnCopiar.innerText = 'Copiar chave'; }, 2000);
    });
  });
}
});