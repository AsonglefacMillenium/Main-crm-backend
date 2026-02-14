const AuthService = require("../services/auth.service");

// class AuthController {

  const register = async (req, res) => {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  const joinWorkspace = async (req, res) => {
    try {
      const result = await AuthService.joinWorkspace(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  const login = async (req, res) => {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  const me = async (req, res) => {
    res.json(req.user);
  }
//}

module.exports = { register, joinWorkspace, login, me };

