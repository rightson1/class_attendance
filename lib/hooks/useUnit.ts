import { IUnit, IUnitStudentUpdate, IUnitWithSL, IUser } from "./../data_types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IUnitValues } from "../data_types";

export const useCreateUnit = () => {
  return useMutation({
    mutationKey: ["Create_Unit"],
    mutationFn: async (values: IUnitValues) => {
      return axios.post("/api/units", values);
    },
  });
};

//get all units
export const useGetUnits = () => {
  return useQuery<IUnit[]>({
    queryKey: ["units"],
    queryFn: async () => {
      return axios.get("/api/units").then((res) => res.data);
    },
  });
};

//get a single unit
export const useGetUnit = (id: string) => {
  return useQuery<IUnitWithSL>({
    queryKey: ["unit", id],
    queryFn: async () => {
      return axios
        .get(`/api/units`, {
          params: {
            id: id,
          },
        })
        .then((res) => res.data);
    },
  });
};

//update a unit
export const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Update_Unit"],
    mutationFn: async (values: Partial<IUnit>) => {
      return axios.put("/api/units", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unit_lecture"],
      });
    },
  });
};

//
export const useGetStudentsInUnit = (id?: string) => {
  return useQuery<IUser[]>({
    queryKey: ["students", id],
    queryFn: async () => {
      return axios
        .get("/api/units/students", {
          params: {
            id: id,
          },
        })
        .then((res) => res.data);
    },
    enabled: !!id,
  });
};

//update student in unit
export const useUpdateStudentInUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IUnitStudentUpdate) => {
      await axios.put("/api/units/students", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
};

//get unit by lecture_id
export const useGetUnitsByLectureId = (lecture_id?: string) => {
  return useQuery<IUnit[]>({
    queryKey: ["units", lecture_id],
    queryFn: async () => {
      return axios
        .get("/api/units/lecture", {
          params: {
            lecture_id: lecture_id,
          },
        })
        .then((res) => res.data);
    },
    enabled: !!lecture_id,
  });
};

//delete lecture from unit

export const useDeleteLectureFromUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (unit_id: string) => {
      await axios.delete("/api/units/lecture", {
        params: {
          unit_id: unit_id,
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["unit_lecture"],
      });
    },
  });
};

//get lecture in unit
export const useGetLectureInUnit = (unit_id: string) => {
  console.log(unit_id);
  return useQuery<IUser[]>({
    queryKey: ["unit_lecture", unit_id],
    queryFn: async () => {
      return axios
        .get("/api/lectures/unit", {
          params: {
            unit_id: unit_id,
          },
        })
        .then((res) => res.data);
    },
    enabled: !!unit_id,
  });
};
