const form = document.getElementById('formulario-endereco');
const campoNome = document.getElementById('campo-cep');
const mensagemStatus = document.getElementById('mensagem-status');
const imagem = document.getElementById('imagem-personagem');
const campoGenero = document.getElementById('campo-genero');
const campoRaca = document.getElementById('campo-raca');
const campoKi = document.getElementById('campo-ki');
const campoMaxKi = document.getElementById('campo-maxki');
const campoAfiliacao = document.getElementById('campo-afiliacao');

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensagemStatus.textContent = '';

  const nome = campoNome.value.trim();
  const url = `https://dragonball-api.com/api/characters?name=${nome}`;

  try {
    exibirMensagem('Consultando...', 'carregando');

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.length === 0) {
      exibirMensagem('Personagem não encontrado.', 'erro');
      limparCampos();
      return;
    }

    const p = dados[0];
    campoGenero.value = p.gender;
    campoRaca.value = p.race;
    campoKi.value = p.ki;
    campoMaxKi.value = p.maxKi;
    campoAfiliacao.value = p.affiliation;
    
    imagem.src = p.image;
    imagem.style.display = 'block';
    mensagemStatus.textContent = '';

  } catch (erro) {
    exibirMensagem('Falha de conexão.', 'erro');
    limparCampos();
  }
});

function limparCampos() {
  campoGenero.value = '';
  campoRaca.value = '';
  campoKi.value = '';
  campoMaxKi.value = '';
  campoAfiliacao.value = '';
  imagem.style.display = 'none';
}

function exibirMensagem(texto, tipo) {
  mensagemStatus.textContent = texto;
  mensagemStatus.className = `mensagem ${tipo}`;
}