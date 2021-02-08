const db = require('_helpers/db');
const Process = db.Process;
const { Op } = require('sequelize');

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

  
// Get the categories for a given Process
exports.findProcessCategoriesById = (req, res) => {
  const id = req.params.processId;

  Process.findByPk(id, { include: ["categories"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Categories for Process with id=" + id
      });
    });
};

// Get the Process for a given process id
exports.findProcessById = (req, res) => {
  const id = req.params.processId;

  Process.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error while finding process with id :" + id
      });
    });
};



// Retrieve all Processes from the database, include categories.
exports.findAll = (req, res) => {
  Process.findAll({
    include: ["categories"],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


// Update a Process by the id in the request
exports.update = (req, res) => {
  const id = req.params.processId;

  Process.update(req.body, {
    where: { processId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Process was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Process with id=${id}. Maybe Process was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Process with id=" + id
      });
    });
};



// Delete a Process with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.processId;

  Process.destroy({
    where: { processId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Process was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Process with id=${id}. Maybe Process was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Process with id=" + id
      });
    });
};