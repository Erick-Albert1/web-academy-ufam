import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 },
});

function index(_req: Request, res: Response): void {
  res.send('Hello World com TypeScript!');
}

function loremIpsum(req: Request, res: Response): void {
  const paragrafos = Number(req.params.paragrafos);

  if (!Number.isInteger(paragrafos) || paragrafos <= 0) {
    res.status(400).json({
      error: 'O parâmetro "paragrafos" deve ser um número inteiro positivo.',
    });
    return;
  }

  const texto = lorem.generateParagraphs(paragrafos);

  res.send(texto);
}

function hb1(_req: Request, res: Response): void {
  res.render('main/hb1');
}

function hb2(_req: Request, res: Response): void {
  res.render('main/hb2');
}

function hb3(_req: Request, res: Response): void {
  res.render('main/hb3');
}

function hb4(_req: Request, res: Response): void {
  const tecnologias = [
    { name: 'Express', type: 'framework', poweredByNodejs: true },
    { name: 'NestJS', type: 'framework', poweredByNodejs: true },
    { name: 'Django', type: 'framework', poweredByNodejs: false },
    { name: 'Fastify', type: 'framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'framework', poweredByNodejs: false },
  ];

  res.render('main/hb4', { tecnologias });
}

export default { index, loremIpsum, hb1, hb2, hb3, hb4 };
