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
export interface IClassWithLUs
  extends IFetched,
    Omit<IClassValues, "unit" | "lecturer"> {
  students: string[];
  lecturer: IUser;
  unit: IUnit;
}
export interface IClassStudentUpdate {
  updateType: "remove" | "add";
  class_id: string;
  student_id: string;
}
export interface AdminDashboardData {
  lecturers: number;
  students: number;
  totalClasses: number;
  upcomingClasses: number;
  ongoingClasses: number;
  completedClassesToday: number;
  totalUnits: number;
  classesToday: IClassWithLUs[];
}
export interface LecturerDashboardData {
  lectureClassesToday: number; // Number of lecture's classes today
  ongoingClasses: number; // Number of ongoing classes for the lecturer
  completedClassesToday: number; // Number of completed classes for today
  lectureUnitsCount: number; // Number of units the lecturer teaches
  studentsCount: number; // Number of students in all the units the lecturer teaches
  upcomingClassesToday: number; // Number of upcoming classes for today
  canceledClasses: number; // Number of canceled classes for the lecturer
  todaysClasses: IClassWithUnit[]; // Today's classes for the lecturer
}
