import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { INewUser, IUser, IuserValues, TRole } from "../data_types";

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["Create_User"],
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["users"],
      });
    },
    mutationFn: async (values: INewUser) => {
      return axios.post("/api/users/admin", values);
    },
  });
};

//get user by role
export const useGetUsers = (role: TRole) => {
  return useQuery<IUser[]>({
    queryKey: ["users", role],
    queryFn: async () => {
      return axios
        .get("/api/users/admin", {
          params: {
            role: role,
          },
        })
        .then((res) => res.data);
    },
  });
};

//delete user
export const useDeleteUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["Delete_User"],
    mutationFn: async (id: string) => {
      return axios.delete(`/api/users/admin`, {
        params: {
          uid: id,
        },
      });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["users"],
      });
      client.invalidateQueries({
        queryKey: ["unit"],
      });
    },
  });
};
