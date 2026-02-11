const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Workspace } = require("../models");

class AuthService {

  // Generate JWT
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
        workspaceId: user.WorkspaceId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  // Register + Create Workspace
  static async register({ name, email, password, workspaceName }) {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const workspace = await Workspace.create({
      name: workspaceName,
      inviteCode: Math.random().toString(36).substring(2, 8),
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      WorkspaceId: workspace.id,
    });

    const token = this.generateToken(user);

    return { user, token };
  }

  // Join Existing Workspace
  static async joinWorkspace({ name, email, password, inviteCode }) {

    const workspace = await Workspace.findOne({ where: { inviteCode } });
    if (!workspace) throw new Error("Invalid invite code");

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "SALES",
      WorkspaceId: workspace.id,
    });

    const token = this.generateToken(user);

    return { user, token };
  }

  // Login
  static async login({ email, password }) {

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = this.generateToken(user);

    return { user, token };
  }
}

module.exports = AuthService;
