import express from "express";
import bodyParser from "body-parser";
import xmlParser from "express-xml-bodyparser";
import router from "./routes";
import { errorHandler } from "./middlewares";
import { dbconnect } from "./db/connection";

const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(xmlParser({ trim: false, explicitArray: false }));

// Connect to MongoDB
dbconnect();

app.use("/", router);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

export default app;
