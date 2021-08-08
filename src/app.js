const express = require("express");
const app = express();
const flips = require("./data/flips-data")
const counts = require("./data/counts-data")

app.use(express.json())

// TODO: Follow instructions in the checkpoint to implement ths API.
app.get("/flips/:flipId", (req, res, next) => {
  const { flipId } = req.params;
  const foundFlip = flips.find((flip) => flip.id === Number(flipId));
  if (foundFlip) {
    res.json({ data: foundFlip });
  } else {
    next(`Flip id not found: ${flipId}`);
  }
});

app.get("/flips", (req, res, next)=>{
  res.json({data:flips})
})

let lastFlipId = flips.reduce( (maxId, flip) =>{ return Math.max(maxId, flip)}, 0)

app.post("/flips", (req, res, next)=>{
  const { data: {result} = {} } = req.body
  const newFlip = {id:lastFlipId++, result}
  flips.push(newFlip)
  count[result] = count[result] + 1
  res.json({data:newFlip})
})

app.get("/counts/:countId", (req, res, next) => {
  const { countId } = req.params;
  const foundCount = counts[countId];

  if (foundCount === undefined) {
    res.status(400).next(`Count id not found: ${countId}`);
  } else {
    res.json({ data: foundCount }); // Return a JSON object, not a number.
  }
});

app.get("/counts", (req, res)=>{
  res.json({data:counts})
})
// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});




// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
