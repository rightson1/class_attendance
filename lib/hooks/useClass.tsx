import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import { classSchema } from "../zod";
import {
  IClass,
  IClassStudentUpdate,
  IClassWithStudents,
  IClassWithUnit,
  IFetched,
  IUser,
} from "../data_types";
import { toast } from "sonner";
export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: z.infer<typeof classSchema>) => {
      return axios.post("/api/classes", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
  });
};

//get classes by lecturer
export const useGetClassesByLecturer = (params: {
  lecturer?: string;
  unit?: string;
}) => {
  return useQuery<IClassWithUnit[]>({
    queryKey: ["classes", params],
    queryFn: async () => {
      return axios
        .get(`/api/classes`, {
          params: params,
        })
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
    queryKey: ["classes", _id],
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

//edit class
export const useEditClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: Partial<IClass>) => {
      return axios.put(`/api/classes`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
  });
};

export const useGetClassesByStudent = (params: {
  student_id: string;
  unit_id: string;
}) => {
  return useQuery<IClassWithStudents[]>({
    queryKey: ["classes", params],
    queryFn: async () => {
      return axios
        .get(`/api/students/units/classes`, {
          params: params,
        })
        .then((res) => res.data);
    },
  });
};
