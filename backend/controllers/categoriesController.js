const Category = require("../models/categories");

class categoriesController {
  static getAll() {
    return new Promise((resolve, reject) => {
      Category.find((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = categoriesController;
