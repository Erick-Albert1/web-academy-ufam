import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 },
});

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World com TypeScript!');
});

router.get('/lorem/:paragrafos', (req: Request, res: Response) => {
  const paragrafos = Number(req.params.paragrafos);

  if (!Number.isInteger(paragrafos) || paragrafos <= 0) {
    res.status(400).json({
      error: 'O parâmetro "paragrafos" deve ser um número inteiro positivo.',
    });
    return;
  }

  const texto = lorem.generateParagraphs(paragrafos);

  res.send(texto);
});

export default router;
