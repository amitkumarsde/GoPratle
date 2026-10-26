import mongoose from "mongoose";
import { CATEGORIES } from "../constants/requirement";

const requirementSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    location: { type: String, required: true, trim: true },
    venue: { type: String, default: "", trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    budget: { type: Number, required: true, min: 1 },
    notes: { type: String, default: "", trim: true },
    details: { type: Object, required: true },
  },
  { timestamps: true },
);

const Requirement = mongoose.model("Requirement", requirementSchema);

export default Requirement;
