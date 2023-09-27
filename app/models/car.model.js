module.exports = mongoose => {
    const Car = mongoose.model(
      "car",
      mongoose.Schema(
        {
          carname: String,
          price: String,
          pricepm: String,
          description: String,
          image1: String,
          image2: String,
          image3: String,
          image4: String,
          image5: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Car;
  };


  /*
  
  If you use this app with a front-end that needs id field instead of _id, you have to override toJSON method that map default object to a custom object. So the Mongoose model could be modified as following code:
  
  module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        carname: String,
        price: String,
        pricepm: String,
        description: String,
        image1: String,
        image2: String,
        image3: String,
        image4: String,
        image5: String,
        published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Car = mongoose.model("car", schema);
  return Car;
};

  
  
  */