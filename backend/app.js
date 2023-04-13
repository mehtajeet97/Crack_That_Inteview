// Main logic
import express from "express";
import resp from "./routes/index.js";
const app = express();

app.use(express.json());
resp(app);

const middleware = () => {
  console.log("123");
};

app.listen(3000, () => {
  console.log("The server is online");
});
