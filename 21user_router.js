import express from "express";

import { getAllUser } from "./20user_ctrl.js";

const router = new express.Router()

// router.get('/user',getAllUser)
router.post('/user',getAllUser)

export default router