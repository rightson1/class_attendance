"use client";
import { PageLoading } from "@/components/main/loadingUI";
import NotFoundUI from "@/components/main/NotFoundUI";
import { Class_Card } from "@/components/pageUI/classes/class_card";
import ClassDetails from "@/components/pageUI/classes/class_details";
import { StartClass } from "@/components/pageUI/classes/start_class";
import { BarButton, PageTitle } from "@/components/shared/atoms";
import { useGetClassById } from "@/lib/hooks/useClass";
import { Params } from "@/lib/ui_types";
import React from "react";

const Class = ({ params }: Params<"class">) => {
  const { data, isPending } = useGetClassById(params.class);
  if (data) {
    return (
      <div className="flex flex-col gap-5 h-min">
        <div className="fb">
          <PageTitle title={data.name} link="/lecture/classes" />
          {/* <Button asChild>
            <Link href={`/lecture/classes/${data._id}/qrcode`}>QRCODE</Link>
          </Button> */}
          {(data.status == "active" || data.status == "upcoming") && (
            <StartClass current_class={data} />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-2">
          <div className="md:col-span-3 w-full ">
            <Class_Card currentClass={data} />
          </div>
          <div className="md:col-span-5 bg-card border border-border mpy rounded-lg">
            <ClassDetails fetchedClass={data} />
          </div>
        </div>
      </div>
    );
  }
  if (isPending) {
    return <PageLoading />;
  }
  if (!data) {
    return <NotFoundUI message="Class not found" title="Class not found" />;
  }
};

export default Class;
