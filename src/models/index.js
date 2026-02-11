const Workspace = require("./workspace.model");
const Department = require("./department.model");
const User = require("./user.model");
const Product = require("./product.model");
const Lead = require("./lead.model");
const Contact = require("./contact.model");
const Task = require("./task.model");
const Activity = require("./activity.model");

// Workspace relations
Workspace.hasMany(Department);
Department.belongsTo(Workspace);

Workspace.hasMany(User);
User.belongsTo(Workspace);

Workspace.hasMany(Product);
Product.belongsTo(Workspace);

Workspace.hasMany(Lead);
Lead.belongsTo(Workspace);

// Department relations
Department.hasMany(User);
User.belongsTo(Department);

// Lead relations
Lead.hasMany(Contact);
Contact.belongsTo(Lead);

Lead.hasMany(Task);
Task.belongsTo(Lead);

Lead.hasMany(Activity);
Activity.belongsTo(Lead);

// User relations
User.hasMany(Task);
Task.belongsTo(User);

// Task relations
Task.hasMany(Activity);
Activity.belongsTo(Task);

module.exports = {
  Workspace,
  Department,
  User,
  Product,
  Lead,
  Contact,
  Task,
  Activity,
};
