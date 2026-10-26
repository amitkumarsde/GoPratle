import { Request, Response } from "express";
import mongoose from "mongoose";
import Requirement from "../models/Requirement";
import { validateRequirement } from "../validators/requirementValidator";

// POST /api/requirements
export const createRequirement = async (req: Request, res: Response) => {
  const errors = validateRequirement(req.body || {});

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ success: false, message: "Please fix the highlighted fields", errors });
    return;
  }

  try {
    const requirement = await Requirement.create(req.body);
    res.status(201).json({ success: true, message: "Requirement posted successfully", data: requirement });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    console.error("Create requirement failed:", error);
    res.status(500).json({ success: false, message: "Something went wrong, please try again" });
  }
};

// GET /api/requirements (newest first)
export const getRequirements = async (req: Request, res: Response) => {
  try {
    const requirements = await Requirement.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requirements });
  } catch (error) {
    console.error("Get requirements failed:", error);
    res.status(500).json({ success: false, message: "Could not load requirements, please try again" });
  }
};

// GET /api/requirements/:id
export const getRequirementById = async (req: Request, res: Response) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404).json({ success: false, message: "Requirement not found" });
    return;
  }

  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) {
      res.status(404).json({ success: false, message: "Requirement not found" });
      return;
    }
    res.json({ success: true, data: requirement });
  } catch (error) {
    console.error("Get requirement failed:", error);
    res.status(500).json({ success: false, message: "Could not load requirement, please try again" });
  }
};
