const _ = require('lodash');

const notesModel = require('../models/notes');


module.exports = {
  list: async (req, res) => {
    const query = {};

    if (req.query) {
      Object.keys(req.query).forEach((q) => {
        if (req.query[q] !== '') {
          let value = req.query[q];
          if (value === 'true' || value === 'false') {
            value = value === 'true';
          }
          query[q] = req.query[q];
        }
      });
    }

    const notes = await notesModel
      .find(query)
      .then((result) => {
        return result;
      })
    return res.status(201).json({
      success: true,
      notes,
    });
  },
  create: function (req, res) {
    const notes = new notesModel({
      date : req.body.date,
      title : req.body.title,
      type : req.body.type,
      place : req.body.place,
      text : req.body.text,
      latLng : req.body.latLng
    });

    notes.save(function (err, notes) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating notes',
          error: err
        });
      }
      return res.status(201).json(notes);
    });
},
};
