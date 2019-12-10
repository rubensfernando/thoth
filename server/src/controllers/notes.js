const _ = require('lodash');

const notesModel = require('../models/notes');


module.exports = {
  list: async (req, res) => {
    let query = {};
    console.log('query', req.query)
    if (req.query.query) {
      const querySplit = req.query.query
        .split(' ')
        .join('|')
        .replace(/https|http|:\/\/|\/\/|www\./gi, '');
      
      const regexOpt = 'i';

      query = {
        $or: [
          { title: { $regex: querySplit, $options: regexOpt } },
          { type: { $regex: querySplit, $options: regexOpt } },
          { place: { $regex: querySplit, $options: regexOpt } },
          { text: { $regex: querySplit, $options: regexOpt } },
        ],
      };
  
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
  show: async (req, res) => {
    var id = req.params.id;
    notesModel.findOne({ _id: id }, function (err, note) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting note.',
          error: err
        });
      }
      if (!note) {
        return res.status(404).json({
          message: 'No such note'
        });
      }
      return res.json(note);
    });
  },
  update: async (req, res) => {
    var id = req.params.id;
    notesModel.findOne({ _id: id }, function (err, note) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting note',
          error: err
        });
      }
      if (!note) {
        return res.status(404).json({
          message: 'No such note'
        });
      }

      note.date = req.body.date ? req.body.date : note.date;
      note.title = req.body.title ? req.body.title : note.title;
      note.type = req.body.type ? req.body.type : note.type;
      note.place = req.body.place ? req.body.place : note.place;
      note.text = req.body.text ? req.body.text : note.text;
      note.latLng = req.body.latLng ? req.body.latLng : note.latLng;

      note.save(function (err, note) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating note.',
            error: err
          });
        }

        return res.status(200).json(note);
      });
    });
  },
};
