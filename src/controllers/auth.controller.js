const AuthService = require("../services/auth.service");

class AuthController {

  static async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async joinWorkspace(req, res) {
    try {
      const result = await AuthService.joinWorkspace(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async me(req, res) {
    res.json(req.user);
  }
}

module.exports = AuthController;

