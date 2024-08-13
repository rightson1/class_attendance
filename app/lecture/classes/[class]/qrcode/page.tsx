"use client";
import React from "react";
import dynamic from "next/dynamic";
import QrCodeWrapper from "@/components/qrcode";
import { QrStyleProvider } from "@/components/provider/qr_provider";
import QRCode from "@/components/qrcode/qrCode";
import { Params } from "@/lib/ui_types";
import { useGetClassById } from "@/lib/hooks/useClass";
import { LoadingUI } from "@/components/main/loadingUI";
import NotFoundUI from "@/components/main/NotFoundUI";

const QRCODE = ({ params: { class: classId } }: Params<"class">) => {
  const { data, isPending } = useGetClassById(classId);
  if (data)
    return (
      <div>
        <div className="w-full">
          <QrStyleProvider>
            <QrCodeWrapper initialValue={data._id} />
          </QrStyleProvider>
        </div>
      </div>
    );
  if (!isPending) return <LoadingUI />;
  else {
    return <NotFoundUI message="Class not found" title="Class not found" />;
  }
};

export default QRCODE;
