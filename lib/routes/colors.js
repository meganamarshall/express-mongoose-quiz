const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      hex,
      red,
      green,
      blue
    } = req.body;

    Color
      .create({ name, hex, red, green, blue })
      .then(createdColor => res.send(createdColor))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Color
      .find()
      .select({
        name: true,
        _id: true
      })
      .lean()
      .then(foundColors => res.send(foundColors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Color 
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(foundColor => res.send(foundColor))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Color
      .findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
      .select({
        name: true,
        _id: true
      })
      .lean()
      .then(updatedColor => res.send(updatedColor))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Color
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  });
