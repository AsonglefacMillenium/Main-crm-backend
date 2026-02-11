const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & Workspace Management
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register new admin and create workspace
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - workspaceName
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               workspaceName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/signup", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/join:
 *   post:
 *     summary: Join existing workspace
 *     tags: [Auth]
 */
router.post("/join", authController.joinWorkspace);

/**
 * @swagger
 * /api/auth/me:
 *   post:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
router.post("/me", authMiddleware, authController.me);

module.exports = router;
