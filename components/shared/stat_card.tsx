import { LucideProps } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IconType } from "react-icons/lib";

export const Stat_Card = (props: {
  title: string;
  description: string;
  icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >
    | IconType;
}) => {
  return (
    <Card className="w-full h-full flex items-center  px-4 py-5 gap-5">
      <Avatar className="text-primary h-12  w-12">
        <AvatarFallback>
          <props.icon height={25} width={25} />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h3 className="h5">{props.title}</h3>
        <span className="text-sm">{props.description}</span>
      </div>
    </Card>
  );
};
