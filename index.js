
/* 
    0. CMD -> mongosh , enter : to start mongo shell
    1. npm init -y
    2. npm i mongoose
    3. touch index.js
    4. mongoosejs.com --> require and connect code (copy-paste)

*/
const mongoose = require('mongoose');

main()
    .then(() => console.log("Connected to the database."))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  /* 
    .connect() - is a asynchronous function : it awaits for a promise from
    the db after execution.
    .connect() basically connects js file with mongo database.

    > Once the connection is successful, we can now perform the CRUD opertions

    SCHEMA :
    - Overall structure / Blueprint
    - shape of documents within a collection
    - .Schema --> class to create schema

    MODELS :
    - Model in mongoose is a class(.model) with which we construct documents.


    * Schema --> Document's structutre
    * Model  --> Collection
    * Model's Objects --> Actual documents 
    
  */
}

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  age:String
});

const User = mongoose.model("User", userSchema); //in mongodb it will become "users" collection which will follow userSchema

//INSERT ONE --> .save()
const user1 = new User({
  name: "Adam",
  email: "adam99@gmail.com",
  age: 32
});
//user1.save();

/*
  INSERT MANY --> use array
 .insertMany() --> Returns promise so, we can use then and catch
*/

// User.insertMany([
//   {
//     name: "Eve",
//     email: "Eve4@gmail.com",
//     age: 31
//   },
//   {
//     name: "John",
//     email: "john78@gmail.com",
//     age: 34
//   }
// ]).then((data) => {
//   console.log(data);
// });

/*
  FIND --> model_name.find()
  - returns a Query object (thennable)
  - .find() --> returns array
  - .findOne() --> returns a single object

  * Mongoose queries doesn't returns promise but are thennable
*/

// User.findOne({age: {$gte: 32}}).then((data) => {
//   console.log(data);
// });

/* 
  UPDATE
  - .updateOne({filter}, {update}, {option})
  - .updateMany()
  - thennable
*/

// User.updateOne({name: "Adam"}, {age : 44}).then((data) => {
//   console.log(data);   //but it will not print the actual data
// });

/* 
   To print the actual data , we use : 
   - findOneAndUpdate({filter}, {update}, {option}) option = new:true - to print updated data
   - findByIdAndUpdate()

*/

// User.findOneAndUpdate({name: "Adam"}, {age: 36}, {new: true}).then((data) => {
//   console.log(data);
// });


/*
  DELETE
  - .deleteOne({consdition/ filter}, {option}) --> returns count
  - to print actual data
    - .findByIdAndDelete()
    - .findOneAndDelete()
*/

// User.findByIdAndDelete("681ca9e572c85b616b72ef08").then((data) => {
//   console.log(data);
// });

/* 
  SCHEMA VALIDATIONS
  - Basic rules for schema
  Eg : {
    title : {
      type: String,
      required : true,
    },
    price : {
      type : Number,
      default : 2,
      min : [1, "Plese enter a valid price"]
    }
    category : {
      type : String,
      enum : ["fiction", "non-fiction"]
    }
  }
  * Schema validations doesn't work with update, to make it work in {option} write : {runValidators: true}
*/
