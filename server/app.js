const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGOURI } = require("./Config/keys");
const PORT = process.env.PORT || 3000;

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
const userRoutes = require("./Routes/user");

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
