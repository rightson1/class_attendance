"use client";
import { Label } from "../ui/label";
interface LabeledInputProps {
  id: string;
  label: string;
  children: React.ReactNode;
}
export const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  ...props
}) => {
  return (
    <div className={`w-full space-y-2 `}>
      <Label htmlFor={id}>{label}</Label>
      {props.children}
    </div>
  );
};
