const { Workspace, User } = require("../models");


const getAllWorkspaces = async () => {
  const workspaces = await Workspace.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
  });
  return workspaces.map((w) => w.toJSON());
};

// const createWorkspace = async (workspaceData) => {
//   const workspace = await Workspace.create(workspaceData);
//   return workspace.toJSON();
// }

const addUserToWorkspace = async ({ workspaceId, userId }) => {
  const workspace = await Workspace.findByPk(workspaceId);
    if (!workspace) {
        throw new Error("Workspace not found");
    }
    await workspace.addUser(userId);
    return { message: "User added to workspace" };

}


const removeUserFromWorkspace = async ({ workspaceId, userId }) => {
  const workspace = await Workspace.findByPk(workspaceId);
    if (!workspace) {
        throw new Error("Workspace not found");
    }
    await workspace.removeUser(userId);
    return { message: "User removed from workspace" };

}

const getWorkspaceById = async (workspaceId) => {
  const workspace = await Workspace.findByPk(workspaceId, {
    include: [      
        {
            model: User,
            attributes: ["id", "name", "email"],
        },
    ],
  });
  return workspace ? workspace.toJSON() : null;
}


const deleteWorkspace = async (workspaceId) => {
  const workspace = await Workspace.findByPk(workspaceId);
  if (!workspace) {
    throw new Error("Workspace not found");
  }
  await workspace.destroy();
  return { message: "Workspace deleted successfully" };
}

const updateWorkspace = async (workspaceId, updateData) => {
    const updateFields = {};
    if (updateData.name) updateFields.name = updateData.name;
    if (updateData.description) updateFields.description = updateData.description;
  const workspace = await Workspace.findByPk(workspaceId); 
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    await workspace.update(updateFields);
    return workspace.toJSON();
}


module.exports = {
  getAllWorkspaces,
  addUserToWorkspace,
  removeUserFromWorkspace,
  getWorkspaceById,
  deleteWorkspace,
  updateWorkspace
};