const totalCartas = 3;
let cartaAtual = 1;

const leftHalf = document.getElementById('leftHalf');
const rightHalf = document.getElementById('rightHalf');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

// Função para carregar e exibir uma carta
async function carregarCarta(num) {
  // 1. Fecha as metades
  leftHalf.classList.add('closed');
  rightHalf.classList.add('closed');

  // 2. Aguarda a animação de fechar
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // 3. Busca o conteúdo da carta
    const response = await fetch(`cartas/carta${num}.html`);
    const html = await response.text();

    // 4. Insere o mesmo conteúdo em ambas as metades
    leftHalf.innerHTML = `<div class="card-content">${html}</div>`;
    rightHalf.innerHTML = `<div class="card-content">${html}</div>`;

    // 5. Atualiza controles
    counter.textContent = `${num} / ${totalCartas}`;
    prevBtn.disabled = num === 1;
    nextBtn.disabled = num === totalCartas;

    // 6. Abre a carta
    setTimeout(() => {
      leftHalf.classList.remove('closed');
      leftHalf.classList.add('open');
      rightHalf.classList.remove('closed');
      rightHalf.classList.add('open');
    }, 100);

  } catch (err) {
    console.error("Erro ao carregar carta:", err);
    leftHalf.innerHTML = `<div class="card-content"><p>Erro ao carregar a carta.</p></div>`;
    rightHalf.innerHTML = leftHalf.innerHTML;
  }
}

// Carrega a primeira carta ao iniciar
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