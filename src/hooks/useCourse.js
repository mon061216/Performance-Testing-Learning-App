import { useParams } from "react-router";
import { COURSES } from "@/data/courses";

export function useCourse(completedLessons) {
  const { courseId } = useParams();
  const course = COURSES.find((c) => c.id === courseId);

  const doneLessons = course ? (completedLessons[course.id] || []) : [];
  const done = doneLessons.length;
  const progressPercent = course ? (done / course.lessons.length) * 100 : 0;

  return {
    course,
    doneLessons,
    done,
    progressPercent,
  };
}
