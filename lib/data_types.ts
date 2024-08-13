import { IClassValues } from "./zod";

export interface IFetched {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface IAdminValues {
  name: string;
  email: string;
  uid: string;
}
export type TRole = "admin" | "student" | "lecture";

export interface IuserValues {
  name: string;
  email: string;
  uid: string;
  role: TRole;
}
export interface INewUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
}
export interface IUser extends IFetched, IuserValues {}
export interface IAdmin extends IFetched, IAdminValues {}
export interface IUserIdentity {
  uid: string;
  email: string;
}

export interface IUnitValues {
  name: string;
  code: string;
  description: string;
}

export interface IUnit extends IFetched, IUnitValues {
  students: string[] | IUser[];
  lecturer: IUser | string;
}

export interface IUnitWithSL extends IUnit {
  lecturer: IUser;
  students: IUser[];
}

export interface IUnitStudentUpdate {
  updateType: "remove" | "add";
  unit_id: string;
  student_id: string;
}
export interface IClassWithUnit extends Omit<IClassValues, "unit">, IFetched {
  students: [];
  unit: IUnit;
}
