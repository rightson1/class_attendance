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
import { useCustomToast } from "@/components/atoms/functions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import axios from "axios";
import { TRole } from "@/lib/data_types";

const Login = () => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const { customToast, loading } = useCustomToast();
  let uid: string;
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let role: TRole;
    customToast({
      func: async () => {
        await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        ).then((userCredential) => {
          const user = userCredential.user;
          uid = user.uid;
        });
        await axios.get(`/api/users?uid=${uid}`).then((res) => {
          role = res.data.role;
        });
      },
      sfunc: async () => {
        window.location.href =
          role == "admin"
            ? "/admin"
            : role == "student"
            ? "/student"
            : "/lecture";
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={submit}
      className="flex justify-center items-center w-full min-h-screen"
    >
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create New Administrator</CardTitle>
          <CardDescription>Create A new Admin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LabeledInput label="Email" id="email">
            <Input
              placeholder="Enter your Email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </LabeledInput>
          <LabeledInput label="Password" id="password">
            <Input
              placeholder="Enter your Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </LabeledInput>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>
            Dont have an Account
            <Link href="/auth/admin/new" className="text-primary mx-2">
              Register
            </Link>
          </span>
          <Button type="submit">Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
