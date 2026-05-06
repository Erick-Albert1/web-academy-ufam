const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 1. Array com os nomes dos arquivos das imagens de carros */
const images = ['bmw2.jpg', 'bmw3.jpg', 'mercedes1.jpg', 'mercedes2.jpg', 'mercedes3.jpg'];

/* 2. Objeto com os textos alternativos para cada imagem */
const alts = {
  'bmw2.jpg' : 'BMW 2 Series',
  'bmw3.jpg' : 'BMW 3 Series',
  'mercedes1.jpg' : 'Mercedes-Benz 190',
  'mercedes2.jpg' : 'Mercedes-Benz 300',
  'mercedes3.jpg' : 'Mercedes-Benz 500'
}

/* 3. Loop para criar as miniaturas */
for (const image of images) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', alts[image]);
  thumbBar.appendChild(newImage);

  /* Adiciona o evento de clique em cada miniatura */
  newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
}

/* 4. Lógica do botão de Escurecer/Clarear */
btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Clarear';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Escurecer';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});