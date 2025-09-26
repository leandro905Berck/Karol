    const totalLetters = 3;
    let currentLetter = 1;
    let letterStates = {
      1: false,  // false = fechada, true = aberta
      2: false,
      3: false
    };

    // Função para abrir a seção de cartas
    function openLetters() {
      const cover = document.getElementById('lettersCover');
      const section = document.getElementById('lettersSection');
      
      cover.style.transform = 'translateY(-20px)';
      cover.style.opacity = '0';
      
      setTimeout(() => {
        cover.style.display = 'none';
        section.style.display = 'block';
        showLetter(1);
      }, 600);
    }

    // Função para voltar ao menu
    function backToMenu() {
      const cover = document.getElementById('lettersCover');
      const section = document.getElementById('lettersSection');
      
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        section.style.display = 'none';
        cover.style.display = 'block';
        cover.style.opacity = '0';
        cover.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          cover.style.opacity = '1';
          cover.style.transform = 'translateY(0)';
        }, 100);
        
        // Reset states
        currentLetter = 1;
        for (let i = 1; i <= totalLetters; i++) {
          letterStates[i] = false;
          document.getElementById(`envelope${i}`).classList.remove('opened');
        }
      }, 300);
    }

    // Função para mostrar uma carta específica
    function showLetter(letterNum) {
      // Esconder todas as cartas
      for (let i = 1; i <= totalLetters; i++) {
        document.getElementById(`letter${i}`).classList.remove('active');
      }
      
      // Mostrar a carta atual
      document.getElementById(`letter${letterNum}`).classList.add('active');
      currentLetter = letterNum;
      
      // Atualizar controles
      updateControls();
    }

    // Função para abrir uma carta específica
    function openLetter(letterNum) {
      const envelope = document.getElementById(`envelope${letterNum}`);
      envelope.classList.add('opened');
      letterStates[letterNum] = true;
    }

    // Navegação
    function nextLetter() {
      if (currentLetter < totalLetters) {
        showLetter(currentLetter + 1);
      }
    }

    function previousLetter() {
      if (currentLetter > 1) {
        showLetter(currentLetter - 1);
      }
    }

    // Atualizar estado dos controles
    function updateControls() {
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const counter = document.getElementById('counter');
      
      prevBtn.disabled = currentLetter === 1;
      nextBtn.disabled = currentLetter === totalLetters;
      counter.textContent = `${currentLetter} / ${totalLetters}`;
    }

    // Inicialização
    document.addEventListener('DOMContentLoaded', () => {
      updateControls();
      
      // Reset das seções
      document.getElementById('lettersSection').style.opacity = '1';
      document.getElementById('lettersSection').style.transform = 'translateY(0)';
    });

    // Efeitos de teclado
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('lettersSection').style.display !== 'none') {
        if (e.key === 'ArrowLeft') previousLetter();
        if (e.key === 'ArrowRight') nextLetter();
        if (e.key === ' ') {
          e.preventDefault();
          openLetter(currentLetter);
        }
      }
    });