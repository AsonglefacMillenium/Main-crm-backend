const express = require("express");
const router = express.Router();

const workspaceController = require("../controllers/workspace.controller");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/requireRole");

/**
 * @swagger
 * tags:
 *   name: Workspace
 *   description: Workspace management
 */

/**
 * @swagger
 * /api/workspace:
 *   get:
 *     summary: Get all workspaces
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all workspaces
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
 // authMiddleware,
 // roleMiddleware(["admin"]),
  workspaceController.getAllWorkspaces
);

/**
 * @swagger
 * /api/workspace/{workspaceId}:
 *   get:
 *     summary: Get workspace by ID
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workspace details
 *       404:
 *         description: Workspace not found
 */
router.get(
  "/:workspaceId",
  authMiddleware,
  workspaceController.getWorkspaceById
);

/**
 * @swagger
 * /api/workspace:
 *   put:
 *     summary: Update workspace details
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Workspace updated successfully
 *       400:
 *         description: Bad request
 */
router.put(
  "/:workspaceId",
  authMiddleware,
  roleMiddleware(["admin"]),
  workspaceController.updateWorkspace
);

/**
 * @swagger
 * /api/workspace/{workspaceId}:
 *   delete:
 *     summary: Delete a workspace
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workspace deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:workspaceId",
  authMiddleware,
  roleMiddleware(["admin"]),
  workspaceController.deleteWorkspace
);

/**
 * @swagger
 * /api/workspace/users:
 *   post:
 *     summary: Add a user to a workspace
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workspaceId
 *               - userId
 *             properties:
 *               workspaceId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added to workspace
 *       400:
 *         description: Bad request
 */
router.post(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  workspaceController.addUserToWorkspace
);

/**
 * @swagger
 * /api/workspace/users:
 *   delete:
 *     summary: Remove a user from a workspace
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workspaceId
 *               - userId
 *             properties:
 *               workspaceId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User removed from workspace
 *       400:
 *         description: Bad request
 */
router.delete(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  workspaceController.removeUserFromWorkspace
);

module.exports = router;