import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./view.router.js";

// ESTO ES LOGICA DE ENRUTAMIENTO

const router = Router();

router.use("/", viewRouter)
router.use("/api", apiRouter);



export default router;
