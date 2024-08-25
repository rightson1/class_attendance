import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AdminDashboardData,
  IAdminValues,
  LecturerDashboardData,
} from "../data_types";
import axios from "axios";

export const useGetLectureDashboard = (lecture_id?: string) => {
  return useQuery<LecturerDashboardData>({
    enabled: !!lecture_id,
    queryKey: ["Get_Admin_Dashboard"],
    queryFn: async () => {
      return axios
        .get(`/api/dashboard/lectures`, {
          params: {
            lecture_id,
          },
        })
        .then((res) => res.data);
    },
  });
};
