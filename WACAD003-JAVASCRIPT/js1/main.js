const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "Estava fazendo 34 graus lá fora, então :insertx: foi dar uma volta. Quando chegou em :inserty:, ele acelerou fundo, o que fez com que :insertz:. Bob viu tudo e ficou impressionado, mas não surpreso — :insertx: pesa 1500 quilos, e o sol estava de rachar.";

const insertX = ["Um Fusca turbinado", "Relâmpago McQueen", "Um Opala seis canecos"];
const insertY = ["Interlagos", "uma subida de serra", "um drive-thru do McDonald's"];
const insertZ = ["o motor saltasse pelo capô", "ele fizesse um drift perfeito", "o pneu furasse na hora"];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':insertx:', xItem); 
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(1500 * 0.157473) + ' stones';
    const temperature =  Math.round((34 * 9/5) + 32) + ' fahrenheit';
    newStory = newStory.replace('1500 quilos', weight);
    newStory = newStory.replace('34 graus', temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}