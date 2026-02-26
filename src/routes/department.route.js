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

module.exports = router;
