import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ColorTypes } from "../provider/qrcolorTypes";
import { ArrowSvg } from "./svgs/arrowSvg";
import { ResetSvg } from "./svgs/resetSvg";
import { CheckMarkSvg } from "./svgs/checkMarkSvg";

type DetailsProps = {
  title: string;
  children: React.ReactNode;
};

export type ButtonProps = {
  title: string;
  active?: boolean;
  onClick?: () => void;
  isColorPicker?: boolean;
  color?: ColorTypes["colors"];
  resettable?: boolean;
};

const Details = ({ title, children }: DetailsProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="mt-5 w-full items-center justify-between rounded-lg bg-secondary-light py-5 pl-6 text-left text-sm text-foreground focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
          <span className="font-semibold uppercase">{title}</span>
          <ArrowSvg />
        </AccordionTrigger>
        <AccordionContent className="rounded-b-lg bg-secondary-light px-6 pb-8 pt-2 text-sm text-gray-500">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const CustomButton = ({
  title,
  isColorPicker,
  color,
  active,
  onClick,
  resettable,
}: ButtonProps) => {
  return (
    <Button
      className={cn(
        "mr-2 flex items-center rounded-lg px-2 py-3 text-foreground transition-all duration-300 ease-in-out",
        {
          "bg-blue-light": active && !isColorPicker,
          "opacity-50": !active && !isColorPicker,
          "h-10 w-10": isColorPicker,
          "text-foreground": isColorPicker && color !== "#000000",
          "text-black": isColorPicker && active && color === "#000000",
        }
      )}
      onClick={onClick}
      style={{
        ...(isColorPicker && {
          backgroundColor: color,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }),
      }}
      aria-label={title}
      aria-pressed={active}
      {...(isColorPicker && {
        title: title,
      })}
    >
      {!isColorPicker && title}
      {resettable && !active && (
        <span
          className={cn("w-full", {
            "text-black": isColorPicker && color === "#000000",
          })}
        >
          <ResetSvg />
        </span>
      )}

      <motion.span
        animate={
          active && isColorPicker
            ? {
                scale: [1, 1.2, 1],
                opacity: [0, 0.5, 1],
                width: ["100%", "100%", "100%"],
              }
            : {
                scale: [1, 0.8, 0],
                opacity: [1, 1, 0],
                width: ["100%", "100%", "0%"],
              }
        }
        transition={{
          duration: 0.3,
        }}
        className={cn("w-full", {
          "text-black": isColorPicker && color === "#000000",
          "text-transparent": !active,
        })}
      >
        {<CheckMarkSvg />}
      </motion.span>
    </Button>
  );
};

export default Details;
