import { useNavigate } from "react-router";

export function useHome(completedLessons) {
  const navigate = useNavigate();
  const completedCount = Object.values(completedLessons).flat().length;

  return {
    navigate,
    completedCount,
  };
}
