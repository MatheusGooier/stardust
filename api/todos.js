const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const todosSchema = new mongoose.Schema({
  titulo: String,
  text: String,
  price: Number,
  complete: Boolean,
  tipo: String,
  dataVencimento: Date,
  centroCusto: Array,
  eventoId: String,
});

const Todos = mongoose.model("Todos", todosSchema, "Todo");

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function (error) {
    if (error) console.log("Error!" + error);
  }
);

module.exports = function (req, res) {
  if (req.method === "GET") {
    Todos.find()
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "POST") {
    const newTodo = new Todos(req.body);
    newTodo
      .save()
      .then((newTodo) => {
        res.status(200).json(newTodo);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "PUT") {
    const { todo, _id } = req.body;
    Todos.findByIdAndUpdate(_id, todo, { returnOriginal: false })
      .then((updatedTodo) => {
        res.status(200).json(updatedTodo);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "DELETE") {
    const _id = req.body._id;
    Todos.findByIdAndDelete(_id)
      .then((deletedTodo) => {
        res.status(200).json(deletedTodo);
      })
      .catch((error) => res.status(500).json(error.message));
  }
};
