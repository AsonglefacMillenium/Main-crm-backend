require("dotenv").config();
const app = require("./app");


const sequelize = require("./config/database");
const models = require("./models"); // make sure all models imported

sequelize.sync({ force: false }) // set true only if you want to drop/recreate tables
  .then(() => {
    console.log("Database synced ✅");
  })
  .catch(err => console.log("DB sync error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
