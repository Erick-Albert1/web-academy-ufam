function imprimirParagrafos() {
    const x = document.getElementById('numeroX').value;
    const container = document.getElementById('resultado');
    
   
    container.innerHTML = '';

    const textoLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    for (let i = 0; i < x; i++) {
        const p = document.createElement('p');
        p.innerText = `(${i + 1}) ${textoLorem}`;
        container.appendChild(p);
    }
}