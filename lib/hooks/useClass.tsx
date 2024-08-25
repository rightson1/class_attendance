import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import { classSchema } from "../zod";
import { IClassStudentUpdate, IClassWithUnit, IUser } from "../data_types";
import { toast } from "sonner";
export const useCreateClass = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof classSchema>) => {
      return axios.post("/api/classes", values);
    },
  });
};

//get classes by lecturer
export const useGetClassesByLecturer = (lecturer?: string) => {
  return useQuery<IClassWithUnit[]>({
    queryKey: ["classes", lecturer],
    queryFn: async () => {
      return axios
        .get(`/api/classes?lecturer=${lecturer}`)
        .then((res) => res.data);
    },
  });
};

//delete class
export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      return axios.delete(`/api/classes?_id=${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
  });
};

//get class by id
export const useGetClassById = (_id: string) => {
  return useQuery<IClassWithUnit>({
    queryKey: ["class", _id],
    queryFn: async () => {
      return await axios
        .get(`/api/classes`, {
          params: {
            _id,
          },
        })
        .then((res) => res.data);
    },
  });
};

//get students in class
export const useGetStudentsInClass = (_id: string) => {
  return useQuery<IUser[]>({
    queryKey: ["students", _id],
    queryFn: async () => {
      return axios
        .get(`/api/classes/students?_id=${_id}`)
        .then((res) => res.data);
    },
  });
};

//update student in class
export const useUpdateStudentInClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IClassStudentUpdate) => {
      console.log(values);
      return axios.put(`/api/classes/students`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
};
