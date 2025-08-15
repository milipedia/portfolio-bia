const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas para preencher a tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Os caracteres que serão usados na animação (0 e 1)
const chars = '01';
const charArray = chars.split('');

const fontSize = 16;
// Calcula o número de colunas com base na largura da tela e no tamanho da fonte
const columns = canvas.width / fontSize;

// Cria um array para guardar a posição Y de cada coluna de caracteres
const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

// Função que desenha a animação
function draw() {
  // Cria um efeito de "rastro" ao preencher o fundo com uma cor semi-transparente
  ctx.fillStyle = 'rgba(14, 13, 27, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Define a cor dos caracteres
  ctx.fillStyle = '#06402b'; // Cor verde escura dos bits
  ctx.font = fontSize + 'px Courier New';

  // Loop através de cada coluna (drops)
  for (let i = 0; i < drops.length; i++) {
    // Pega um caractere aleatório (0 ou 1)
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    
    // Desenha o caractere na posição correta
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Se o caractere atingir o final da tela, reseta sua posição para o topo com uma chance aleatória
    // Isso cria um efeito de chuva mais irregular e interessante
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // Move o caractere para baixo na tela
    drops[i]++;
  }
}

// Inicia a animação, chamando a função draw a cada 33 milissegundos
setInterval(draw, 33);

// Ajusta o tamanho do canvas se a janela for redimensionada
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});