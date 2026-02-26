const { Department, User, Workspace } = require('../models');

//const departmentData = {name, workspaceId, description}
const createDepartment = async (departmentData) => {
    const { name, workspaceId, description } = departmentData;
    const workspace = await Workspace.findByPk(workspaceId);
    if (!workspace) {
        throw new Error('Workspace not found');
    }
    const department = await Department.create({
        name,
        description,
        workspaceId: workspace.id
    });
    return department;
}

module.exports = {
    createDepartment
}