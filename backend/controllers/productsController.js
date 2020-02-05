const Product = require("../models/products");

class productsController {
  static getAll() {
    return new Promise((resolve, reject) => {
      Product.find()
        .populate("category")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static addProduct(body, file) {
    return new Promise((resolve, reject) => {
      let { name, category, price } = body;
      let { filename } = file;

      let newProduct = new Product({
        name: name,
        category: category,
        price: price,
        image: filename
      });
      console.log(newProduct);

      newProduct.save(function(err, data) {
        if (err) reject(err);
        resolve(productsController.getAll());
      });
    });
  }

  static updateProduct(body, file) {
    const { name, id, price, category } = body;

    return new Promise((resolve, reject) => {
      if (typeof file === "undefined") {
        Product.findByIdAndUpdate(
          id,
          {
            name: name,
            category: category,
            price: price
          },
          function(err, docs) {
            if (err) {
              reject(err);
            } else {
              resolve(productsController.getAll());
            }
          }
        );
      } else {
        let { filename } = file;
        Product.findByIdAndUpdate(
          id,
          {
            name: name,
            category: category,
            price: price,
            image: filename
          },
          function(err, docs) {
            if (err) {
              reject(err);
            } else {
              resolve(productsController.getAll());
            }
          }
        );
      }
    });
  }

  // static getSingleProduct(id) {
  //   return new Promise((resolve, reject) => {
  //     Product.findById(id, function(err, product) {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(product);
  //       }
  //     });
  //   });
  // }

  static searchProduct(req) {
    const { name } = req.params;
    return new Promise((resolve, reject) => {
      Product.find({ name: { $regex: "^" + name, $options: "i" } }, function(
        err,
        product
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(product);
        }
      });
    });
  }

  static getProductsByCategory(req) {
    const { id } = req.params;
    console.log(id);

    return new Promise((resolve, reject) => {
      Product.find({ category: id }, function(err, products) {
        if (err) {
          reject(err);
        } else {
          resolve(products);
        }
      });
    });
  }

  static deleteProduct(req) {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      Product.findOneAndRemove({ _id: id }, (err, cartItems) => {
        if (err) reject(err);

        resolve(productsController.getAll());
      });
    });
  }
}

module.exports = productsController;
