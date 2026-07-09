import Handlebars from 'handlebars';

interface Tecnologia {
  name: string;
  type: string;
  poweredByNodejs: boolean;
}

function listaTecnologiasNodejs(tecnologias: Tecnologia[]): Handlebars.SafeString {
  const itens = tecnologias
    .filter((tecnologia) => tecnologia.poweredByNodejs)
    .map((tecnologia) => `<li>${tecnologia.name} (${tecnologia.type})</li>`)
    .join('');

  return new Handlebars.SafeString(`<ul>${itens}</ul>`);
}

export default { listaTecnologiasNodejs };
