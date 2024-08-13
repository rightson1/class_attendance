"use client";
import React from "react";
import { CustomModal } from "../shared/CustomModal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { LabeledInput } from "../atoms/inputs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IUnitValues } from "@/lib/data_types";
import { useCustomToast } from "../atoms/functions";
import { useCreateUnit } from "@/lib/hooks/useUnit";

export const NewUnit = () => {
  const { customToast } = useCustomToast();
  const { mutateAsync: addUnit } = useCreateUnit();
  const [modalOpen, setModalOpen] = React.useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //get unit values
    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(
      formData.entries() as Iterable<readonly [PropertyKey, any]>
    ) as IUnitValues;
    customToast({
      func: async () => {
        await addUnit(values as IUnitValues);
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
          <Plus />
          <span>Create Unit</span>
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
        <LabeledInput label="Unit Name" id="name">
          <Input placeholder="Unit Name" name="name" required />
        </LabeledInput>
        <LabeledInput label="Unit Code" id="code">
          <Input placeholder="Unit Code" name="code" required />
        </LabeledInput>
        <LabeledInput label="Unit Description" id="description">
          <Textarea
            placeholder="Unit Description"
            name="description"
            required
          />
        </LabeledInput>
      </div>
    </CustomModal>
  );
};
