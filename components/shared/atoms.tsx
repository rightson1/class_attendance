import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
type PageTitleProps = {
  title: string;
  link: string;
  linkTitle?: string;
  btn?: string;
};
export const PageTitle = (props: PageTitleProps) => {
  return (
    <div className="flex items-start gap-2 pb-3">
      <div className="flex  flex-col  ">
        <div className="h4">{props.title}</div>
        <Custom_Bread_Crumb
          link={props.link}
          title={props.linkTitle ?? props.title}
        />
      </div>
      {props.btn && (
        <Badge
          variant={"secondary"}
          className="bg-third/20 text-third py-1 mt-1"
        >
          {props.btn}
        </Badge>
      )}
    </div>
  );
};

const Custom_Bread_Crumb = ({
  link,
  title,
}: {
  link: string;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Link href={"/"} className="text-grayish">
        Home
      </Link>
      /
      <Link href={link} className="capitalize">
        {title}
      </Link>
    </div>
  );
};

export const BarButton = (props: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}) => {
  return (
    <Button
      variant={"outline"}
      className="hidden md:flex gap-2 px-4  "
      size={"default"}
    >
      <span className="  rounded-lg bg-accent p-2">
        <props.icon height={13} width={13} />
      </span>
      {props.text}
    </Button>
  );
};
