const totalCartas = 3; // ajuste conforme o número de cartas
let cartaAtual = 1;

const frame = document.getElementById('cartaFrame');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

function carregarCarta(num) {
  frame.src = `cartas/carta${num}.html`;
  counter.textContent = `${num} / ${totalCartas}`;

  prevBtn.disabled = num === 1;
  nextBtn.disabled = num === totalCartas;
}

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

// Carrega a primeira carta ao iniciar
carregarCarta(cartaAtual);