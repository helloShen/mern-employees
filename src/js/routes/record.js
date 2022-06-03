import express from 'express';
import * as recordsControllor from '../controllors/recordControllor.js';

const recordRouter = express.Router();

recordRouter.get('/', recordsControllor.recordsList);
recordRouter.get('/add', recordsControllor.addRecordForm);
recordRouter.post('/add', recordsControllor.addRecord);
recordRouter.get('/:id', recordsControllor.singleRecord);
recordRouter.get('/update/:id', recordsControllor.updateRecord);

export default recordRouter;
