document.addEventListener('DOMContentLoaded', function () {

  // --- 1. MENU MOBILE ---
  const menusimbolo = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const backdrop = document.getElementById('menu-backdrop');
  const fechar = document.getElementById('menu-fechar');

  function abrirMenu() {
    if (menu) menu.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function fecharMenu() {
    if (menu) menu.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menusimbolo) menusimbolo.addEventListener('click', abrirMenu);
  if (fechar) fechar.addEventListener('click', fecharMenu);
  if (backdrop) backdrop.addEventListener('click', fecharMenu);

  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', fecharMenu);
  });


  // --- 2. COPIAR CHAVE PIX ---
  const btnCopiar = document.getElementById('btn-copiar-pix');
  if (btnCopiar) {
    btnCopiar.addEventListener('click', function () {
      const chaveElem = document.getElementById('chave-pix');
      if (chaveElem) {
        const chave = chaveElem.innerText;
        navigator.clipboard.writeText(chave).then(() => {
          btnCopiar.innerText = 'Copiado!';
          setTimeout(() => { btnCopiar.innerText = 'Copiar chave'; }, 2000);
        });
      }
    });
  } // <-- FECHAMENTO CORRETO DO IF DO PIX


  // --- 3. FORMULÁRIO DE CONTATO (AJAX / FORMSUBMIT) ---
  const formulario = document.getElementById('meuFormulario');
  const mensagemSucesso = document.getElementById('mensagemSucesso');
  const btnEnviarOutra = document.getElementById('btnEnviarOutra');

  const EMAIL_DESTINO = "espacomulhersaogabriel@gmail.com";

  if (formulario) {
    formulario.addEventListener('submit', function (event) {
      // Bloqueia o recarregamento nativo da página
      event.preventDefault();

      const btnEnviar = document.getElementById('btnEnviar');
      if (btnEnviar) {
        btnEnviar.disabled = true;
        btnEnviar.innerText = "Enviando...";
      }

      const formData = new FormData(formulario);

      fetch(`https://formsubmit.co/ajax/${EMAIL_DESTINO}`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formulario.style.display = 'none';
          if (mensagemSucesso) {
            mensagemSucesso.style.display = 'block';
          }
          formulario.reset();
        } else {
          alert("Atenção: Verifique a caixa de entrada do e-mail " + EMAIL_DESTINO + " para ativar o formulário no FormSubmit.");
        }
      })
      .catch(error => {
        console.error("Erro no Fetch:", error);
        alert("Erro ao tentar conectar com o serviço de envio.");
      })
      .finally(() => {
        if (btnEnviar) {
          btnEnviar.disabled = false;
          btnEnviar.innerText = "Enviar mensagem";
        }
      });
    });
  }

  if (btnEnviarOutra) {
    btnEnviarOutra.addEventListener('click', function () {
      if (mensagemSucesso) mensagemSucesso.style.display = 'none';
      if (formulario) formulario.style.display = 'block';
    });
  }

});