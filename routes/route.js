import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/users.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
const prefix = "/v1/api/";

// End point hanya digunakan peneliti untuk mengecek daftar akun yang terdaftar
router.get(prefix + "users", verifyToken, getUsers);
router.get(prefix + "token", refreshToken);

// USER API
router.post(prefix + "regist", Register);
router.post(prefix + "login", Login);
router.delete(prefix + "logout", Logout);

export default router;
