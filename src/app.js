const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/auth", authRoutes);
app.use("/api/department", require("./routes/department.route"));
app.use("/api/workspace", require("./routes/workspace.route"));
// app.use("/api/lead", require("./routes/lead.route"));
// app.use("/api/contact", require("./routes/contact.route"));

app.get("/api/health", (req, res) => {
  res.json({ message: "API is working" });
});

module.exports = app;
