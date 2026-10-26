import { useEffect, useState } from "react";
import { Requirement } from "@/models/requirement";
import { getRequirementById, getRequirements } from "@/services/requirementService";

export function useRequirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    getRequirements()
      .then((data) => {
        setRequirements(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [reload]);

  const retry = () => {
    setLoading(true);
    setReload(reload + 1);
  };

  return { requirements, loading, error, retry };
}

export function useRequirementDetail(id: string) {
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRequirementById(id)
      .then((data) => setRequirement(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { requirement, loading, error };
}
