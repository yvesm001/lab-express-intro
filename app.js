const express = require("express");

const app = express();

const morgan = require("morgan");

const logger = morgan("dev");

const data = require("./db.json");

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(logger);

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

app.get("/people", async (req, res) => {
  res.json(data);
});

app.get("/people/:personId", async (req, res) => {
  const { personId } = req.params;

  const singlePerson = data.find((person) => person.id.toString() === personId);
  if (!singlePerson) {
    res.json({ message: "There is no one with this ID" });
  }

  res.json(singlePerson);
});

app.get("/people/country/:country", async (req, res) => {
  const { country } = req.params;

  const filteredByCountry = data.filter(
    (person) => person.country.split(" ").join("").toLowerCase() === country
  );

  res.json(filteredByCountry);
});

app.get("/people/age/:age", async (req, res) => {
  const { age } = req.params;

  const filteredByAge = data.filter((person) => person.age.toString() >= age);

  res.json(filteredByAge);
});

app.get("/people/profession/:profession", async (req, res) => {
  const { profession } = req.params;

  const filteredByProfession = data.filter(
    (person) =>
      person.profession.split(" ").join("").toLowerCase() === profession
  );

  res.json(filteredByProfession);
});
