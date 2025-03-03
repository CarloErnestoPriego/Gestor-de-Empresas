import { Router } from "express";
import { register } from "./auth.controller.js";

const router = Router();

router.post(
    '/register',
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
);

export default router;