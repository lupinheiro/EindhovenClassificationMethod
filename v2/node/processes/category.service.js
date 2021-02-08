module.exports = app => {
    const category = require("./category.controller");
  
    var router = require("express").Router();
  
    // Create a new Category
    router.post("/", category.create);
  
    // Get the category for a given category id
    router.get("/:id", category.findCategoryById);

    // Update a Category by the id in the request
    router.put("/:id", category.update);
  
    // Delete a Process with the specified id in the request
    router.delete("/:id", category.delete);

  
    app.use('/category', router);
  };