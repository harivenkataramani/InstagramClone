const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const PORT = 5000;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (error) => {
  console.log("error in connection", error);
});

require("./Model/UserModel/user");
require("./Model/PostModel/post");
const authRoutes = require("./Routes/auth");
const postRoutes = require("./Routes/post");

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
