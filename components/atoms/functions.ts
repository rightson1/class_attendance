"use client";
import { useState } from "react";
import { toast } from "sonner";
export const useCustomToast = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const customToast = ({
    func,
    sfunc,
    loading,
    suc,
    err,
    efunc,
  }: {
    func: () => Promise<any>;
    sfunc?: () => void;
    loading?: string;
    suc?: string;
    err?: string;
    efunc?: (() => Promise<void>) | (() => void);
  }) => {
    setModalOpen(true);
    setLoading(true);

    return toast.promise(
      func()
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          if (sfunc) sfunc();
        })
        .catch((e) => {
          const axiosError = e?.response?.data?.message;
          setLoading(false);
          if (efunc) efunc();
          throw new Error(axiosError || e);
        }),

      {
        loading: loading || "Loading...",
        success: suc || "Success",
        error: (e) => {
          return e.message || err || "An error occurred";
        },
      }
    );
  };
  return { customToast, loading, modalOpen, setModalOpen };
};
