"use client";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "./qrCode";
import { QrStyleContext } from "../provider/qr_provider";

const QrCodeWrapper = ({ initialValue }: { initialValue?: string }) => {
  const { state, dispatch } = useContext(QrStyleContext);
  const [debouncedValue, setDebouncedValue] = useState(state.value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (debouncedValue === "") {
        dispatch({ type: "SET_QR_VALUE", payload: { value: "I'm EMPTY" } });
        return;
      }
      dispatch({ type: "SET_QR_VALUE", payload: { value: debouncedValue } });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    if (initialValue) {
      setDebouncedValue(initialValue);
    }
  }, [initialValue]);

  return (
    <div className="font-spline-sans w-full ">
      <QRCode />
    </div>
  );
};

export default QrCodeWrapper;
