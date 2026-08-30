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
  }


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
// --- 4. MODAL "LEIA MAIS" DAS NOTÍCIAS ---
const noticias = {
  "1": {
    tag: "Acolhimento",
    data: "12 de junho de 2026",
    titulo: "Ação de acolhimento fortalece mulheres da comunidade",
    imagem: "../img/noticia1-acolhimento.jpg",
    texto: `
      <p>Realizamos um encontro voltado ao acolhimento e escuta ativa de mulheres em situação de vulnerabilidade, fortalecendo vínculos e reforçando o apoio coletivo.</p>
      <p>A ação reuniu mulheres da comunidade de São Gabriel para um momento de escuta, troca e fortalecimento mútuo. Contamos com a presença de parceiros institucionais, que reforçaram o compromisso com a proteção e o cuidado das mulheres atendidas pelo Espaço Mulher.</p>
      <p>Encontros como esse são parte fundamental do nosso trabalho: mais do que atendimento pontual, buscamos construir uma rede permanente de apoio, onde cada mulher se sinta ouvida, respeitada e nunca sozinha.</p>
    `
  },
  "2": {
    tag: "Acolhimento",
    data: "12 de junho de 2026",
    titulo: "Campanha solidária apoia mulheres em tratamento de saúde",
    imagem: "../img/noticia2-saude-rosasdosertao.jpg",
    texto: `
      <p>Por meio de mobilização comunitária, conseguimos arrecadar recursos e apoio para mulheres que precisam se deslocar para tratamento médico. A ação contribuiu para garantir mais dignidade e cuidado durante esse processo.</p>
      <p>A campanha faz parte das ações do grupo Rosas do Sertão, formado por mulheres em situação de vulnerabilidade social que enfrentam o câncer e precisam viajar cerca de 500 km até Salvador para tratamento.</p>
      <p>Com o apoio da comunidade, foi possível oferecer suporte financeiro e emocional para que essas mulheres viajem com mais segurança e dignidade, sabendo que não estão sozinhas nessa jornada.</p>
    `
  },
  "3": {
    tag: "Acolhimento",
    data: "12 de junho de 2026",
    titulo: "Oficina promove autonomia e geração de renda",
    imagem: "../img/noticia3-oficina-bordado.jpg",
    texto: `
      <p>Foi realizada uma oficina voltada à capacitação e geração de renda, incentivando o protagonismo feminino e a independência financeira. A atividade também fortaleceu a autoestima e a valorização pessoal das participantes.</p>
      <p>As participantes tiveram a oportunidade de aprender técnicas práticas que podem se transformar em fonte de renda, dentro da proposta de economia solidária que o Espaço Mulher vem desenvolvendo em suas ações.</p>
      <p>Iniciativas como essa reforçam nosso compromisso com a autonomia feminina, mostrando que capacitação e acolhimento caminham juntos na reconstrução da vida dessas mulheres.</p>
    `
  }
};

const modal = document.getElementById('noticia-modal');
const modalOverlay = document.getElementById('noticia-modal-overlay');
const modalFechar = document.getElementById('noticia-modal-fechar');

function abrirNoticiaModal(id) {
  const n = noticias[id];
  if (!n || !modal) return;

  document.getElementById('modal-imagem').src = n.imagem;
  document.getElementById('modal-tag').innerText = n.tag;
  document.getElementById('modal-data').innerText = n.data;
  document.getElementById('modal-titulo').innerText = n.titulo;
  document.getElementById('modal-texto').innerHTML = n.texto;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fecharNoticiaModal() {
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.noticia-link').forEach(botao => {
  botao.addEventListener('click', function () {
    const id = this.getAttribute('data-noticia');
    abrirNoticiaModal(id);
  });
});

if (modalFechar) modalFechar.addEventListener('click', fecharNoticiaModal);
if (modalOverlay) modalOverlay.addEventListener('click', fecharNoticiaModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') fecharNoticiaModal();
});