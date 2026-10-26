import express from "express";
import { createRequirement, getRequirementById, getRequirements } from "../controllers/requirementController";

const router = express.Router();

router.get("/", getRequirements);
router.get("/:id", getRequirementById);
router.post("/", createRequirement);

export default router;
