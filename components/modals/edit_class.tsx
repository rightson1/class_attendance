import React from "react";
import { CustomModal } from "../shared/CustomModal";
import { Button } from "../ui/button";
import { Pencil, Plus } from "lucide-react";
import { LabeledInput } from "../atoms/inputs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const EditClass = () => {
  return (
    <CustomModal
      dContentStyles={"sm:max-w-[400px] bg-card "}
      trigger={
        <Button size={"icon"} variant={"ghost"}>
          <Pencil size={18} />
        </Button>
      }
      title="Create a new Unit"
      footer={
        <div className="flex justify-end w-full">
          <Button variant="secondary" type="button">
            Promote
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <LabeledInput label="Unit Name" id="name">
          <Input placeholder="Unit Name" name="name" />
        </LabeledInput>
        <LabeledInput label="Unit Code" id="code">
          <Input placeholder="Unit Code" name="code" />
        </LabeledInput>
        <LabeledInput label="Unit Description" id="description">
          <Textarea placeholder="Unit Description" name="description" />
        </LabeledInput>
      </div>
    </CustomModal>
  );
};
