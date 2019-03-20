const express = require("express");
const router = express.Router();

// Form Model
const Form = require("../../model/form");

router.get("/", (req, res) => {
  Form.find()
    .sort({ date: -1 })
    .then(emails => res.json(emails));
  //res.status(200).send({ data: "hello world" });
});

router.post("/", (req, res) => {
  const newForm = new Form({
    email: req.body.email
  });

  newForm.save().then(email => res.json(email));

  //res.status(200).send({ status: "success" });
});

module.exports = router;
