const db = require("../processes");
const Process = db.Process;
const Category = db.Category;
const Op = db.Sequelize.Op;

// Create and Save a new Process
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.description) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

     // Create a Process
  const process = {
    name: req.body.name,
    description: req.body.description
  };

   // Save Process in the database
   Process.create(process)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the Process."
     });
   });
};
  
// Create and Save new Category
exports.createCategory = (processId, category) => {
    return Category.create({
        typeCategory: comment.name,
        subTypeCategory: comment.text,
        code: comment.text,
        extensionCode: comment.text,
        exampleCode: comment.text,
        processId: processId,
    })
      .then((category) => {
        console.log(">> Created category: " + JSON.stringify(category, null, 4));
        return category;
      })
      .catch((err) => {
        console.log(">> Error while creating Category: ", err);
      });
  };

// Get the categories for a given process
exports.findProcessById = (processId) => {
    return Process.findByPk(processId, { include: ["categories"] })
      .then((process) => {
        return process;
      })
      .catch((err) => {
        console.log(">> Error while finding process: ", err);
      });
  };

// Get the categories for a given category id
exports.findCategoryById = (id) => {
    return Category.findByPk(id, { include: ["process"] })
      .then((category) => {
        return category;
      })
      .catch((err) => {
        console.log(">> Error while finding categories: ", err);
      });
  };

// Get all Processes include categories
exports.findAll = () => {
    return Process.findAll({
      include: ["categories"],
    }).then((process) => {
      return process;
    });
  };