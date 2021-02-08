const db = require('_helpers/db');
const Category = db.Category;


// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.typeCategory) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
     // Create a Category
  const category = {
    typeCategory: req.body.typeCategory,
    subTypeCategory: req.body.subTypeCategory,
    code: req.body.code,
    extensionCode: req.body.extensionCode,
    exampleCode: req.body.exampleCode,
    processId: req.body.processId
  };
  
   // Save Category in the database
   Category.create(category)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the Category."
     });
   });
  };

  // Get the category for a given category id
exports.findCategoryById = (req, res) => {
    const id = req.params.id;
  
    Category.findByPk(id, { include: ["process"] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error while finding category with id :" + id
        });
      });
  };

  // Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + id
        });
      });
  };

  // Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + id
        });
      });
  };
  
  