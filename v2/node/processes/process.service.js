module.exports = app => {
    const process = require("./process.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Process
    router.post("/", process.create);
  
    // Retrieve all Categories for a Process
    router.get("/:processId", process.findProcessCategoriesById);
  
    // Get the Process for a given process id
    router.get("/:processId", process.findProcessById);
  

    // Get all processes with categories 
    router.get("/", process.findAll);

    // Update a Process by the id in the request
    router.put("/:processId", process.update);

    // Delete a Process with the specified id in the request
    router.delete("/:processId", process.delete);

  
    app.use('/api/process', router);
  };