import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminDashboardData, IAdminValues } from "../data_types";
import axios from "axios";

export const useCreateAdmin = () => {
  return useMutation({
    mutationKey: ["Create_Admin"],
    mutationFn: async (values: IAdminValues) => {
      return axios.post("/api/user", values);
    },
  });
};

export const useGetByUid = ({ uid }: { uid?: string }) => {
  return useQuery({
    queryKey: ["Get_Admin_By_Uid", uid],
    queryFn: async () => {
      return axios.get(`/api/admin?uid=${uid}`);
    },
    enabled: !!uid,
  });
};

export const useGetAdminDashboard = () => {
  return useQuery<AdminDashboardData>({
    queryKey: ["Get_Admin_Dashboard"],
    queryFn: async () => {
      return axios.get(`/api/dashboard/admin`).then((res) => res.data);
    },
  });
};
