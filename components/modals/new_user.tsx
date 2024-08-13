"use client";
import React from "react";
import { CustomModal } from "../shared/CustomModal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { LabeledInput } from "../atoms/inputs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCustomToast } from "../atoms/functions";
import { INewUser } from "@/lib/data_types";
import { useCreateUser } from "@/lib/hooks/useManageUser";
export const CreateUser = ({
  userType,
}: {
  userType: "lecture" | "student";
}) => {
  const { customToast, modalOpen, setModalOpen } = useCustomToast();
  const { mutateAsync: createUser } = useCreateUser();
  const [values, setValues] = React.useState<INewUser>({
    email: "",
    password: "",
    name: "",
    role: userType,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customToast({
      func: async () => {
        await createUser(values);
        setModalOpen(false);
      },
    });
  };
  return (
    <CustomModal
      dContentStyles={"sm:max-w-[400px] bg-card "}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      trigger={
        <Button>
          <Plus size={18} />
          <span>{userType === "lecture" ? "Lecture" : "Student"}</span>
        </Button>
      }
      title="Create a new Unit"
      footer={
        <div className="flex justify-end w-full">
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </div>
      }
      onSubmit={submit}
    >
      <div className="flex flex-col gap-2">
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
      </div>
    </CustomModal>
  );
};
