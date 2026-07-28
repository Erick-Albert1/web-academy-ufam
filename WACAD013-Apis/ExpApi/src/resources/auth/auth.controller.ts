import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { authService } from "./auth.service";

const register = async (req: Request, res: Response) => {
  const existingUser = await authService.findByEmail(req.body.email);

  if (existingUser) {
    res.status(StatusCodes.CONFLICT).json({ message: req.t("auth.emailInUse") });
    return;
  }

  const user = await authService.register(req.body);
  res.status(StatusCodes.CREATED).json({ message: req.t("auth.registered"), user });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.findByEmail(email);

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: req.t("auth.invalidCredentials") });
    return;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: req.t("auth.invalidCredentials") });
    return;
  }

  req.session.userId = user.id;
  req.session.userName = user.name;
  req.session.userType = user.userType.name;

  const { password: _password, ...safeUser } = user;
  res.status(StatusCodes.OK).json({ user: safeUser });
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao encerrar sessão." });
      return;
    }

    res.clearCookie("connect.sid");
    res.status(StatusCodes.OK).json({ message: req.t("auth.loggedOut") });
  });
};

export const authController = {
  register,
  login,
  logout,
};
