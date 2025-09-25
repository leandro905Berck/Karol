const totalCartas = 3; // Ajuste conforme o número de cartas
let cartaAtual = 1;

const letter = document.getElementById('letter');
const frame = document.getElementById('cartaFrame');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

function carregarCarta(num) {
  // 1. Fecha a carta (adiciona classe 'closed')
  letter.classList.remove('open');
  letter.classList.add('closed');

  // 2. Aguarda a animação de fechar terminar
  setTimeout(() => {
    // 3. Troca o conteúdo (carrega nova carta)
    frame.src = `cartas/carta${num}.html`;

    // 4. Atualiza controles
    counter.textContent = `${num} / ${totalCartas}`;
    prevBtn.disabled = num === 1;
    nextBtn.disabled = num === totalCartas;

    // 5. Reabre a carta após um pequeno delay
    setTimeout(() => {
      letter.classList.remove('closed');
      letter.classList.add('open');
    }, 300); // Delay para garantir que o iframe carregue antes de abrir
  }, 600); // Tempo da animação de fechar (600ms)
}

// Inicializa com a carta aberta
window.addEventListener('load', () => {
  letter.classList.remove('closed');
  letter.classList.add('open');
});

// Eventos dos botões
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