const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authorize = require('_middleware/authorize')
const validateRequest = require('_middleware/validate-request');
const reportService = require('./report.service');

// routes
router.post('/createReport', registerReportSchema, createReport);
router.get('/getReportById/:id', getReportById);
router.get('/getAllReports', getAllReports);
router.put('/updateReport/:id',  updateReportSchema, updateReport);
router.delete('/deleteReport/:id', _deleteReport);


module.exports = router;

function registerReportSchema(req, res, next) {
  const schema = Joi.object({
    type: Joi.string().required(),
    code: Joi.string().required(),
    reportText: Joi.string().required(),
    accountId: Joi.number().required()
  });
  validateRequest(req, next, schema);
}

function createReport(req, res, next) {
  reportService.createReport(req.body, req.get('origin'))
      .then(() => res.json({ message: 'successful creation of the report' }))
      .catch(next);
}


function getAllReports(req, res, next) {
    reportService.getAllReports()
      .then(reports => res.json(reports))
      .catch(next);
}


function getReportById(req, res, next) {
    reportService.getReportById(req.params.id)
      .then(report => report ? res.json(report) : res.sendStatus(404))
      .catch(next);
}


function updateReportSchema(req, res, next) {
  const schemaRules = {
    type: Joi.string().required(),
    code: Joi.string().required(),
    report: Joi.string().required(),
    accountId: Joi.number().required()
  };

  const schema = Joi.object(schemaRules);
  validateRequest(req, next, schema);
}


function updateReport(req, res, next) {
  reportService.updateReport(req.params.id, req.body)
      .then(report => res.json(report))
      .catch(next);
}


function _deleteReport(req, res, next) {
  reportService.deleteReport(req.params.id)
      .then(() => res.json({ message: 'Report deleted successfully' }))
      .catch(next);
}
