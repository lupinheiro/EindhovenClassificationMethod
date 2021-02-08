const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authorize = require('_middleware/authorize')
const validateRequest = require('_middleware/validate-request');
const processService = require('./process.service');

// routes
router.post('/createProcess', registerProcessSchema, createProcess);
router.post('/createCategory', registerCategorySchema, createCategory);
router.get('/getProcessById/:id', getProcessById);
router.get('/getCategoryById/:id', getCategoryById);
router.get('/getAllProcesses', getAllProcesses);
router.get('/getAllCategories', getAllCategories);
router.put('/updateProcess/:id',  updateProcessSchema, updateProcess);
router.put('/updateCategory/:id', updateCategorySchema, updateCategory);
router.delete('/deleteProcess/:id', _deleteProcess);
router.delete('/deleteCategory/:id', _deleteCategory);


module.exports = router;

function registerProcessSchema(req, res, next) {
  const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function registerCategorySchema(req, res, next) {
  const schema = Joi.object({
    typeCategory: Joi.string().required(),
    subTypeCategory: Joi.string().required(),
    code: Joi.string().required(),
    extensionCode: Joi.string().required(),
    exampleCode: Joi.string().required(),
    processId: Joi.number().required()
  });
  validateRequest(req, next, schema);
}

function createProcess(req, res, next) {
  processService.createProcess(req.body, req.get('origin'))
      .then(() => res.json({ message: 'successful creation of the process' }))
      .catch(next);
}

function createCategory(req, res, next) {
  processService.createCategory(req.body, req.get('origin'))
      .then(() => res.json({ message: 'successful creation of the category' }))
      .catch(next);
}

function getAllProcesses(req, res, next) {
  processService.getAllProcesses()
      .then(processes => res.json(processes))
      .catch(next);
}

function getAllCategories(req, res, next) {
  processService.getAllCategories()
      .then(categories => res.json(categories))
      .catch(next);
}

function getProcessById(req, res, next) {
  processService.getProcessById(req.params.id)
      .then(process => process ? res.json(process) : res.sendStatus(404))
      .catch(next);
}

function getCategoryById(req, res, next) {
  processService.getCategoryById(req.params.id)
      .then(process => category ? res.json(category) : res.sendStatus(404))
      .catch(next);
}

function updateProcessSchema(req, res, next) {
  const schemaRules = {
      name: Joi.string().empty(''),
      description: Joi.string().empty('')
  };

  const schema = Joi.object(schemaRules);
  validateRequest(req, next, schema);
}

function updateCategorySchema(req, res, next) {
  const schemaRules = {
    typeCategory: Joi.string().required(),
    subTypeCategory: Joi.string().required(),
    code: Joi.string().required(),
    extensionCode: Joi.string().required(),
    exampleCode: Joi.string().required(),
    processId: Joi.number().required()
  };

  const schema = Joi.object(schemaRules);
  validateRequest(req, next, schema);
}

function updateProcess(req, res, next) {
  processService.updateProcess(req.params.id, req.body)
      .then(process => res.json(process))
      .catch(next);
}

function updateCategory(req, res, next) {
  processService.updateCategory(req.params.id, req.body)
      .then(category => res.json(category))
      .catch(next);
}

function _deleteProcess(req, res, next) {
  processService.deleteProcess(req.params.id)
      .then(() => res.json({ message: 'Process deleted successfully' }))
      .catch(next);
}
function _deleteCategory(req, res, next) {
  processService.deleteCategory(req.params.id)
      .then(() => res.json({ message: 'Category deleted successfully' }))
      .catch(next);
}