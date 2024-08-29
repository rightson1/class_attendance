import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AdminDashboardData,
  IAdminValues,
  IUnitWithLecture,
  LecturerDashboardData,
  StudentDashboardData,
} from "../data_types";
import axios from "axios";

export const useGetStudentDashboard = (student_id?: string) => {
  return useQuery<StudentDashboardData>({
    enabled: !!student_id,
    queryKey: ["GET_STUDENT_Dashboard"],
    queryFn: async () => {
      return axios
        .get(`/api/dashboard/student`, {
          params: {
            student_id,
          },
        })
        .then((res) => res.data);
    },
  });
};

export const useGetStudentUnits = (student_id?: string) => {
  return useQuery<IUnitWithLecture[]>({
    enabled: !!student_id,
    queryKey: ["STUDENT_UNITS"],
    queryFn: async () => {
      return axios
        .get(`/api/students/units`, {
          params: {
            student_id,
          },
        })
        .then((res) => res.data);
    },
  });
};
