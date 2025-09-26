const totalCartas = 3;
let cartaAtual = 1;

const leftHalf = document.getElementById('leftHalf');
const rightHalf = document.getElementById('rightHalf');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

// Função para carregar e exibir uma carta (com duas páginas)
async function carregarCarta(num) {
  // Fecha as páginas
  leftHalf.classList.add('closed');
  rightHalf.classList.add('closed');

  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const response = await fetch(`cartas/carta${num}.html`);
    const html = await response.text();

    // Cria um elemento temporário para extrair as páginas
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extrai as páginas
    const pageLeft = tempDiv.querySelector('.page-left')?.outerHTML || '<div class="page-left"><p></p></div>';
    const pageRight = tempDiv.querySelector('.page-right')?.outerHTML || '<div class="page-right"><p></p></div>';

    // Insere no layout
    leftHalf.innerHTML = `<div class="card-content">${pageLeft}</div>`;
    rightHalf.innerHTML = `<div class="card-content">${pageRight}</div>`;

    // Atualiza controles
    counter.textContent = `${num} / ${totalCartas}`;
    prevBtn.disabled = num === 1;
    nextBtn.disabled = num === totalCartas;

    // Abre as páginas
    setTimeout(() => {
      leftHalf.classList.remove('closed');
      leftHalf.classList.add('open');
      rightHalf.classList.remove('closed');
      rightHalf.classList.add('open');
    }, 100);

  } catch (err) {
    console.error("Erro ao carregar carta:", err);
    leftHalf.innerHTML = `<div class="card-content"><p>Erro ao carregar a carta.</p></div>`;
    rightHalf.innerHTML = `<div class="card-content"><p>Erro ao carregar a carta.</p></div>`;
  }
}

// Inicializa
window.addEventListener('DOMContentLoaded', () => {
  carregarCarta(cartaAtual);
});

// Navegação
prevBtn.addEventListener('click', () => {
  if (cartaAtual > 1) {
    cartaAtual--;
    carregarCarta(cartaAtual);
  }
});

nextBtn.addEventListener('click', () => {
  if (cartaAtual < totalCartas) {
    cartaAtual++;
    carregarCarta(cartaAtual);
  }
});