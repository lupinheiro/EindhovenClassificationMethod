const config = require('config.json');
const db = require('_helpers/db');


module.exports = {
  createReport,
  updateReport,
  deleteReport: _deleteReport,
  getReportById,
  getAllReports
};


async function createReport(params, origin) {
 
  // create process object
  const report = new db.Report(params);

  // save process
  await report.save();

  return reportDetails(report);

}

async function updateReport(id, params) {
  const report = await getReport(id);

  // copy params to process and save
  Object.assign(report, params);

  await report.save();

  return reportDetails(report);
}


async function _deleteReport(id) {
  const report = await getReport(id);
  await report.destroy();
}


async function getReportById(id) {
  const report = await getReport(id);
  return reportDetails(report);
}



async function getAllReports() {
  const reports = await db.Report.findAll();
  return reports.map(x => reportDetails(x));
}

//helper functions
function reportDetails(report) {
  const { id, type, code, reportText, accountId } = report;
  return { id, type, code, reportText, accountId };
}



//get process with categories
async function getReport(id) {
  const report = await db.Report.findByPk(id);
  if (!report) throw 'Report not found';
  return report;
}

