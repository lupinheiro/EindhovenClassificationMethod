const config = require('config.json');
const db = require('_helpers/db');


module.exports = {
  createProcess,
  createCategory,
  updateProcess,
  updateCategory,
  deleteProcess: _deleteProcess,
  deleteCategory: _deleteCategory,
  getProcessById,
  getCategoryById,
  getAllProcesses,
  getAllCategories
};


async function createProcess(params, origin) {
 
  // create process object
  const process = new db.Process(params);

  // save process
  await process.save();

  return processDetails(process);

}

async function createCategory(params, origin) {
 
  // create category object
  const category = new db.Category(params);

  // save process
  await category.save();

  return categoryDetails(category);

}

async function updateProcess(id, params) {
  const process = await getProcess(id);

  // copy params to process and save
  Object.assign(process, params);

  await process.save();

  return processDetails(process);
}

async function updateCategory(id, params) {
  const category = await getCategory(id);

  // copy params to process and save
  Object.assign(category, params);

  await category.save();

  return categoryDetails(category);
}


async function _deleteProcess(id) {
  const process = await getProcess(id);
  await process.destroy();
}

async function _deleteCategory(id) {
  const category = await getCategory(id);
  await category.destroy();
}

async function getProcessById(id) {
  const process = await getProcess(id);
  return processDetails(process);
}

async function getCategoryById(id) {
  const category = await getCategory(id);
  return categoryDetails(category);
}

async function getAllProcesses() {
  const processes = await db.Process.findAll({ include: ["categories"] });
  return processes.map(x => processDetails(x));
}

async function getAllCategories() {
  const categories = await db.Category.findAll();
  return categories.map(x => categoryDetails(x));
}

//helper functions
function categoryDetails(category) {
  const { id, typeCategory, subTypeCategory, code, extensionCode, exampleCode } = category;
  return { id, typeCategory, subTypeCategory, code, extensionCode, exampleCode};
}

function processDetails(process) {
  const { id, name, description, categories} = process;
  return { id, name, description, categories};
}

//get process with categories
async function getProcess(id) {
  const process = await db.Process.findByPk(id, { include: ["categories"] });
  if (!process) throw 'Process not found';
  return process;
}

async function getCategory(id) {
  const category = await db.Category.findByPk(id);
  if (!category) throw 'Category not found';
  return category;
}
