const express = require("express");
const cors = require("cors");
const app = express();
const rssRoutes = require("./routes/rssRoutes");

app.use(cors()); // Middleware CORS para habilitar o feed no console
app.use("/rss", rssRoutes); // as rotas principais do projeto

app.use(express.static("public"));

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
