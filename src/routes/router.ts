import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

router.get('/', controller.getRootData);
router.get('/:route', controller.getAllData);
router.get('/:route/:id', controller.getSpecificItem);
router.get('/images/:folder/:file', controller.getImage);

export = router;
