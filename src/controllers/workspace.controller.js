const WorkspaceService = require("../services/workspace.service");

const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await WorkspaceService.getAllWorkspaces();
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUserToWorkspace = async (req, res) => {
  try {
    const { workspaceId, userId } = req.body;
    const result = await WorkspaceService.addUserToWorkspace({
      workspaceId,
      userId,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeUserFromWorkspace = async (req, res) => {
  try {
    const { workspaceId, userId } = req.body;
    const result = await WorkspaceService.removeUserFromWorkspace({
      workspaceId,
      userId,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWorkspaceById = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await WorkspaceService.getWorkspaceById(workspaceId);
    res.status(200).json(workspace);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const result = await WorkspaceService.deleteWorkspace(workspaceId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const updateWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params; 
    const updateData = req.body;
    const updatedWorkspace = await WorkspaceService.updateWorkspace(workspaceId, updateData);
    res.status(200).json(updatedWorkspace);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkspaces,
  addUserToWorkspace,
  removeUserFromWorkspace,
  getWorkspaceById,
 // getDepartmentsByWorkspace,
  deleteWorkspace,
  updateWorkspace,
};
