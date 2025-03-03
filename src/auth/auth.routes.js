import { Router } from "express";
import { login } from "./auth.controller.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { loginValidator } from '../middlewares/validator.js'

const router = Router();

router.post(
    "/login",
    loginValidator,
    deleteFileOnError,
    login
)

export default router;