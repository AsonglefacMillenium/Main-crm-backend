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


module.exports = {
    createDepartment
}