const DepartmentService = require("../services/department.service");

const createDepartment = async (req, res) => {
    try {
      const { name, description } = req.body;
      const userWorkspaceId = req.user.WorkspaceId; // Ensure the user is part of the workspace
      const departmentData = { name, workspaceId: userWorkspaceId, description };
      const department = await DepartmentService.createDepartment(departmentData);
      res.status(201).json(department);
     // return department.toJSON();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }


  const getDepartmentsByWorkspace = async (req, res) => {
    try {
      const userWorkspaceId = req.user.WorkspaceId; // Ensure the user is part of the workspace
        const departments = await DepartmentService.getDepartmentsByWorkspace(userWorkspaceId); 
        res.status(200).json(departments);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }


  const getDepartmentById = async (req, res) => {
    try {
      const departmentId = req.params.id;
      const department = await DepartmentService.getDepartmentById(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
      res.status(200).json(department);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }


  const addUserToDepartment = async (req, res) => {
  try {
    const { departmentId, userId } = req.body;
    const workspaceId = req.user.WorkspaceId;

    const result = await DepartmentService.addUserToDepartment({
      departmentId,
      userId,
      workspaceId,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeUserFromDepartment = async (req, res) => {
  try {
    const { departmentId, userId } = req.params;
    const workspaceId = req.user.WorkspaceId;

    const result = await DepartmentService.removeUserFromDepartment({
      departmentId,
      userId,
      workspaceId,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getDepartmentUsers = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const workspaceId = req.user.WorkspaceId;

    const users = await DepartmentService.getDepartmentUsers({
      departmentId,
      workspaceId,
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



module.exports = {
    createDepartment,
    getDepartmentsByWorkspace,
    getDepartmentById,
    addUserToDepartment,
    removeUserFromDepartment,
    getDepartmentUsers,
}
  