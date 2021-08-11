const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const centroCustoSchema = new mongoose.Schema({
  // id: String,
  titulo: String,
  tipo: String,
});

const CentroCustos = mongoose.model(
  "centroCustos",
  centroCustoSchema,
  "CentroCusto"
);

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function (error) {
    if (error) console.log("Error!" + error);
  }
);

module.exports = function (req, res) {
  if (req.method === "GET") {
    CentroCustos.find()
      .then((cc) => {
        res.status(200).json(cc);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "POST") {
    const newCc = new CentroCustos(req.body);
    newCc
      .save()
      .then((newCc) => {
        res.status(200).json(newCc);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "PUT") {
    const { cc, _id } = req.body;
    CentroCustos.findByIdAndUpdate(_id, cc, { returnOriginal: false })
      .then((updatedCc) => {
        res.status(200).json(updatedCc);
      })
      .catch((error) => res.status(500).json(error.message));
  } else if (req.method === "DELETE") {
    const { _id } = req.body;
    CentroCustos.findByIdAndDelete(_id)
      .then((deletedCc) => {
        res.status(200).json(deletedCc);
      })
      .catch((error) => res.status(500).json(error.message));
  }
};
