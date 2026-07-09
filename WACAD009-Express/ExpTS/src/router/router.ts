import { Router } from 'express';
import mainController from '../controllers/main';
import productController from '../controllers/product';

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:paragrafos', mainController.loremIpsum);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get('/product', productController.index);
router.get('/product/create', productController.create);
router.post('/product/create', productController.create);
router.get('/product/update/:id', productController.update);
router.post('/product/update/:id', productController.update);
router.get('/product/:id', productController.read);
router.post('/product/:id', productController.remove);

export default router;
