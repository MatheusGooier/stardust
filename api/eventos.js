const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const EventoSchema = new mongoose.Schema({
  // id: String,
  titulo: String,
  text: String,
  dataEvento: Date,
  price: Number,
  horarioEvento: String,
});

const Eventos = mongoose.model("eventos", EventoSchema, "Evento");

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function (error) {
    if (error) console.log("Error!" + error);
  }
);

module.exports = function (req, res) {
  if (req.method === "GET") {
    Eventos.find()
      .then((evento) => {
        res.status(200).json(evento);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "POST") {
    const newEvento = new Eventos(req.body);
    newEvento
      .save()
      .then((newEvento) => {
        res.status(200).json(newEvento);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "PUT") {
    const { evento, _id } = req.body;
    Eventos.findByIdAndUpdate(_id, evento, { returnOriginal: false })
      .then((updatedEvento) => {
        res.status(200).json(updatedEvento);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "DELETE") {
    const { _id } = req.body;
    Eventos.findByIdAndDelete(_id)
      .then((deletedEvento) => {
        res.status(200).json(deletedEvento);
      })
      .catch((error) => res.status(500).json(error.message));
  }
};
