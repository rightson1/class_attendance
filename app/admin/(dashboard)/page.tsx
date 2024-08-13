import { BarButton, PageTitle } from "@/components/shared/atoms";
import { Stat_Card } from "@/components/shared/stat_card";
import { BookOpenCheck, ClipboardPlus } from "lucide-react";
import { Briefcase, LucideProps } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MdAcUnit } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import ClassesTable from "@/components/shared/TodayClasses";
export default function Home() {
  return (
    <div className="flex flex-col gap-5 h-min">
      <div className="fb">
        <PageTitle title="Dashboard" link="/admin" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>
      <div className="rp bg-card    grid-1-2-3 gap-3 rounded-lg md:border border-border">
        <div className=" flex flex-col gap-3">
          <Stat_Card
            title="2"
            description="Lectures"
            icon={FaChalkboardTeacher}
          />
          <Stat_Card title="2,001" description="Students" icon={PiStudent} />
        </div>

        <Card className="fc flex-col p-4 gap-5 py-5">
          <div className="fc flex-col">
            <div className="h4">20</div>
            <p>Classes Today</p>
          </div>

          <Separator className="w-full" />
          <div className="fc flex-col w-full gap-3">
            <Bids title="Ongoing Classes" icon={Briefcase} value={6} />
            <Bids title="Completed Classes" icon={Briefcase} value={6} />
          </div>
        </Card>

        <div className=" flex flex-col gap-3">
          <Stat_Card title="10" description="Units" icon={MdAcUnit} />
          <Stat_Card
            title="2,800"
            description="Classes Scheduled"
            icon={BookOpenCheck}
          />
        </div>
      </div>
      <ClassesTable />
    </div>
  );
}
const Bids = (props: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  value: number;
}) => {
  return (
    <div className="fbc w-full  ">
      <div className="fc gap-2">
        <props.icon width={20} height={20} />
        <span className="text-sm">{props.title}</span>
      </div>
      <span className="text-sm">{props.value}</span>
    </div>
  );
};
