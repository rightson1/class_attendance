"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LabeledInput } from "@/components/atoms/inputs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IAdminValues, IuserValues } from "@/lib/data_types";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/components/atoms/functions";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useCreateAdmin } from "@/lib/hooks/useAdmin";
const Register = () => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: createAdmin } = useCreateAdmin();
  const router = useRouter();
  const [values, setValues] = React.useState<
    IuserValues & {
      password: string;
    }
  >({
    email: "",
    password: "",
    name: "",
    uid: "",
    role: "admin",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id = "";
    customToast({
      func: async () => {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        ).then(async (userCredentials) => {
          const { uid } = userCredentials.user;
          id = uid;
        });
        await createAdmin({
          ...values,
          uid: id,
        });
      },
      sfunc: async () => {
        router.push("/auth/login");
      },
    });
  };

  return (
    <form
      className="flex justify-center items-center w-full min-h-screen"
      onSubmit={submit}
    >
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create New Administrator</CardTitle>
          <CardDescription>Create A new Admin</CardDescription>
        </CardHeader>
        <CardContent>
          <LabeledInput label="Name" id="name">
            <Input
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              value={values.name}
              required
            />
          </LabeledInput>
          <LabeledInput label="Email" id="email">
            <Input
              placeholder="Enter your name"
              name="email"
              onChange={handleChange}
              value={values.email}
              required
            />
          </LabeledInput>
          <LabeledInput label="Password" id="password">
            <Input
              placeholder="Enter your Password"
              name="password"
              onChange={handleChange}
              value={values.password}
              required
            />
          </LabeledInput>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>
            Already have an account?
            <Link href="/auth/login" className="text-primary mx-2">
              Login
            </Link>
          </span>
          <Button>Register</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Register;
