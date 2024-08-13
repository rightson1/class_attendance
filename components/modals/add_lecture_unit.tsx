import React from "react";
import { CustomModal } from "../shared/CustomModal";
import { Button } from "../ui/button";
import { Pencil, Plus } from "lucide-react";
import { IUnit } from "@/lib/data_types";
import { useUpdateUnit } from "@/lib/hooks/useUnit";
import { useGetUsers } from "@/lib/hooks/useManageUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomToast } from "../atoms/functions";
import { toast } from "sonner";

export const AddLecture = ({ unit }: { unit: IUnit }) => {
  const { data: lectures } = useGetUsers("lecture");
  const { mutateAsync: updateUnit } = useUpdateUnit();
  const { customToast, setModalOpen, modalOpen } = useCustomToast();
  const [lecture, setLecture] = React.useState<string>("");
  const submit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!lecture) {
      return toast.error("Please select a lecture");
    }
    customToast({
      func: async () => {
        await updateUnit({
          _id: unit._id,
          lecturer: lecture,
        });
      },
    });
  };

  return (
    <CustomModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      dContentStyles={"sm:max-w-[400px] bg-card "}
      onSubmit={submit}
      trigger={
        <Button>
          <Plus size={18} />
          <span>Lecture</span>
        </Button>
      }
      title="Create A New Lecture"
      footer={
        <div className="flex justify-end w-full">
          <Button>Submit</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <Select onValueChange={(value) => setLecture(value)} value={lecture}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Lecture" />
          </SelectTrigger>
          <SelectContent>
            {lectures?.map((lecture) => (
              <SelectItem key={lecture._id} value={lecture._id}>
                {lecture.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CustomModal>
  );
};
