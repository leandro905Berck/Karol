const totalCartas = 3;
let paginaAtual = 0; // 0 = capa, 1 = carta1, 2 = carta2, etc.

const coverContainer = document.getElementById('coverContainer');
const coverContent = document.getElementById('coverContent');
const bookOpen = document.getElementById('bookOpen');
const leftHalf = document.getElementById('leftHalf');
const rightHalf = document.getElementById('rightHalf');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');
const controls = document.getElementById('controls');

// Carrega a capa
async function carregarCapa() {
  try {
    const response = await fetch('capa.html');
    coverContent.innerHTML = await response.text();
  } catch (err) {
    coverContent.innerHTML = '<div class="book-cover"><h2>Cartas para Minha Amor</h2><p>Por: Você ❤️</p></div>';
  }
}

// Carrega uma carta (páginas esquerda e direita)
async function carregarCarta(num) {
  leftHalf.classList.add('closed');
  rightHalf.classList.add('closed');

  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const response = await fetch(`cartas/carta${num}.html`);
    const html = await response.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const pageLeft = tempDiv.querySelector('.page-left')?.innerHTML || '';
    const pageRight = tempDiv.querySelector('.page-right')?.innerHTML || '';

    leftHalf.innerHTML = `<div class="page-content page-left">${pageLeft}</div>`;
    rightHalf.innerHTML = `<div class="page-content page-right">${pageRight}</div>`;

    setTimeout(() => {
      leftHalf.classList.remove('closed');
      leftHalf.classList.add('open');
      rightHalf.classList.remove('closed');
      rightHalf.classList.add('open');
    }, 100);

  } catch (err) {
    leftHalf.innerHTML = '<div class="page-content"><p>Erro ao carregar.</p></div>';
    rightHalf.innerHTML = '<div class="page-content"><p>Erro ao carregar.</p></div>';
  }
}

// Mostra capa ou livro
function mostrarModo(modo) {
  if (modo === 'capa') {
    coverContainer.style.display = 'block';
    bookOpen.style.display = 'none';
    counter.textContent = 'Capa';
  } else {
    coverContainer.style.display = 'none';
    bookOpen.style.display = 'block';
    counter.textContent = `${paginaAtual} / ${totalCartas}`;
  }
}

// Navegação
function navegar(delta) {
  const novaPagina = paginaAtual + delta;

  if (novaPagina === 0) {
    // Voltar para capa
    mostrarModo('capa');
    prevBtn.disabled = true;
    nextBtn.disabled = false;
  } else if (novaPagina >= 1 && novaPagina <= totalCartas) {
    // Ir para carta
    if (paginaAtual === 0) {
      // Primeira vez: mostrar livro
      mostrarModo('livro');
      setTimeout(() => carregarCarta(novaPagina), 300);
    } else {
      carregarCarta(novaPagina);
    }
    prevBtn.disabled = novaPagina === 1;
    nextBtn.disabled = novaPagina === totalCartas;
  }

  paginaAtual = novaPagina;
}

// Eventos
prevBtn.addEventListener('click', () => navegar(-1));
nextBtn.addEventListener('click', () => navegar(1));

// Inicializa
window.addEventListener('DOMContentLoaded', () => {
  carregarCapa();
  prevBtn.disabled = true;
  nextBtn.disabled = false;
});