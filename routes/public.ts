import express, { Request, Response, NextFunction } from 'express';
import * as publicController from '../controllers/public';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.render('index');
});

// GET /feed/posts
router.get('/getItems', publicController.getItems);
router.get('/getAll', publicController.getAll);
router.post('/update', publicController.update);
router.post('/vote', publicController.update);

export = router;
