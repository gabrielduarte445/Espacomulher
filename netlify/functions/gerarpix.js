
function crc16(payload) {
  let polinomio = 0x1021;
  let resultado = 0xFFFF;

  for (let i = 0; i < payload.length; i++) {
    resultado ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((resultado & 0x8000) !== 0) {
        resultado = (resultado << 1) ^ polinomio;
      } else {
        resultado <<= 1;
      }
      resultado &= 0xFFFF;
    }
  }
  return resultado.toString(16).toUpperCase().padStart(4, '0');
}

function campo(id, valor) {
  const tamanho = String(valor.length).padStart(2, '0');
  return `${id}${tamanho}${valor}`;
}

function gerarPayloadPix({ chave, nome, cidade, valor, txid }) {
  const nomeFormatado = nome.substring(0, 25);
  const cidadeFormatada = cidade.substring(0, 15);
  const txidFormatado = (txid || 'DOACAO').substring(0, 25).replace(/[^a-zA-Z0-9]/g, '');

  const gui = campo('00', 'br.gov.bcb.pix');
  const chavePix = campo('01', chave);
  const merchantAccountInfo = campo('26', gui + chavePix);

  const merchantCategoryCode = campo('52', '0000');
  const transactionCurrency = campo('53', '986'); // BRL
  const transactionAmount = valor ? campo('54', Number(valor).toFixed(2)) : '';
  const countryCode = campo('58', 'BR');
  const merchantName = campo('59', nomeFormatado);
  const merchantCity = campo('60', cidadeFormatada);

  const additionalDataField = campo('62', campo('05', txidFormatado));

  let payload =
    campo('00', '01') +
    campo('01', '12') + 
    merchantAccountInfo +
    merchantCategoryCode +
    transactionCurrency +
    transactionAmount +
    countryCode +
    merchantName +
    merchantCity +
    additionalDataField +
    '6304';

  const crc = crc16(payload);
  return payload + crc;
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ erro: 'Método não permitido' }) };
  }

  try {
    const { valor } = JSON.parse(event.body);

    if (valor && (isNaN(valor) || Number(valor) <= 0)) {
      return { statusCode: 400, body: JSON.stringify({ erro: 'Valor inválido' }) };
    }

    const payload = gerarPayloadPix({
      chave: 'espacomulhersaogabriel@gmail.com', // sua chave PIX
      nome: 'Espaco Mulher Sao Gabriel',          // sem acento, max 25 caracteres
      cidade: 'Sao Gabriel',                       // sem acento, max 15 caracteres
      valor: valor || null,
      txid: 'DOACAOSITE'
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ erro: 'Erro ao gerar PIX' }) };
  }
};