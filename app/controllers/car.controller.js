const db = require("../models");
const Car = db.cars;

// Add and Save a new Car
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a car
    const car = new Car({
        carname: req.body.carname,
        price: req.body.price,
        pricepm: req.body.pricepm,
        description: req.body.description,
        image1: req.body.image1,
        image2:req.body.image2,
        image3:req.body.image3,
        image4:req.body.image4,
        image5:req.body.image5,
        published: req.body.published ? req.body.published : false
    });
  
    // Save Car in the database
    car
      .save(car)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Car."
        });
      });
  };


  // Retrieve all Cars from the database.
exports.findAll = (req, res) => {
    const carname = req.query.carname;
    var condition = carname ? { carname: { $regex: new RegExp(carname), $options: "i" } } : {};
  
    Car.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      });
};

// Find a single Car with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Car.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Car with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Car with id=" + id });
    });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Car with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Car was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Car with id=" + id
          });
        });
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Car.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
          });
        } else {
          res.send({
            message: "Car was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Car with id=" + id
        });
      });
};

// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
    Car.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cars were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cars."
      });
    });
};

// Find all published Cars
exports.findAllPublished = (req, res) => {
    Car.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cars."
      });
    });
};