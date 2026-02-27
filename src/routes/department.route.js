const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/requireRole");

/**
 * @swagger
 * tags:
 *   name: Department
 *   description: Department Management
 */

/**
 * @swagger
 * /api/department:
 *   post:
 *    summary: Create a new department
 *    tags: [Department]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *    responses:
 *     201:
 *       description: Department created successfully
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 * */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  departmentController.createDepartment,
);

/**
 * @swagger
 * /api/department/workspace:
 *   get:
 *    summary: Get all departments in the workspace
 *    tags: [Department]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *       description: List of departments
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 * */
router.get(
  "/workspace",
  authMiddleware,
  departmentController.getDepartmentsByWorkspace,
);


/**
 * @swagger
 * /api/department/{id}:
 *   get:
 *    summary: Get department by ID
 *    tags: [Department]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    schema:
 *      type: string
 *    responses:
 *     200:
 *       description: Department details
 *     404:
 *       description: Department not found
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 * */
router.get(
  "/:id",
  authMiddleware,
  departmentController.getDepartmentById,
);




/**
 * @swagger
 * tags:
 *   name: Department Users
 *   description: Manage users in departments
 */

router.post(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  departmentController.addUserToDepartment
);

/**
 * @swagger
 * /api/department/{departmentId}/users:
 *   post:
 *     summary: Add user to department
 *     tags: [Department Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - departmentId
 *               - userId
 *             properties:
 *               departmentId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added to department
 */

router.get(
  "/:departmentId/users",
  authMiddleware,
  departmentController.getDepartmentUsers
);

/**
 * @swagger
 * /api/department/{departmentId}/users:
 *   get:
 *     summary: Get users in a department
 *     tags: [Department Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users
 */

router.delete(
  "/:departmentId/users/:userId",
  authMiddleware,
  roleMiddleware(["admin"]),
  departmentController.removeUserFromDepartment
);

/**
 * @swagger
 * /api/department/{departmentId}/users/{userId}:
 *   delete:
 *     summary: Remove user from department
 *     tags: [Department Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *       - in: path
 *         name: userId
 *         required: true
 *     responses:
 *       200:
 *         description: User removed
 */
module.exports = router;


