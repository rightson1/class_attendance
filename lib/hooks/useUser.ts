import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { INewUser, IuserValues } from "../data_types";

export const useCreateAdmin = () => {
  return useMutation({
    mutationKey: ["Create_User"],
    mutationFn: async (values: IuserValues) => {
      return axios.post("/api/users", values);
    },
  });
};

export const useGetUserByUid = ({ uid }: { uid?: string }) => {
  return useQuery({
    queryKey: ["Get_User_By_Uid", uid],
    queryFn: async () => {
      return axios.get(`/api/users?uid=${uid}`);
    },
    enabled: !!uid,
  });
};
