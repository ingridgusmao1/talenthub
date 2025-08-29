import { Router } from "express";
import annonce from "./annonce";

const router = Router();

router.use("/annonces", annonce);

export default router;
