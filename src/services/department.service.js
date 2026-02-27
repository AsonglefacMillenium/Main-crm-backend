const { de } = require("zod/locales");
const { Department, User, Workspace, DepartmentMember } = require("../models");

//const departmentData = {name, workspaceId, description}
const createDepartment = async (departmentData) => {
  const { name, workspaceId, description } = departmentData;
  const workspace = await Workspace.findByPk(workspaceId);
  if (!workspace) {
    throw new Error("Workspace not found");
  }
  const department = await Department.create({
    name,
    description,
    WorkspaceId: workspace.id,
  });
  return department.toJSON();
};

const getDepartmentsByWorkspace = async (workspaceId) => {
  const departments = await Department.findAll({
    where: { WorkspaceId: workspaceId },
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "name", "email"],
    //   },
    // ],
  });
  return departments.map((d) => d.toJSON());
};

const getDepartmentById = async (departmentId) => {
  const department = await Department.findByPk(departmentId, {
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "name", "email"],
    //   },
    // ],
  });
  return department ? department.toJSON() : null;
};


const addUserToDepartment = async ({ departmentId, userId, workspaceId }) => {
  const department = await Department.findOne({
    where: { id: departmentId, WorkspaceId: workspaceId },
  });

  if (!department) throw new Error("Department not found");

  const user = await User.findOne({
    where: { id: userId, WorkspaceId: workspaceId },
  });

  if (!user) throw new Error("User not found in workspace");

  const alreadyAdded = await DepartmentMember.findOne({
    where: {
      DepartmentId: departmentId,
      UserId: userId,
    },
  });

  if (alreadyAdded) throw new Error("User already in department");

  await DepartmentMember.create({
    DepartmentId: departmentId,
    UserId: userId,
  });

  return { message: "User added to department" };
};

const removeUserFromDepartment = async ({ departmentId, userId, workspaceId }) => {
  const removed = await DepartmentMember.destroy({
    where: { DepartmentId: departmentId, UserId: userId },
  });

  if (!removed) throw new Error("User not in department");

  return { message: "User removed from department" };
};

const getDepartmentUsers = async ({ departmentId }) => {
  const department = await Department.findByPk(departmentId, {
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "name", "email"],
    //     through: { attributes: ["role"] }, // hides DepartmentMember
    //   },
    // ],
  });

  if (!department) throw new Error("Department not found");

  return department;
};

module.exports = {
  createDepartment,
  getDepartmentsByWorkspace,
  getDepartmentById,
  addUserToDepartment,
  removeUserFromDepartment,
  getDepartmentUsers,
};
