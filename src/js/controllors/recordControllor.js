import Record from '../models/record.js';

export function recordsList(req, res, next) {
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) return next(err);
      if (records == null) {
        const err = new Error('Records not found.');
        err.status = 404;
        return next(err);
      }
      // send json object
      // res.json(records);
      // render in handlebars template
      res.locals.records = records;
      res.render('records', {layout: 'index'});
    });
}

export function singleRecord(req, res, next) {
  Record.findById(req.params.id)
    .lean()
    .exec((err, record) => {
      if (err) return next(err);
      if (record == null) {
        const err = new Error('Record not found.');
        err.status = 404;
        return next(err);
      }
      // send json object
      // res.json(record);
      // render in handlebars template
      res.locals.record = record;
      res.render('record', {layout: 'index'});
    });
}

export function addRecordForm(req, res, next) {
  res.render('addRecordForm', {layout: 'index'});
}

export function addRecord(req, res, next) {
  const newRecord = new Record({
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  });
  newRecord.save((err, theRecord) => {
    if (err) return next(err);
    res.redirect('/');
    // res.json(theRecord);
  });
}

export function updateRecord(req, res, next) {
  if (req.params.id == null) {
    const err = new Error('Must specify the id of the record to be updated.');
    next(err);
  }
  const newRecord = new Record({
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
    _id: req.params.id,
  });
  Record.findByIdAndUpdate(req.params.id, newRecord, {}, (err, theRecord) => {
    if (err) return next(err);
    res.json(theRecord);
  });
}

export function deleteRecord(req, res, next) {
  if (req.params.id == null) {
    const err = new Error('Must specify the id of the record to be deleted.');
    next(err);
  }
  Record.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
  });
}

