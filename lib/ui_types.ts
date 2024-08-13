import { LucideProps } from "lucide-react";
import { IconType } from "react-icons/lib";
export type TIcon =
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  | React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
  | IconType;

export interface TSidebarLink {
  name: string;
  icon: TIcon;
  path: string;
  links?: TSidebarLink[];
}
export interface TSidebarCategory {
  type: string;
  links: TSidebarLink[];
}
export type TSidebarLinks = TSidebarCategory[];

export type Params<T extends string> = {
  params: Record<T, string>;
};

